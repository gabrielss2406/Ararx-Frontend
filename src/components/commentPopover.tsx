import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FaRegComment } from "react-icons/fa";
import { useState } from "react";
import { CommentService } from "@/services/comment";
import { toast } from "sonner";

interface CommentPopoverProps {
    commentId: string;
}

const CommentPopover: React.FC<CommentPopoverProps> = ({ commentId }) => {
    const [comment, setComment] = useState("");
    const [open, setOpen] = useState(false);
    const dataService = new CommentService();


    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };

    const handlePostComment = async () => {
        try {
            await dataService.sendComment(commentId, comment)
            toast.success("Comentário postado!");
            setComment("");
            setOpen(false);
        } catch (error) {
            toast.error("Erro ao postar comentário");
            console.error("Erro ao postar comentário:", error);
        }
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
                <p className="font-semibold mb-2">Escreva uma resposta</p>
                <Textarea
                    placeholder="Digite sua resposta..."
                    value={comment}
                    onChange={handleCommentChange}
                    className="mb-4 h-32 text-gray-200 bg-gray-900 border-gray-700 focus:ring-blue-500 focus:border-blue-500"
                />
                <Button onClick={handlePostComment} className="w-full">
                    Postar resposta
                </Button>
            </PopoverContent>
        </Popover>
    );
};

export default CommentPopover;