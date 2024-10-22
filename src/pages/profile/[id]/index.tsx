import { useRouter } from "next/router";
import UserProfile from "@/components/userProfile";

const UserProfilePage = () => {
    const router = useRouter();
    const { userId } = router.query;

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

    return <UserProfile user={user} />;
};

export default UserProfilePage;