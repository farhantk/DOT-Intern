import { z, ZodType } from "zod"

export class TransactionValidation{
    static readonly CREATE: ZodType = z.object({
        buyer_id: z.string().min(1).max(100),
        payment_method_id: z.string().min(1).max(100),
        product_id: z.string().min(1).max(100),
        shipment_id: z.string().min(1).max(100),
        status: z.string().min(1).max(100),
        amount: z.number().positive(),
        total: z.number().positive(),
    })
    static readonly UPDATE: ZodType = z.object({
        status: z.string().min(1).max(100)
    })
}