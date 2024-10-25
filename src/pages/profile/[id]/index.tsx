import { useRouter } from "next/router";
import UserProfile from "@/components/userProfile";
import HomeButton from "@/components/homeButton";
import { useEffect, useState } from "react";
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
                const returnData = await dataService.getUser(userId as string);
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
                <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
                    <h1 className="text-6xl font-extrabold text-blue-500">404</h1>
                    <p className="mt-4 text-2xl font-medium">Usuário não encontrado</p>
                    <p className="mt-2 text-gray-400 text-center max-w-md">
                        Desculpe, o usuário que você está procurando não existe. Você pode ter digitado o endereço incorretamente ou a página foi movida.
                    </p>
                    <button
                        onClick={() => router.push("/")}
                        className="mt-6 px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
                    >
                        Voltar para a página inicial
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserProfilePage;