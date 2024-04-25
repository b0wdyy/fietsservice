import * as Sentry from '@sentry/remix'
import { RemixBrowser, useLocation, useMatches } from '@remix-run/react'
import { startTransition, StrictMode, useEffect } from 'react'
import { hydrateRoot } from 'react-dom/client'

Sentry.init({
    dsn: (window as any).ENV.SENTRY_DSN,
    tracesSampleRate: 1,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1,

    integrations: [
        Sentry.browserTracingIntegration({
            useEffect,
            useLocation,
            useMatches,
        }),
        Sentry.replayIntegration(),
    ],
})

startTransition(() => {
    hydrateRoot(
        document,
        <StrictMode>
            <RemixBrowser />
        </StrictMode>
    )
})
