import { MetaFunction, useActionData } from '@remix-run/react'
import { InvoiceForm } from '@/components/main/invoice-form'
import {
    ActionFunctionArgs,
    UploadHandler,
    unstable_composeUploadHandlers as composeUploadHandlers,
    unstable_createMemoryUploadHandler as createMemoryUploadHandler,
    json,
    unstable_parseMultipartFormData as parseMultipartFormData,
} from '@remix-run/node'
import { prisma } from 'app/db.server'
import { uploadImage } from '@/lib/image.server'
import type { UploadApiErrorResponse } from 'cloudinary'
import { useEffect } from 'react'

export const meta: MetaFunction = () => {
    return [{ title: 'New invoice' }]
}

export async function action({ request }: ActionFunctionArgs) {
    try {
        const uploadHandler: UploadHandler = composeUploadHandlers(async ({ name, data }) => {
            if (name !== 'img') {
                return undefined
            }

            console.log({ name, data })

            const uploadedImage = await uploadImage(data)

            return uploadedImage?.secure_url
        }, createMemoryUploadHandler())

        const formData = await parseMultipartFormData(request, uploadHandler)
        console.log(Object.fromEntries(formData))
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

        return null
    } catch (e) {
        if (e && typeof e === 'object' && 'http_code' in e) {
            const error = e as UploadApiErrorResponse

            return json({ error: error.message }, { status: error.http_code })
        }

        return json({ error: 'An error occurred' }, { status: 500 })
    }
}

export default function New() {
    const data = useActionData<typeof action>()

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

                {data?.error && <p className="text-red-500">{data.error}</p>}
            </div>
        </div>
    )
}
