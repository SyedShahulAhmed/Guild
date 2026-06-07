import z from "zod";


export const SignupSchema = z.object({
    username: z
        .string()
        .min(3, "Username must be atleast 3 characters")
        .max(30, "Username must be less than 30 characters")
        .trim()
    ,
    email: z.email("Invalid email address").trim()
    ,
    password: z
        .string()
        .trim()
        .min(6, "Password must be atleast 6 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "Password must contain uppercase, lowercase, and a number"
        )
    ,
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

export type SignupData = z.infer<typeof SignupSchema>
