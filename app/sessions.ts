import { createCookieSessionStorage, redirect } from '@remix-run/node'

export const { getSession, commitSession, destroySession } = createCookieSessionStorage({
    cookie: {
        name: '__session',
        secrets: [process.env.SESSION_SECRET!],
        sameSite: 'lax',
    },
});

function getUserSession(request: Request) {
    return getSession(request.headers.get('Cookie'))
}

export async function requireUserId(
    request: Request,
    redirectTo: string = new URL(request.url).pathname,
) {
    const session = await getUserSession(request)
    const userId = session.get('userId')

    if (!userId || typeof userId !== 'string') {
        const searchParams = new URLSearchParams([['redirectTo', redirectTo]])

        throw redirect(`/login?${searchParams}`)
    }

    return userId
}
