'use client'

import React, { useEffect, useRef, useState } from 'react'
import SignaturePad from 'signature_pad'

type SignatureAreaProps = {
    onChange: (signature: string) => void
}

export const SignatureArea: React.FC<SignatureAreaProps> = ({ onChange }) => {
    const ref = useRef<HTMLCanvasElement | null>(null)
    function resizeCanvas(signaturePad: SignaturePad) {
        const ratio = Math.max(window.devicePixelRatio || 1, 1)
        const canvas = ref.current!
        canvas.width = canvas.offsetWidth * ratio
        canvas.height = canvas.offsetHeight * ratio
        canvas.getContext('2d')?.scale(ratio, ratio)
        signaturePad.clear()
    }

    useEffect(() => {
        if (!ref.current) {
            return
        }

        const signaturePad = new SignaturePad(ref.current)

        signaturePad.addEventListener('endStroke', () => {
            onChange(signaturePad.toSVG())
        })
        window.addEventListener('resize', () => {
            resizeCanvas(signaturePad)
        })

        return () => {
            signaturePad.clear()
            signaturePad.off()
            window.removeEventListener('resize', () => {
                resizeCanvas(signaturePad)
            })
        }
    }, [])

    return (
        <div className="w-60 rounded-md border border-zinc-500">
            <canvas ref={ref} className="w-full" />
        </div>
    )
}
