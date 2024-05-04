type WrapperProps = {
    children: React.ReactNode
}

export const Wrapper = ({ children }: WrapperProps) => {
    return <div className=" mt-8 max-w-5xl">{children}</div>
}
