import { createUser } from '@/services/user.server'

createUser({
    email: 'admin@vndl.dev',
    password: 'admin',
})
    .then(() => {
        console.log('🚀 User created')
    })
    .catch(() => {
        console.log('🔥 User creation failed')
        process.exit(1)
    })
