import { LoaderFunctionArgs, json } from '@remix-run/node'
import { requireUserId } from '../sessions'
import { getInvoices } from '@/services/invoice.server'
import { useLoaderData } from '@remix-run/react'
import { DataTable } from '@/components/main/table/data-table'
import { columns } from '@/components/main/table/columns'

export async function loader({ request }: LoaderFunctionArgs) {
    requireUserId(request, '/')

    const invoices = await getInvoices()

    return json({
        invoices
    })
}
export default function Dashboard() {
    const { invoices } = useLoaderData<typeof loader>()

    return (
        <div>
            <h1>Dashboard</h1>
            {/* as any because remix gives weird typings when using loader data */}
            <DataTable columns={columns} data={invoices as any} />
        </div>
    )
}
