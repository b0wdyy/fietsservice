import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient()

async function main() {
    for (let i = 0; i < 100; i++) {
        await createInvoice()
    }
}

async function createInvoice() {
    await prisma.invoice.create({
        data: {
            purchaserName: faker.person.fullName(),
            amount: Number(faker.finance.amount()),
            type: faker.helpers.arrayElement(['ELECTRIC', 'RACE', 'NORMAL']),
            brand: faker.vehicle.manufacturer(),
            email: faker.internet.email(),
            deposit: Number(faker.finance.amount()),
            invoiceNumber: faker.number.int().toString(),
            dateOfPurchase: faker.date.recent(),
            extraAgreements: faker.lorem.sentence(),
            image: faker.image.url(),
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
