import { SignatureArea } from '@/components/main/signature-area'
import { ClientOnly } from 'remix-utils/client-only'

type SignatureAreaProps = {
    onChange: (signature: string) => void
}

export const ClientOnlySignatureArea: React.FC<SignatureAreaProps> = ({ onChange }) => {
    return <ClientOnly>{() => <SignatureArea onChange={onChange} />}</ClientOnly>
}
