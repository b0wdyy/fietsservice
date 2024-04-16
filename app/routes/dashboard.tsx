import { LoaderFunctionArgs, redirect } from '@remix-run/node'
import { destroySession, getSession } from '../sessions'

export async function loader({ request }: LoaderFunctionArgs) {
    const session = await getSession(request.headers.get('Cookie'))

    if (!session.has('userId')) {
        return redirect('/login', {
            headers: {
                'Set-Cookie': await destroySession(session),
            },
        })
    }

    return null
}
export default function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}
