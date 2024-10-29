import Post from "@/components/post";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading";
import { Textarea } from "@/components/ui/textarea";
import { PostType } from "@/models/Post";
import { PostService } from "@/services/post";
import { useCallback, useEffect, useRef, useState } from "react";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const pageSize = 10;
  const [loading, setLoading] = useState(false);
  const dataService = new PostService();

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const response = await dataService.getPosts(pageNum, pageSize);
        setPosts(response);
      } catch (error) {
        console.error("Failed to load posts:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, [pageNum]);

  return (
    <>
      {loading ? (
        <LoadingSpinner label="Carregando dados do usuário..." />
      ) : (
        <div className="h-screen w-full bg-[#15202B] px-[10%]">
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
              <Textarea
                placeholder="O que está acontecendo?"
                className="w-full h-24 p-2 bg-gray-800 text-gray-200 placeholder-gray-500 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <div className="flex justify-between items-center mt-2">
                <Button className="ml-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full">
                  Postar
                </Button>
              </div>
            </div>
          </div>

          {posts.map((post, index) => (
            <div
              key={post._id}
            >
              <Post
                postId={post._id}
                content={post.content}
                author={post.author}
                date={post.date}
                likesCount={post.likes.length}
                commentsCount={post.comments.length}
                repliesCount={post.reposts.length}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
