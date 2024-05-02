import { prisma } from './../db.server'
import bcrypt from 'bcrypt'

export async function verifyUser(email: string, password: string) {
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    })

    if (!user) {
        return null
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
        return null
    }

    return user
}

export async function getUserById(id: string) {
    return prisma.user.findUnique({
        where: {
            id: id,
        },
    })
}

export async function getUserByEmail(email: string) {
    return prisma.user.findUnique({
        where: {
            email: email,
        },
    })
}

export async function createUser(data: { email: string; password: string }) {
    const hashedPassword = await bcrypt.hash(data.password, 10)

    return prisma.user.create({
        data: {
            email: data.email,
            password: hashedPassword,
        },
    })
}

export async function getUsers() {
    return prisma.user.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    })
}
