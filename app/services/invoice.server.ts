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
    const { bikeTypeId, ...withoutBikeTypeId } = data

    return prisma.invoice.create({
        data: {
            ...withoutBikeTypeId,
            invoiceNumber: generateInvoiceNumber(),
            bikeType: {
                connect: {
                    id: bikeTypeId,
                },
            },
        },
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

function generateInvoiceNumber() {
    const date = new Date()
    const dateString = `
        ${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date
            .getDate()
            .toString()
            .padStart(2, '0')}
        `
    const uniqueId = Math.random().toString(36).substring(2, 9)

    return `FS${dateString}${uniqueId.toUpperCase()}`
}
