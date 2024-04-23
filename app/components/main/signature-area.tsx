import React, { useRef } from 'react'

type SignatureAreaProps = {
    onChange: (signature: string) => void
}

export const SignatureArea: React.FC<SignatureAreaProps> = ({ onChange }) => {
    const ref = useRef<any>(null)

    function onEnd() {
        onChange(ref.current?.toDataURL() ?? '')
    }

    return <div className="flex flex-row gap-8"></div>
}
