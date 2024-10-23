import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaRegHeart, FaShareAlt } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import HomeButton from "@/components/homeButton";

interface CommentProps {
    id: string;
    content: string;
    author: string;
    date: string;
    userId: string;
}

interface PostDetailsProps {
    id: string;
    content: string;
    author: string;
    date: string;
    userId: string;
    likesCount: number;
    repliesCount: number;
    comments: CommentProps[];
}

const PostPage = () => {
    const router = useRouter();
    const { id: postId } = router.query;

    const post: PostDetailsProps = {
        id: postId as string,
        content: "Este é um post exemplo para visualização!",
        author: "Carlos Nunes",
        date: "2 horas atrás",
        userId: "1",
        likesCount: 150,
        repliesCount: 5,
        comments: [
            {
                id: "1",
                content: "Ótimo post!",
                author: "Ana Silva",
                date: "1 hora atrás",
                userId: "2",
            },
            {
                id: "2",
                content: "Muito interessante, obrigado por compartilhar!",
                author: "Pedro Almeida",
                date: "30 minutos atrás",
                userId: "3",
            },
        ],
    };

    const [likes, setLikes] = useState(post.likesCount);
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
        setLikes((prev) => (liked ? prev - 1 : prev + 1));
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-[#15202B] rounded-lg border border-gray-700">
            <HomeButton />
            <div className="flex flex-row items-start gap-4 mt-6">
                <Link href={`/profile/${post.userId}`} passHref>
                    <Avatar>
                        <AvatarImage
                            className="w-12 h-12 rounded-full"
                            src="https://github.com/shadcn.png"
                            alt="User avatar"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </Link>

                <div className="flex flex-col w-full">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Link href={`/profile/${post.userId}`} passHref>
                                <span className="font-semibold text-white cursor-pointer hover:underline">
                                    {post.author}
                                </span>
                            </Link>
                            <span className="text-sm text-gray-400">@{post.author}</span>
                        </div>
                        <span className="text-sm text-gray-400">{post.date}</span>
                    </div>

                    <p className="mt-4 text-gray-200">{post.content}</p>

                    <div className="flex items-center justify-between mt-4">
                        <div className="flex gap-6">
                            <button
                                className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
                                onClick={handleLike}
                            >
                                <FaRegHeart
                                    className={`transition-transform duration-200 ${liked ? "text-red-500 scale-125" : ""
                                        }`}
                                />
                                <span>{likes}</span>
                            </button>

                            <button className="flex items-center gap-1 text-gray-400 hover:text-blue-500 transition-colors duration-200">
                                <FaShareAlt />
                                <span>Compartilhar</span>
                            </button>
                        </div>

                        <div className="text-gray-400">
                            <span>{post.repliesCount} respostas</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-xl text-white">Comentários</h2>
                {post.comments.length > 0 ? (
                    post.comments.map((comment) => (
                        <div key={comment.id} className="flex items-start gap-4 mt-4 bg-gray-800 p-4 rounded-lg">
                            <Link href={`/profile/${comment.userId}`} passHref>
                                <Avatar>
                                    <AvatarImage
                                        className="w-10 h-10 rounded-full"
                                        src="https://github.com/shadcn.png"
                                        alt="User avatar"
                                    />
                                    <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </Link>
                            <div className="flex flex-col w-full">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Link href={`/profile/${comment.userId}`} passHref>
                                            <span className="font-semibold text-white cursor-pointer hover:underline">
                                                {comment.author}
                                            </span>
                                        </Link>
                                        <span className="text-sm text-gray-400">{comment.date}</span>
                                    </div>
                                </div>
                                <p className="mt-1 text-gray-200">{comment.content}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400">Nenhum comentário ainda.</p>
                )}
            </div>
        </div>
    );
};

export default PostPage;
