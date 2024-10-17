import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaRegHeart, FaShareAlt } from "react-icons/fa";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import CommentPopover from "./commentPopover";

interface PostProps {
    content: string
    author: string
    date: string
}

export const Post: React.FC<PostProps> = ({ content, author, date }) => {
    const [likes, setLikes] = useState(50);
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
        setLikes((prev) => (liked ? prev - 1 : prev + 1));
    };

    return (
        <div className="flex flex-row items-start gap-4 p-4 bg-gray-900 rounded-lg border border-gray-700">
            <Avatar>
                <AvatarImage
                    className="w-12 h-12 rounded-full"
                    src="https://github.com/shadcn.png"
                    alt="User avatar"
                />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="flex flex-col w-full">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{author}</span>
                        <span className="text-sm text-gray-400">@{author}</span>
                    </div>
                    <span className="text-sm text-gray-400">{date}</span>
                </div>

                <p className="mt-2 text-gray-200">
                    {content}
                </p>

                <div className="flex items-center justify-between mt-4">
                    <div className="flex gap-4">
                        <button
                            className="flex items-center gap-1 text-gray-400 hover:text-blue-500 transition-colors duration-200"
                            onClick={handleLike}
                        >
                            <FaRegHeart
                                className={`transition-transform duration-200 ${liked ? 'text-red-500 scale-125' : ''}`}
                            />
                            <span>{likes}</span>
                        </button>
                        <CommentPopover />
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
                </div>
            </div>
        </div>
    );
};

export default Post;
