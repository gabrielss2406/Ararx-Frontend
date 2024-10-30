import Post from "@/components/post";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LoadingSpinner } from "@/components/ui/loading";
import CreatePostForm from "@/forms/CreatePost";
import { PostType } from "@/models/Post";
import { PostService } from "@/services/post";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const pageSize = 10;
  const [loading, setLoading] = useState(false);
  const dataService = new PostService();

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

  useEffect(() => {
    loadPosts();
  }, [pageNum]);

  const handlePostCreated = () => {
    loadPosts();
  };

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

            {/* Passando a função handlePostCreated como prop */}
            <CreatePostForm onPostCreated={handlePostCreated} />
          </div>

          {posts.map((post) => (
            <div key={post._id}>
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
