import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { verifyUser } from '@/services/user.server'
import { ActionFunctionArgs, LoaderFunctionArgs, json, redirect } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { commitSession, getSession } from '../sessions'

export async function loader({ request }: LoaderFunctionArgs) {
    const session = await getSession(request.headers.get('Cookie'))

    if (session.has('userId')) {
        return redirect('/')
    }

    const data = { error: session.get('error') }

    return json(data, {
        headers: {
            'Set-Cookie': await commitSession(session),
        },
    })
}

export async function action({ request }: ActionFunctionArgs) {
    const session = await getSession(request.headers.get('Cookie'))
    const formData = await request.formData()

    const email = formData.get('email')
    const password = formData.get('password')

    const user = await verifyUser(email as string, password as string)

    if (!user) {
        session.flash('error', 'Invalid username/password')

        return redirect('/login', {
            headers: {
                'Set-Cookie': await commitSession(session),
            },
        })
    }

    session.set('userId', user.id)

    return redirect('/dashboard', {
        headers: {
            'Set-Cookie': await commitSession(session),
        },
    })
}

export default function Login() {
    const { error } = useLoaderData<typeof loader>()

    return (
        <div className="grid h-screen w-screen place-content-center">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Enkel een admin kan inloggen</CardDescription>
                    {error && <CardDescription className="text-red-500">{error}</CardDescription>}
                </CardHeader>

                <CardContent>
                    <Form method="POST" id="login-form">
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" placeholder="john.doe@gmail.com" />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    placeholder="**********"
                                    type="password"
                                />
                            </div>
                        </div>
                    </Form>
                </CardContent>

                <CardFooter className="flex justify-between">
                    <Button form="login-form" type="submit">
                        Login
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
