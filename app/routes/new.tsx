import { InvoiceForm } from '@/components/main/invoice-form'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { uploadImage } from '@/lib/image.server'
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
import { useEffect } from 'react'

export const meta: MetaFunction = () => {
    return [{ title: 'New invoice' }]
}

export async function action({ request }: ActionFunctionArgs) {
    try {
        const session = await getSession(request.headers.get('Cookie'))
        const uploadHandler: UploadHandler = composeUploadHandlers(async ({ name, data }) => {
            if (name !== 'img') {
                return undefined
            }

            const uploadedImage = await uploadImage(data)

            return uploadedImage?.secure_url
        }, createMemoryUploadHandler())

        const formData = await parseMultipartFormData(request, uploadHandler)
        const imgSrc = formData.get('img')

        await prisma.invoice.create({
            data: {
                amount: Number(formData.get('amount')),
                deposit: Number(formData.get('deposit')),
                brand: formData.get('brand') as string,
                type: formData.get('type') as string,
                dateOfPurchase: new Date(formData.get('dateOfPurchase') as string),
                purchaserName: formData.get('purchaserName') as string,
                extraAgreements: formData.get('extraAgreements') as string,
                invoiceNumber: formData.get('invoiceNumber') as string,
                email: formData.get('email') as string,
                image: imgSrc as string,
            },
        })
        session.flash('invoiceSuccess', 'Factuur goed aangemaakt')

        return redirect(new URL(request.url).pathname, {
            headers: {
                'Set-Cookie': await commitSession(session)
            }
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
    const session = await getSession(request.headers.get('Cookie'))
    const message = session.get('invoiceSuccess') || null

    return json({
        message
    }, {
        headers: {
            'Set-Cookie': await commitSession(session)
        }
    })
}

export default function New() {
    const data = useActionData<typeof action>()
    const { message } = useLoaderData<typeof loader>()

    useEffect(() => {
        if (data?.error) {
            console.error(data.error)
        }
    }, [data?.error])

    return (
        <div className="grid h-screen w-screen place-items-center">
            <div className="w-3/4 md:w-[60%]">
                <h1 className="mb-4 text-4xl font-bold">Nieuw factuur</h1>

                <InvoiceForm />

                {message ? <AlertSuccess message={message} /> : null}
                {data?.error ? <AlertDestructive message={data.error} /> : null}
            </div>
        </div>
    )
}

export function AlertSuccess({ message }: { message: string }) {
    return (
        <Alert>
            <CheckIcon className="h-4 w-4" />
            <AlertTitle>Yay!</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    )
}

export function AlertDestructive({ message }: { message: string }) {
    return (
        <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    )
}
