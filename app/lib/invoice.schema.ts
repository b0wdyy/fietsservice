import { z } from 'zod'

export const invoiceSchema = z.object({
    amount: z.number(),
    deposit: z.number().optional(),
    brand: z.string(),
    bikeTypeId: z.string(),
    dateOfPurchase: z.date(),
    purchaserName: z.string(),
    extraAgreements: z.string().optional(),
    email: z.string().email(),
    img: z.instanceof(File),
    signature: z.string().optional(),
})
