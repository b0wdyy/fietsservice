import { AlertDestructive } from '@/components/main/alert/descructive'
import { AlertSuccess } from '@/components/main/alert/success'
import { InvoiceForm } from '@/components/main/invoice-form'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { sgMail } from '@/lib/email.server'
import { uploadImage } from '@/lib/image.server'
import { createInvoice } from '@/services/invoice.server'
import { BikeType } from '@prisma/client'
import { CheckIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons'
import {
    ActionFunctionArgs,
    LoaderFunctionArgs,
    UploadHandler,
    unstable_composeUploadHandlers as composeUploadHandlers,
    unstable_createMemoryUploadHandler as createMemoryUploadHandler,
    json,
    unstable_parseMultipartFormData as parseMultipartFormData,
    redirect,
} from '@remix-run/node'
import { MetaFunction, useActionData, useLoaderData } from '@remix-run/react'
import { prisma } from 'app/db.server'
import { commitSession, getSession } from 'app/sessions'
import type { UploadApiErrorResponse } from 'cloudinary'
import { format } from 'date-fns'

export const meta: MetaFunction = () => {
    return [{ title: 'Nieuwe factuur aanmaken' }]
}

async function withRetry<T>(cb: () => Promise<T>, retries: number = 3): Promise<T | undefined> {
    for (let i = 0; i < retries; i++) {
        try {
            return await cb()
        } catch (e) {
            console.error(`Attempt ${i + 1} failed. Retrying...`)
            if (i === retries - 1) {
                throw e
            }
        }
    }
    return undefined
}

export async function action({ request }: ActionFunctionArgs) {
    try {
        const session = await getSession(request.headers.get('Cookie'))
        const uploadHandler: UploadHandler = composeUploadHandlers(async (handler) => {
            if (handler.name !== 'img') {
                return undefined
            }

            const uploadedImage = await uploadImage(handler.data)

            return uploadedImage?.secure_url
        }, createMemoryUploadHandler())

        const formData = await parseMultipartFormData(request, uploadHandler)
        const imgSrc = formData.get('img')

        const data = {
            amount: Number(formData.get('amount')),
            deposit: Number(formData.get('deposit')),
            brand: formData.get('brand') as string,
            dateOfPurchase: new Date(formData.get('dateOfPurchase') as string),
            purchaserName: formData.get('purchaserName') as string,
            extraAgreements: formData.get('extraAgreements') as string,
            invoiceNumber: formData.get('invoiceNumber') as string,
            email: formData.get('email') as string,
            signature: formData.get('signature') as string,
            image: imgSrc as string,
            bikeTypeId: formData.get('bikeTypeId') as string,
        }

        const invoice = await createInvoice(data)
        sgMail.send({
            to: `${invoice.email}`,
            from: 'noreply@fietsservice.vndl.dev',
            subject: 'Bedankt voor uw aankoop!',
            html: `
                <h1>Verkoopovereenkomst ${invoice.brand}</h1>
                <p style="margin-bottom: 0.5rem;">Hierbij verklaar ik, ondergetekende Staf Jansen, mijn e-bike van het merk ${invoice.brand} type ${invoice.bikeType.name.toLowerCase()} verkocht te hebben aan ${invoice.purchaserName} op ${format(invoice.dateOfPurchase, 'dd/MM/yyyy')} voor een bedrag van €${invoice.amount} (voorschot €${invoice.deposit}).</p>
                <span style="display: block;">Extra afspraken:</span>
                <p>${invoice?.extraAgreements}</p>
                <p>Foto:</p>
                <img style="max-width: 400px;" src='${invoice.image}' alt='${invoice.brand}-${invoice.bikeType.name}' />
                <p class="margin-top: 10rem; font-size: 8px; font-style: bold;">Dit betreft een particuliere verkoop, zonder extra garantie. De fiets wordt verkocht in de staat waarin het zich op dit moment bevindt. Kan niet teruggenomen worden tenzij anders overeengekomen en boven vermeld. Beide partijen zijn akkoord met deze voorwaarden.</p>
            `,
        })
        session.flash(
            'invoiceSuccess',
            'Factuur goed aangemaakt! Je krijgt een bevestiging per mail.'
        )

        return redirect(new URL(request.url).pathname, {
            headers: {
                'Set-Cookie': await commitSession(session),
            },
        })
    } catch (e) {
        if (e && typeof e === 'object' && 'http_code' in e) {
            const error = e as UploadApiErrorResponse

            return json({ error: error.message }, { status: error.http_code })
        }

        return json({ error: 'An error occurred' }, { status: 500 })
    }
}

export async function loader({ request }: LoaderFunctionArgs) {
    // with retry is used to handle the case where the database connection is lost
    const bikeTypes = await withRetry(() => prisma.bikeType.findMany())
    const session = await getSession(request.headers.get('Cookie'))
    const message = session.get('invoiceSuccess') || null

    return json(
        {
            message,
            bikeTypes,
        },
        {
            headers: {
                'Set-Cookie': await commitSession(session),
            },
        }
    )
}

export default function New() {
    const data = useActionData<typeof action>()
    const { message, bikeTypes } = useLoaderData<typeof loader>()

    return (
        <div className="grid h-screen w-screen place-items-center overflow-x-hidden">
            <div className="w-3/4 py-8 md:w-[60%]">
                <h1 className="mb-4 text-4xl font-bold">Nieuw factuur</h1>

                <InvoiceForm bikeTypes={bikeTypes as unknown as BikeType[]} />

                {message ? <AlertSuccess message={message} /> : null}
                {data?.error ? <AlertDestructive message={data.error} /> : null}
            </div>
        </div>
    )
}
