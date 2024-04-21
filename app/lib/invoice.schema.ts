import { z } from 'zod'

export const invoiceSchema = z.object({
    amount: z.string().optional(),
    deposit: z.string().optional(),
    brand: z.string(),
    bikeTypeId: z.string(),
    dateOfPurchase: z.date(),
    purchaserName: z.string(),
    extraAgreements: z.string().optional(),
    invoiceNumber: z.string(),
    email: z.string().email(),
    img: z.instanceof(File),
})
