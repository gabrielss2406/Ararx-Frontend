import { z } from "zod";

type Comment = {
    id: string;
    commented_by: string;
    comment: string;
    date: string;
    likes: string[];
    reposts: string[];
    comments: Comment[];
};

const CommentSchema: z.ZodType<Comment> = z.object({
    id: z.string(),
    commented_by: z.string(),
    comment: z.string(),
    author: z.string(),
    date: z.string().datetime({ offset: true }),
    likes: z.array(z.string()),
    reposts: z.array(z.string()),
    comments: z.array(z.lazy(() => CommentSchema))
});

export const PostSchema = z.object({
    _id: z.string(),
    author: z.string(),
    content: z.string(),
    isLiked: z.boolean(),
    date: z.string().datetime({ offset: true }),
    likes: z.array(z.string()),
    reposts: z.array(z.string()),
    comments: z.array(CommentSchema)
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

export type PostDetailsType = z.infer<typeof PostDetailsSchema>;
export type PostType = z.infer<typeof PostSchema>;