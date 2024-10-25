import { useRouter } from "next/router";
import UserProfile from "@/components/userProfile";
import HomeButton from "@/components/homeButton";
import { useEffect, useState } from "react";
import { PostService } from "@/services/post";
import { UserService } from "@/services/user";
import { toast } from "sonner";
import { UserProfileType } from "@/models/User";
import { LoadingSpinner } from "@/components/ui/loading";

const UserProfilePage: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useState<UserProfileType>();
    const dataService = new UserService();
    const { id: userId } = router.query;

    useEffect(() => {
        const fetchFarms = async () => {
            try {
                setLoading(true);
                if (!userId) return;
                const returnData = await dataService.getUser("ElPandaMx");
                setUser(returnData);
            } catch (error) {
                toast.error("Erro ao carregar dados");
                console.error('Erro ao carregar dados do perfil:', error);
            }
            setLoading(false);
        };

        fetchFarms();
    }, [userId]);

    return (
        <div>
            {loading ? (
                <LoadingSpinner label="Carregando dados do usuário..." />
            ) : user ? (
                <div className="container mx-auto p-6">
                    <HomeButton />
                    <UserProfile user={user} />
                </div>
            ) : (
                <p>Usuário não encontrado.</p>
            )}
        </div>
    );
};

export default UserProfilePage;