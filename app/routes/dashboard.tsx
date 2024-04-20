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
            <h1 className='text-3xl font-bold mb-4 mt-8 ml-48'>Dashboard</h1>
            <Navigation />

            <div className='ml-44'>
                <Outlet />
            </div>
        </main>
    )
}
