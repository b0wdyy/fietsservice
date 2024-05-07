import { z } from 'zod'

export const invoiceSchema = z.object({
    amount: z.number(),
    bikeTypeId: z.string(),
    brand: z.string(),
    dateOfPurchase: z.date(),
    deposit: z.number().optional(),
    email: z.string().email(),
    extraAgreements: z.string().optional(),
    img: z.instanceof(File),
    purchaserName: z.string(),
    signature: z.string().optional(),
})
