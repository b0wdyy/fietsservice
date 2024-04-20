import { prisma } from '../db.server'

export async function getInvoices() {
    return prisma.invoice.findMany({
        select: {
            bikeType: {
                select: {
                    name: true
                }
            },
            brand: true,
            email: true,
            amount: true,
            purchaserName: true,
            invoiceNumber: true,
        }
    })
}

export async function getInvoice(id: string) {
    return prisma.invoice.findFirst({
        where: {
            id
        },
        select: {
            bikeType: {
                select: {
                    name: true
                }
            },
            brand: true,
            email: true,
            amount: true,
            deposit: true,
            purchaserName: true,
            dateOfPurchase: true,
            invoiceNumber: true,
            image: true,
        }
    })
}
