import { z, ZodType } from "zod";


export class ShipmentValidation{
    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1).max(100),
        price: z.number().positive()
    })
    static readonly UPDATE: ZodType = z.object({
        name: z.string().min(1).max(100),
        price: z.number().positive()
    })
}