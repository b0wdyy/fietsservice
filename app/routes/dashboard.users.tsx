import { CreateUser } from '@/components/dashboard/create-user'
import { DataTable } from '@/components/main/table/data-table'
import { Separator } from '@/components/ui/separator'
import { Wrapper } from '@/components/ui/wrapper'
import { userColumns } from '@/lib/columns'
import { createUser, getUsers } from '@/services/user.server'
import { User } from '@prisma/client'
import { ActionFunction, json, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { requireUserId } from 'app/sessions'

export const loader = async () => {
    const users = await getUsers()

    return json({
        users,
    })
}

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData()
    const email = String(formData.get('email'))
    const password = String(formData.get('password'))

    await requireUserId(request)

    await createUser({ email, password })

    return redirect('/dashboard/users')
}

export default function Users() {
    const { users } = useLoaderData<typeof loader>()

    return (
        <div>
            <h2 className="text-2xl font-bold">Gebruikers</h2>
            <Separator className="my-2" />
            <p className="mt-4 text-zinc-400">
                Deze gebruikers hebben toegang tot het dashboard. Ze kunnen bijvoorbeeld fiets types
                toevoegen of alle orders bekijken.
            </p>

            <Wrapper>
                {users.length ? (
                    <DataTable columns={userColumns} data={users as any} />
                ) : (
                    <p>no users</p>
                )}
            </Wrapper>

            <CreateUser />
        </div>
    )
}
