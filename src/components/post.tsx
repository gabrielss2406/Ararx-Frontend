import { Avatar } from "@/components/ui/avatar";
import { FaRegHeart, FaRegComment, FaHeart } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ProfilePicture from "./profilePicture";
import { PostInteractService } from "@/services/postInteract";
import { formatPostDate } from "./helpers/formatDate";

interface PostProps {
  content: string;
  author: string;
  date: string;
  postId: string;
  isLiked: boolean;
  likesCount: number;
  commentsCount: number;
  repliesCount: number;
}

export const Post: React.FC<PostProps> = ({
  content,
  author,
  date,
  postId,
  isLiked,
  likesCount,
  commentsCount,
}) => {
  const router = useRouter();
  const [likes, setLikes] = useState(likesCount);
  const [liked, setLiked] = useState(isLiked);
  const postInteractService = new PostInteractService();

  const handleLike = async () => {
    try {
      if (liked) {
        await postInteractService.dislike(postId);
        setLikes((prev) => prev - 1);
      } else {
        await postInteractService.like(postId);
        setLikes((prev) => prev + 1);
      }
      setLiked(!liked);
    } catch (error) {
      console.error("Erro ao curtir ou remover curtida no post:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-start gap-4 p-4 bg-gray-900 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-800 transition-colors duration-200 w-full">
      <Link href={`/profile/${author}`}>
        <Avatar className="cursor-pointer">
          <ProfilePicture handler={author || ""} />
        </Avatar>
      </Link>

      <div className="flex flex-col w-full">
        <div
          className="flex flex-col w-full z-0"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/post/${postId}`);
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="font-semibold text-white cursor-pointer hover:underline text-sm md:text-base"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/profile/${author}`);
                }}
              >
                <span className="text-xs md:text-sm text-gray-400">
                  @{author}
                </span>
              </span>
            </div>
            <span className="text-xs md:text-sm text-gray-400">
              {formatPostDate(date)}
            </span>
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
              {liked ? (
                <FaHeart
                  className={`transition-transform duration-200 transform text-red-500`}
                />
              ) : (
                <FaRegHeart
                  className={`transition-transform duration-200 ${liked ? "text-red-500" : ""} transform scale-100`}
                />
              )}
              <span>{likes}</span>
            </button>
          </div>

          <div className="flex gap-4 md:gap-6 text-gray-400">
            <div className="flex items-center gap-1">
              <FaRegComment />
              <span className="text-xs md:text-sm">
                {commentsCount} comentários
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
