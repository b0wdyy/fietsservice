import { createCookieSessionStorage } from '@remix-run/node'

const { getSession, commitSession, destroySession } = createCookieSessionStorage({
    cookie: {
        name: '__session',
        secrets: [process.env.SESSION_SECRET!],
        sameSite: 'lax',
    },
})

export { getSession, commitSession, destroySession }
