import { prisma } from '../db.server'

export async function createInvoice(data: {
    bikeTypeId: string
    brand: string
    email: string
    amount: number
    deposit: number
    purchaserName: string
    dateOfPurchase: Date
    invoiceNumber: string
    image: string
    signature: string
    extraAgreements: string
}) {
    return prisma.invoice.create({
        data,
        include: {
            bikeType: true,
        },
    })
}

export async function getInvoices() {
    return prisma.invoice.findMany({
        select: {
            bikeType: {
                select: {
                    name: true,
                },
            },
            brand: true,
            email: true,
            amount: true,
            purchaserName: true,
            invoiceNumber: true,
        },
    })
}

export async function getInvoice(id: string) {
    return prisma.invoice.findFirst({
        where: {
            id,
        },
        select: {
            bikeType: {
                select: {
                    name: true,
                },
            },
            brand: true,
            email: true,
            amount: true,
            deposit: true,
            purchaserName: true,
            dateOfPurchase: true,
            invoiceNumber: true,
            image: true,
        },
    })
}
