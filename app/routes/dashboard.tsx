import { MobileNavigation } from '@/components/dashboard/mobile-navigation'
import { Navigation } from '@/components/dashboard/navigation'
import { LoaderFunctionArgs } from '@remix-run/node'
import { MetaFunction, Outlet } from '@remix-run/react'
import { requireUserId } from '../sessions'

export const meta: MetaFunction = () => {
    return [
        {
            title: 'Dashboard',
        },
    ]
}

export async function loader({ request }: LoaderFunctionArgs) {
    await requireUserId(request, '/')

    return null
}

export default function Dashboard() {
    return (
        <main>
            <h1 className="mb-4 ml-8 mt-8 text-3xl font-bold md:ml-56">Dashboard</h1>
            <Navigation />
            <MobileNavigation />

            <div className="mr-12 md:ml-56">
                <Outlet />
            </div>
        </main>
    )
}
