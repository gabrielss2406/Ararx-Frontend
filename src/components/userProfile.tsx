import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Post from "./post";

interface UserProfileProps {
    user: {
        id: string;
        name: string;
        username: string;
        bio: string;
        avatarUrl: string;
        followersCount: number;
        followingCount: number;
        posts: Array<{
            id: string;
            content: string;
            likesCount: number;
            commentsCount: number;
            date: string;
        }>;
    };
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
    return (
        <div className="container mx-auto p-6">
            <div className="flex flex-col items-center">
                <Avatar className="w-20 h-20">
                    <AvatarImage
                        src={user.avatarUrl}
                        alt="User avatar"
                    />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h1 className="text-2xl font-bold mt-4">{user.name}</h1>
                <span className="text-sm text-gray-400">@{user.username}</span>
                <p className="text-center mt-2 text-gray-200">{user.bio}</p>

                <div className="flex gap-4 mt-4">
                    <div className="flex flex-col items-center">
                        <span className="font-semibold text-white">{user.followersCount}</span>
                        <span className="text-gray-400">Seguidores</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="font-semibold text-white">{user.followingCount}</span>
                        <span className="text-gray-400">Seguindo</span>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <h2 className="text-xl font-bold">Posts</h2>
                <div className="space-y-4 mt-4">
                    {user.posts.map((post) => (
                        <div key={post.id}>
                            <Post
                                postId={"64971"}
                                content={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et cursus diam. Fusce sed rutrum sapien. Donec ex purus, tincidunt at libero a, lobortis malesuada quam."}
                                author={"Jorge"}
                                date={"4d ago"}
                                userId={"3123123123"}
                                likesCount={0}
                                commentsCount={0}
                                repliesCount={0}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
