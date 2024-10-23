import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/router";

const HomeButton: React.FC = () => {
    const router = useRouter();

    const handleBackToHome = () => {
        router.push("/");
    };

    return (
        <button
            className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-colors duration-200 mb-6"
            onClick={handleBackToHome}
        >
            <FaArrowLeft />
            <span>Voltar para Home</span>
        </button>
    );
};

export default HomeButton;
