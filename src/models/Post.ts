import { z } from "zod";

// const PostSchema = z.object({
//     content: z.string(),
//     author: z.string(),
//     date: z.string(),
//     userId: z.string(),
//     postId: z.string(),
//     likesCount: z.number(),
//     commentsCount: z.number(),
//     repliesCount: z.number()
// })

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

// export type PostType = z.infer<typeof PostSchema>;
export type CommentType = z.infer<typeof CommentSchema>;
export type PostDetailsType = z.infer<typeof PostDetailsSchema>;
