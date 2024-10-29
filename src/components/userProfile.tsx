import { Avatar } from "@/components/ui/avatar";
import { UserProfileType } from "@/models/User";
import ProfilePicture from "./profilePicture";
import { useEffect, useState } from "react";
import { PostService } from "@/services/post";
import { PostType } from "@/models/Post";
import Post from "./post";

interface UserProfileProps {
    user?: UserProfileType;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [pageNum, setPageNum] = useState(1);
    const pageSize = 10;
    const [loading, setLoading] = useState(false);
    const dataService = new PostService();

    useEffect(() => {
        const loadPosts = async () => {
            setLoading(true);
            try {
                const response = await dataService.getPostsFromUser(pageNum, pageSize, user?.handler);
                console.log(response)
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
            </div>

            <div className="mt-6">
                <h2 className="text-xl font-bold">Posts</h2>
                <div className="space-y-4 mt-4">
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
            </div>
        </div>
    );
};

export default UserProfile;
