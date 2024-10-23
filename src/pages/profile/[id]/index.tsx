import { useRouter } from "next/router";
import UserProfile from "@/components/userProfile";
import HomeButton from "@/components/homeButton";

const UserProfilePage = () => {
    const router = useRouter();
    const { id: userId } = router.query;

    const user = {
        id: userId as string,
        name: "Carlos Nunes",
        username: "carlosnunes",
        bio: "Desenvolvedor Frontend | Amo programação e café.",
        avatarUrl: "https://github.com/shadcn.png",
        followersCount: 150,
        followingCount: 50,
        posts: [
            {
                id: "1",
                content: "Esse é meu primeiro post!",
                likesCount: 10,
                commentsCount: 2,
                date: "1 dia atrás",
            },
            {
                id: "2",
                content: "Programando em React é incrível!",
                likesCount: 20,
                commentsCount: 5,
                date: "2 dias atrás",
            },
        ],
    };

    return (
        <div className="container mx-auto p-6">
            <HomeButton />
            <UserProfile user={user} />
        </div>
    );
};

export default UserProfilePage;