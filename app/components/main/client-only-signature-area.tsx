import { SignatureArea } from '@/components/main/signature-area'
import { Skeleton } from '@/components/ui/skeleton'
import { ClientOnly } from 'remix-utils/client-only'

type SignatureAreaProps = {
    onChange: (signature: string) => void
}

export const ClientOnlySignatureArea: React.FC<SignatureAreaProps> = ({ onChange }) => {
    return (
        <ClientOnly fallback={<Skeleton className="h-40 w-60 rounded-md" />}>
            {() => <SignatureArea onChange={onChange} />}
        </ClientOnly>
    )
}
