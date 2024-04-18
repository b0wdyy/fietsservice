type WrapperProps = {
    children: React.ReactNode
}

export const Wrapper = ({ children }: WrapperProps) => {
    return (
        <div className="max-w-5xl m-auto">{children}</div>
    )
}
