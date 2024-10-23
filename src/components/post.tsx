import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaRegHeart, FaShareAlt, FaRegComment } from "react-icons/fa";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Link from "next/link";
import { useRouter } from "next/router";

interface PostProps {
    content: string;
    author: string;
    date: string;
    userId: string;
    postId: string;
    likesCount: number;
    commentsCount: number;
    repliesCount: number;
}

export const Post: React.FC<PostProps> = ({
    content,
    author,
    date,
    userId,
    postId,
    likesCount,
    commentsCount,
    repliesCount,
}) => {
    const router = useRouter();

    const [likes, setLikes] = useState(likesCount);
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
        setLikes((prev) => (liked ? prev - 1 : prev + 1));
    };

    return (
        <div className="flex flex-row items-start gap-4 p-4 bg-gray-900 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-800 transition-colors duration-200">
            <Link href={`/profile/${userId}`}>
                <Avatar className="cursor-pointer">
                    <AvatarImage
                        className="w-12 h-12 rounded-full"
                        src="https://github.com/shadcn.png"
                        alt="User avatar"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </Link>

            <div className="flex flex-col w-full">
                <Link href={`/post/${postId}`} className="flex flex-col w-full">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2" onClick={async () => await router.push(`/profile/${userId}`)}>
                            <span className="font-semibold text-white cursor-pointer hover:underline">
                                {author}
                            </span>
                            <span className="text-sm text-gray-400">@{author}</span>
                        </div>
                        <span className="text-sm text-gray-400">{date}</span>
                    </div>

                    <p className="mt-2 text-gray-200">{content}</p>
                </Link>

                <div className="flex items-center justify-between mt-4">
                    <div className="flex gap-6">
                        <button
                            className="flex items-center gap-1 text-gray-400 hover:text-blue-500 transition-colors duration-200"
                            onClick={(e) => {
                                e.preventDefault();
                                handleLike();
                            }}
                        >
                            <FaRegHeart
                                className={`transition-transform duration-200 ${liked ? "text-red-500 scale-125" : ""}`}
                            />
                            <span>{likes}</span>
                        </button>

                        <Popover>
                            <PopoverTrigger asChild>
                                <button className="flex items-center gap-1 text-gray-400 hover:text-blue-500 transition-colors duration-200">
                                    <FaShareAlt />
                                    <span>Compartilhar</span>
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="bg-gray-800 text-gray-200 p-1 rounded-lg w-36">
                                <ul className="text-center">
                                    <li className="hover:underline cursor-pointer">Repostar</li>
                                </ul>
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="flex gap-6 text-gray-400">
                        <div className="flex items-center gap-1">
                            <FaRegComment />
                            <span>{commentsCount} comentários</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <FaRegComment />
                            <span>{repliesCount} respostas</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
