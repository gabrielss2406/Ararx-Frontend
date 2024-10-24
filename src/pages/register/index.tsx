import RegisterForm from "@/forms/RegisterForm";
import Link from "next/link";

const RegisterPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-white text-center mb-6">
                    Crie sua conta
                </h2>
                <RegisterForm />
                <p className="mt-4 text-center text-gray-400">
                    Já tem uma conta?{" "}
                    <Link href="/login" className="text-blue-500 hover:underline">
                        Faça login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
