import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormType, LoginFormSchema } from "@/models/User";

interface LoginFormProps {
    onSubmit: (data: LoginFormType) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormType>({
        resolver: zodResolver(LoginFormSchema),
    });

    return (
        <form
            className="space-y-4 max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className={`w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500 focus:ring-red-500" : ""
                        }`}
                    placeholder="Seu email"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                    Senha
                </label>
                <input
                    id="password"
                    type="password"
                    {...register("password")}
                    className={`w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? "border-red-500 focus:ring-red-500" : ""
                        }`}
                    placeholder="Sua senha"
                />
                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
                )}
            </div>

            <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200"
            >
                Entrar
            </button>
        </form>
    );
};

export default LoginForm;
