

import { z } from "zod";

export const ProfileSchema = z.object({
    bio: z.string().max(500).optional(),

    avatarUrl: z.string().optional(),

    socialLinks: z.object({
        github: z.string().optional(),
        linkedin: z.string().optional(),
        website: z.string().optional(),
        twitter: z.string().optional(),
    }),
});

export type ProfileData = z.infer<typeof ProfileSchema>;