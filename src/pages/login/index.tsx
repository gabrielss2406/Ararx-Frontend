import LoginForm from "@/forms/LoginForm";
import Link from "next/link";

const LoginPage = () => {

    const handleLoginSubmit = (data: { email: string; password: string }) => {
        console.log("Login data:", data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-white text-center">Login</h2>
                <LoginForm onSubmit={handleLoginSubmit} />
                <p className="text-gray-400 text-center">
                    Não tem uma conta?{" "}
                    <Link href="/register" className="text-blue-500 hover:underline">
                        Cadastre-se
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
