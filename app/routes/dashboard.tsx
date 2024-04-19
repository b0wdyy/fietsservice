import { LoaderFunctionArgs, json } from '@remix-run/node'
import { requireUserId } from '../sessions'
import { getInvoices } from '@/services/invoice.server'
import { useLoaderData } from '@remix-run/react'
import { DataTable } from '@/components/main/table/data-table'
import { columns } from '@/components/main/table/columns'
import { Wrapper } from '@/components/ui/wrapper'

export async function loader({ request }: LoaderFunctionArgs) {
    await requireUserId(request, '/')

    const invoices = await getInvoices()

    return json({
        invoices
    })
}

export default function Dashboard() {
    const { invoices } = useLoaderData<typeof loader>()

    return (
        <Wrapper>
            <h1 className='text-3xl font-bold my-4'>Dashboard</h1>
            {/* as any because remix gives weird typings when using loader data */}
            <DataTable columns={columns} data={invoices as any} />
        </Wrapper>
    )
}
