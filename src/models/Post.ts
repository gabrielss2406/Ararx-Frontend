import { z } from "zod";

const CommentSchema = z.object({
    id: z.string(),
    content: z.string(),
    author: z.string(),
    date: z.string(),
    userId: z.string(),
});

export const PostDetailsSchema = z.object({
    id: z.string(),
    content: z.string(),
    author: z.string(),
    date: z.string(),
    userId: z.string(),
    likesCount: z.number(),
    repliesCount: z.number(),
    comments: z.array(CommentSchema),
});

export type CommentType = z.infer<typeof CommentSchema>;
export type PostDetailsType = z.infer<typeof PostDetailsSchema>;
