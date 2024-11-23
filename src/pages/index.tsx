import Post from "@/components/post";
import CreatePostForm from "@/forms/CreatePost";
import { PostType } from "@/models/Post";
import { PostService } from "@/services/post";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const pageSize = 5;
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const dataService = new PostService();
  const endOfPageRef = useRef<HTMLDivElement>(null);

  const loadPosts = async () => {
    if (!hasMore) return;
    setLoading(true);
    try {
      const response = await dataService.getPosts(pageNum, pageSize);
      if (response.length < pageSize) setHasMore(false);

      setPosts((prevPosts) => {
        const existingIds = new Set(prevPosts.map((post) => post._id));
        const newPosts = response.filter((post) => !existingIds.has(post._id));
        return [...prevPosts, ...newPosts];
      });
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
    setPageNum(1);
    setPosts([]);
    setHasMore(true);
    loadPosts();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPageNum((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1 },
    );

    if (endOfPageRef.current) {
      observer.observe(endOfPageRef.current);
    }

    return () => {
      if (endOfPageRef.current) {
        observer.unobserve(endOfPageRef.current);
      }
    };
  }, [endOfPageRef, hasMore, loading]);

  return (
    <div className="h-screen w-full bg-[#15202B] px-[10%]">
      <div className="flex flex-row items-start gap-4 p-8 bg-gray-900 rounded-lg border border-gray-700">
        <CreatePostForm onPostCreated={handlePostCreated} />
      </div>

      {posts.map((post) => (
        <div key={post._id}>
          <Post
            postId={post._id}
            content={post.content}
            author={post.author}
            isLiked={post.isLiked}
            date={post.date}
            likesCount={post.likes.length}
            commentsCount={post.comments.length}
            repliesCount={post.reposts.length}
          />
        </div>
      ))}
      {loading && (
        <div className="w-full flex justify-center p-2">
          <Loader2 className="animate-spin h-12 w-12 text-white" />
        </div>
      )}
      <div ref={endOfPageRef} className="h-40"></div>
    </div>
  );
};

export default Home;
