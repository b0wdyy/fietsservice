import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient()

async function main() {
    await createBikeType()
    for (let i = 0; i < 10; i++) {
        await createInvoice()
    }
}

async function createBikeType() {
    const types = [
        'Elektrische fiets',
        'Stadsfiets',
        'Koersfiets',
        'Mountainbike',
        'Plooifiets',
        'Andere',
    ]

    for (const bikeType of types) {
        await prisma.bikeType.create({
            data: {
                name: bikeType
            }
        })
    }

}

async function createInvoice() {
    const bikeTypes = await prisma.bikeType.findMany()
    const randomBikeType = faker.helpers.arrayElement(bikeTypes)

    await prisma.invoice.create({
        data: {
            purchaserName: faker.person.fullName(),
            amount: Number(faker.finance.amount()),
            brand: faker.vehicle.manufacturer(),
            email: faker.internet.email(),
            deposit: Number(faker.finance.amount()),
            invoiceNumber: faker.number.int().toString(),
            dateOfPurchase: faker.date.recent(),
            extraAgreements: faker.lorem.sentence(),
            image: faker.image.url(),
            bikeTypeId: randomBikeType.id
        },
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
