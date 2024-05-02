import { useNavigation } from '@remix-run/react'

export const useIsSubmitting = () => {
    const navigation = useNavigation()
    return navigation.state === 'submitting'
}
