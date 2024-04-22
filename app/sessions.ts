import { Session, createCookieSessionStorage, redirect } from '@remix-run/node'

export const { getSession, commitSession, destroySession } = createCookieSessionStorage({
    cookie: {
        name: '__session',
        secrets: [process.env.SESSION_SECRET!],
        sameSite: 'lax',
    },
})

async function generateTest(redirectTo: string, session: Session) {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]])

    throw redirect(`/login?${searchParams}`, {
        headers: {
            'Set-Cookie': await destroySession(session),
        },
    })
}

function getUserSession(request: Request) {
    return getSession(request.headers.get('Cookie'))
}

export async function requireUserId(
    request: Request,
    redirectTo: string = new URL(request.url).pathname
) {
    const session = await getUserSession(request)
    const userId = session.get('userId')

    if (userId) {
        const user = await __prisma.user.findUnique({
            where: {
                id: userId,
            },
        })

        if (!user) {
            await generateTest(redirectTo, session)
        }
    }

    if (!userId || typeof userId !== 'string') {
        await generateTest(redirectTo, session)
    }

    return userId
}
