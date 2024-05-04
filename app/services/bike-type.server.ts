import { prisma } from '@/db.server'

export async function getBikeTypeById(id: string) {
    return prisma.bikeType.findFirst({
        where: {
            id,
        },
    })
}

export async function getBikeTypes() {
    return prisma.bikeType.findMany()
}
