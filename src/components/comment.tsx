import { Avatar } from "@/components/ui/avatar";
import Link from "next/link";
import ProfilePicture from "@/components/profilePicture";
import { formatPostDate } from "@/components/helpers/formatDate";
import { CommentType } from "@/models/Post";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { CommentService } from "@/services/comment";
import CommentPopover from "./commentPopover";

interface CommentProps {
  comment: CommentType;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const [liked, setLiked] = useState(comment.isLiked);
  const [likesCount, setLikesCount] = useState(comment.likes.length);
  const [showReplies, setShowReplies] = useState(false);
  const dataService = new CommentService();

  const handleLike = async () => {
    try {
      if (liked) {
        await dataService.unlikeComment(comment._id);
        setLikesCount((prev) => prev - 1);
      } else {
        await dataService.likeComment(comment._id);
        setLikesCount((prev) => prev + 1);
      }
      setLiked(!liked);
    } catch (error) {
      console.error("Erro ao curtir ou remover curtida no comentário:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-4 bg-gray-800 p-4 rounded-lg">
      <div className="flex items-start gap-4">
        <Link href={`/profile/${comment.commented_by}`} passHref>
          <Avatar className="cursor-pointer">
            <ProfilePicture handler={comment.commented_by || ""} />
          </Avatar>
        </Link>
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href={`/profile/${comment.commented_by}`} passHref>
                <span className="font-semibold text-white cursor-pointer hover:underline text-sm md:text-base">
                  <span className="text-xs md:text-sm text-gray-400">
                    @{comment.commented_by}
                  </span>
                </span>
              </Link>
              <span className="text-sm text-gray-400">
                {formatPostDate(comment.date)}
              </span>
            </div>
          </div>
          <p className="mt-1 text-gray-200">{comment.content}</p>

          <div className="flex flex-row gap-6 mt-2 items-center">
            <CommentPopover commentId={comment._id} />
            <button
              className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
              onClick={handleLike}
            >
              {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
              <span>{likesCount}</span>
            </button>

            {comment.comments.length > 0 ? (
              <button
                className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
                onClick={() => setShowReplies(!showReplies)}
              >
                {showReplies ? "Ocultar respostas" : "Vizualizar resposta(s)"}
              </button>
            ) : (
              <span className="text-gray-400">Sem respostas</span>
            )}
          </div>
        </div>
      </div>

      {showReplies && comment.comments.length > 0 && (
        <div className="pl-8 border-l border-gray-700">
          {comment.comments.map((reply) => (
            <div key={reply._id}>
              <div className="flex items-start gap-4 bg-gray-800 p-4 rounded-lg">
                <Link href={`/profile/${reply.commented_by}`} passHref>
                  <Avatar className="cursor-pointer">
                    <ProfilePicture handler={reply.commented_by || ""} />
                  </Avatar>
                </Link>
                <div className="flex flex-col w-full">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Link href={`/profile/${reply.commented_by}`} passHref>
                        <span className="font-semibold text-white cursor-pointer hover:underline text-sm md:text-base">
                          <span className="text-xs md:text-sm text-gray-400">
                            @{reply.commented_by}
                          </span>
                        </span>
                      </Link>
                      <span className="text-sm text-gray-400">
                        {formatPostDate(reply.date)}
                      </span>
                    </div>
                  </div>
                  <p className="mt-1 text-gray-200">{reply.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
