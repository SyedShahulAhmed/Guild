import z from "zod";

export const createCommunitySchema = z.object({
    name: z.string().min(3).max(100),
    description: z.string()
        .max(500)
        .optional(),
    category: z.string()
        .min(3)
        .max(50),
    logo: z.string().optional(),
    banner: z.string().optional(),
    visibility: z.enum([
        "PUBLIC",
        "PRIVATE",
    ]),

})

export type CreateCommunityInput =
    z.infer<typeof createCommunitySchema>;