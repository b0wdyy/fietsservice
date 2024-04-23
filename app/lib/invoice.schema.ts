import { z } from 'zod'

export const invoiceSchema = z.object({
    amount: z.number().optional(),
    deposit: z.number().optional(),
    brand: z.string(),
    bikeTypeId: z.string(),
    dateOfPurchase: z.date(),
    purchaserName: z.string(),
    extraAgreements: z.string().optional(),
    invoiceNumber: z.string(),
    email: z.string().email(),
    img: z.instanceof(File),
    signature: z.string(),
})
