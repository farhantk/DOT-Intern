import { z, ZodType } from "zod";


export class BankValidation{
    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1).max(100)
    })
    static readonly UPDATE: ZodType = z.object({
        name: z.string().min(1).max(100)
    })
}