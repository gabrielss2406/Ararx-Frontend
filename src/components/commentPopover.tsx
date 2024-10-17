import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FaRegComment } from "react-icons/fa";
import { useState } from "react";

const CommentPopover = () => {
    const [comment, setComment] = useState("");
    const [open, setOpen] = useState(false);

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };

    const handlePostComment = () => {
        console.log("Comentário postado:", comment);
        setComment("");
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button className="flex items-center gap-1 text-gray-400 hover:text-blue-500 transition-colors duration-200">
                    <FaRegComment />
                    <span>Comentar</span>
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] sm:w-[500px] p-4 bg-gray-800 text-gray-200 rounded-lg">
                <p className="font-semibold mb-2">Escreva um comentário</p>
                <Textarea
                    placeholder="Digite seu comentário..."
                    value={comment}
                    onChange={handleCommentChange}
                    className="mb-4 h-32 text-gray-200 bg-gray-900 border-gray-700 focus:ring-blue-500 focus:border-blue-500"
                />
                <Button onClick={handlePostComment} className="w-full">
                    Postar Comentário
                </Button>
            </PopoverContent>
        </Popover>
    );
};

export default CommentPopover;