import { LoaderFunctionArgs } from '@remix-run/node'
import { requireUserId } from '../sessions'
import { Outlet } from '@remix-run/react'
import { Navigation } from '@/components/dashboard/navigation'

export async function loader({ request }: LoaderFunctionArgs) {
    await requireUserId(request, '/')

    return null
}

export default function Dashboard() {
    return (
        <main>
            <h1 className="mb-4 ml-56 mt-8 text-3xl font-bold">Dashboard</h1>
            <Navigation />

            <div className="ml-56 mr-12">
                <Outlet />
            </div>
        </main>
    )
}
