import { Avatar } from "@/components/ui/avatar";
import { UserProfileType } from "@/models/User";
import ProfilePicture from "./profilePicture";
import { useEffect, useRef, useState } from "react";
import { PostService } from "@/services/post";
import { PostType } from "@/models/Post";
import Post from "./post";
import { LoadingSpinner } from "./ui/loading";
import { Loader2 } from "lucide-react";
import { FollowService } from "@/services/follow";

interface UserProfileProps {
    user?: UserProfileType;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [pageNum, setPageNum] = useState(1);
    const pageSize = 10;
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [isFollowing, setIsFollowing] = useState(user?.isFollowing);
    const dataService = new PostService();
    const followService = new FollowService();
    const endOfPageRef = useRef<HTMLDivElement>(null);

    const loadPosts = async () => {
        if (!hasMore) return;
        setLoading(true);
        try {
            console.log(user?.isFollowing)
            const response = await dataService.getPostsFromUser(pageNum, pageSize, user?.handler);

            if (response.length < pageSize) setHasMore(false);

            setPosts((prevPosts) => {
                const existingIds = new Set(prevPosts.map(post => post._id));
                const newPosts = response.filter(post => !existingIds.has(post._id));
                return [...prevPosts, ...newPosts];
            });
        } catch (error) {
            console.error("Failed to load posts:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFollow = async () => {
        try {
            if (isFollowing) {
                await followService.unfollow(user?.handler as string);
                setIsFollowing(false);
            } else {
                await followService.follow(user?.handler as string);
                setIsFollowing(true);
            }
        } catch (error) {
            console.error("Failed to follow/unfollow:", error);
        }
    };

    useEffect(() => {
        loadPosts();
    }, [pageNum, user?.handler]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    setPageNum((prevPage) => prevPage + 1);
                }
            },
            { threshold: 1 }
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
        <>
            {loading && !posts.length ? (
                <LoadingSpinner label="Carregando dados do usuário..." />
            ) : (
                <div className="container mx-auto p-6">
                    <div className="flex flex-col items-center">
                        <Avatar className="w-20 h-20">
                            <ProfilePicture handler={user?.handler || "Username"} />
                        </Avatar>
                        <h1 className="text-2xl font-bold mt-4">{user?.username}</h1>
                        <span className="text-sm text-gray-400">@{user?.handler}</span>
                        <p className="text-center mt-2 text-gray-200">{user?.bio}</p>

                        <div className="flex gap-4 mt-4">
                            <div className="flex flex-col items-center">
                                <span className="font-semibold text-white">{user?.followers.length}</span>
                                <span className="text-gray-400">Seguidores</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="font-semibold text-white">{user?.following.length}</span>
                                <span className="text-gray-400">Seguindo</span>
                            </div>
                        </div>
                        <button
                            onClick={handleFollow}
                            className={`mt-4 px-4 py-2 rounded ${isFollowing ? 'bg-red-500' : 'bg-blue-500'
                                } text-white`}
                        >
                            {isFollowing ? 'Parar de seguir' : 'Seguir'}
                        </button>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-xl font-bold">Posts</h2>
                        <div className="space-y-4 mt-4">
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
                        </div>
                    </div>
                    <div ref={endOfPageRef} className="h-40"></div>
                </div>
            )}
        </>
    );
};

export default UserProfile;
