import { captureRemixErrorBoundaryError } from '@sentry/remix'
import type { LinksFunction } from '@remix-run/node'
import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    json,
    useLoaderData,
    useRouteError,
} from '@remix-run/react'
import stylesheet from './tailwind.css?url'

export async function loader() {
    return json({
        ENV: {
            SENTRY_DSN: process.env.SENTRY_DSN,
        },
    })
}

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: stylesheet }]

export function Layout({ children }: { children: React.ReactNode }) {
    const data = useLoaderData<typeof loader>()

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
                    }}
                />
                <Scripts />
            </body>
        </html>
    )
}

export const ErrorBoundary = () => {
    const error = useRouteError()
    captureRemixErrorBoundaryError(error)
    return <div>Something went wrong</div>
}

export default function App() {
    return <Outlet />
}
