import { z, ZodType } from "zod"



export class PaymentValidation{
    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1).max(100),
        bank_id: z.string().min(1).max(100),
        acc_name: z.string().min(1).max(100),
        acc_number: z.string().min(1).max(100),
    })
    static readonly UPDATE: ZodType = z.object({
        name: z.string().min(1).max(100),
        bank_id: z.string().min(1).max(100),
        acc_name: z.string().min(1).max(100),
        acc_number: z.string().min(1).max(100),
    })
}