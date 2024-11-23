import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { CommentService } from "@/services/comment";

const postSchema = z.object({
  content: z.string().min(1, "O conteúdo não pode estar vazio."),
});

interface CreateCommentFormProps {
  parentId: string;
  onCommentCreated: () => void;
}

const CreateCommentForm: React.FC<CreateCommentFormProps> = ({
  parentId,
  onCommentCreated,
}) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const commentService = new CommentService();

  const handleSubmit = async () => {
    const result = postSchema.safeParse({ content });

    if (!result.success) {
      toast.error("Erro de validação dos dados");
      return;
    }

    setLoading(true);

    try {
      await commentService.sendComment(parentId, content);
      setContent("");
      onCommentCreated();
      toast.success("Comentário criado com sucesso");
    } catch (error) {
      console.error("Erro ao criar comentário:", error);
      toast.error("Erro ao criar comentário");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <Textarea
        placeholder="Insira sua resposta"
        className="w-full h-16 p-4 bg-gray-800 text-gray-200 placeholder-gray-500 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={loading}
      />
      <div className="flex justify-between items-center mt-2">
        <Button
          className="ml-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Comentando..." : "Comentar"}
        </Button>
      </div>
    </div>
  );
};

export default CreateCommentForm;
