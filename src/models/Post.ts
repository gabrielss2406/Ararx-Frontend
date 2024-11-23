import { z } from "zod";

type Comment = {
  _id: string;
  commented_by: string;
  content: string;
  date: string;
  likes: string[];
  isLiked: boolean;
  reposts: string[];
  comments: Comment[];
};

const CommentSchema: z.ZodType<Comment> = z.object({
  _id: z.string(),
  commented_by: z.string(),
  content: z.string(),
  comment_by: z.string(),
  date: z.string().datetime({ offset: true }),
  likes: z.array(z.string()),
  isLiked: z.boolean(),
  reposts: z.array(z.string()),
  comments: z.array(z.lazy(() => CommentSchema)),
});

export const PostSchema = z.object({
  _id: z.string(),
  author: z.string(),
  content: z.string(),
  isLiked: z.boolean(),
  date: z.string().datetime({ offset: true }),
  likes: z.array(z.string()),
  reposts: z.array(z.string()),
  comments: z.array(CommentSchema),
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
export type PostType = z.infer<typeof PostSchema>;
