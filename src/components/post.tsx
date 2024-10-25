import { Avatar } from "@/components/ui/avatar";
import { FaRegHeart, FaShareAlt, FaRegComment } from "react-icons/fa";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Link from "next/link";
import { useRouter } from "next/router";
import ProfilePicture from "./profilePicture";

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
        <div className="flex flex-col md:flex-row items-start gap-4 p-4 bg-gray-900 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-800 transition-colors duration-200 w-full">
            <Link href={`/profile/${userId}`}>
                <Avatar className="cursor-pointer">
                    <ProfilePicture handler={author || ""} />
                </Avatar>
            </Link>

            <div className="flex flex-col w-full">
                <div className="flex flex-col w-full z-0" onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/post/${postId}`);
                }}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span
                                className="font-semibold text-white cursor-pointer hover:underline text-sm md:text-base"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    router.push(`/profile/${userId}`);
                                }}
                            >
                                {author}
                            </span>
                            <span className="text-xs md:text-sm text-gray-400">@{author}</span>
                        </div>
                        <span className="text-xs md:text-sm text-gray-400">{date}</span>
                    </div>

                    <p className="mt-2 text-gray-200 text-sm md:text-base">{content}</p>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-4 gap-4 md:gap-0">
                    <div className="flex gap-4 md:gap-6">
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

                    <div className="flex gap-4 md:gap-6 text-gray-400">
                        <div className="flex items-center gap-1">
                            <FaRegComment />
                            <span className="text-xs md:text-sm">{commentsCount} comentários</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <FaRegComment />
                            <span className="text-xs md:text-sm">{repliesCount} respostas</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
