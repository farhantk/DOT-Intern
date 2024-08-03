import { z, ZodType } from "zod";


export class ProductValidation{
    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1).max(100),
        price: z.number().positive(),
        desc: z.string().min(1).max(255),
        image: z.string().min(1).max(100),
        condition: z.string().min(1).max(100),
    })
    static readonly UPDATE: ZodType = z.object({
        name: z.string().min(1).max(100),
        price: z.number().positive(),
        desc: z.string().min(1).max(255),
        image: z.string().min(1).max(100).optional(),
        condition: z.string().min(1).max(100),
    })
}