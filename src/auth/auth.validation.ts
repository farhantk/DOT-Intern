import { z, ZodType } from "zod";


export class AuthValidation{
    static readonly SIGNUP : ZodType = z.object({
        name: z.string().min(1).max(100),
        email : z.string().email().min(1).max(100),
        street : z.string().min(1).max(100),
        city : z.string().min(1).max(100),
        province : z.string().min(1).max(100),
        country : z.string().min(1).max(100),
        postal_code : z.string().min(1).max(10),
        password : z.string().min(1).max(10)
    });
    static readonly UPDATE : ZodType = z.object({
        name: z.string().min(1).max(100),
        street : z.string().min(1).max(100),
        city : z.string().min(1).max(100),
        province : z.string().min(1).max(100),
        country : z.string().min(1).max(100),
        postal_code : z.string().min(1).max(10)
    });
    static readonly SIGNIN : ZodType = z.object({
        email : z.string().email().min(1).max(100),
        password : z.string().min(1).max(10)
    });
}
