export async function getBikeTypeById(id: string) {
    return __prisma.bikeType.findFirst({
        where: {
            id,
        },
    })
}
