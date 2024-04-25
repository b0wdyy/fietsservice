import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckIcon } from '@radix-ui/react-icons'

export function AlertSuccess({ message }: { message: string }) {
    return (
        <Alert className="fixed bottom-8 left-1/2 w-3/4 -translate-x-1/2 bg-green-100 text-green-500">
            <CheckIcon className="h-4 w-4 fill-current !text-green-500" />
            <AlertTitle>Yay!</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    )
}
