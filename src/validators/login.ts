import z from "zod";


export const LoginSchema = z.object({
    email: z.string().email("Invalid email ").trim(),
    password: z.
        string()
        .min(6, "Password must be at least 6 characters long")
})

export type LoginData = z.infer<typeof LoginSchema>