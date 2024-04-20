import { columns } from "@/components/main/table/columns"
import { DataTable } from "@/components/main/table/data-table"
import { Wrapper } from "@/components/ui/wrapper"
import { getInvoices } from "@/services/invoice.server"
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

export async function loader() {
    const invoices = await getInvoices()

    return json({
        invoices
    })
}

export default function Invoices() {
    const { invoices } = useLoaderData<typeof loader>()

    return <Wrapper>
        {/* as any because remix gives weird typings when using loader data */}
        <DataTable columns={columns} data={invoices as any} />
    </Wrapper>
}
