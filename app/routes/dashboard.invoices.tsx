import { DataTable } from '@/components/main/table/data-table'
import { Separator } from '@/components/ui/separator'
import { Wrapper } from '@/components/ui/wrapper'
import { invoiceColumns } from '@/lib/columns'
import { getInvoices } from '@/services/invoice.server'
import { Invoice } from '@prisma/client'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export async function loader() {
    const invoices = await getInvoices()

    return json({
        invoices,
    })
}

export default function Invoices() {
    const { invoices } = useLoaderData<typeof loader>()

    return (
        <div>
            <h2 className="text-2xl font-bold">Facturen</h2>

            <Separator className="my-2" />
            <p className="mt-4 text-zinc-400">
                Overzicht van alle facturen die gemaakt zijn. Zo kan je ook makkelijk een email
                terugvinden van een bepaalde klant.
            </p>

            <Wrapper>
                {/* as any because remix gives weird typings when using loader data */}
                <DataTable columns={invoiceColumns} data={invoices as unknown as Invoice[]} />
            </Wrapper>
        </div>
    )
}
