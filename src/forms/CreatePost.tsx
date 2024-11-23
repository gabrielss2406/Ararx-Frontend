import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PostService } from "@/services/post";
import { toast } from "sonner";

const postSchema = z.object({
  content: z.string().min(1, "O conteúdo não pode estar vazio."),
});

interface CreatePostFormProps {
  onPostCreated: () => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onPostCreated }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const postService = new PostService();

  const handleSubmit = async () => {
    const result = postSchema.safeParse({ content });

    if (!result.success) {
      toast.error("Erro de validação dos dados");
      return;
    }

    setLoading(true);

    try {
      await postService.createPost(content);
      setContent("");
      onPostCreated();
      toast.success("Post criado com sucesso");
    } catch (error) {
      console.error("Erro ao criar post:", error);
      toast.error("Erro ao criar post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <Textarea
        placeholder="O que está acontecendo?"
        className="w-full h-24 p-4 bg-gray-800 text-gray-200 placeholder-gray-500 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
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
          {loading ? "Postando..." : "Postar"}
        </Button>
      </div>
    </div>
  );
};

export default CreatePostForm;
