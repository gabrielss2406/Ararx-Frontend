import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormSchema, RegisterFormType } from "@/models/User";

interface RegisterFormProps {
    onSubmit: (data: RegisterFormType) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormType>({
        resolver: zodResolver(RegisterFormSchema),
    });

    return (
        <form
            className="space-y-4 max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    Nome
                </label>
                <input
                    id="name"
                    type="text"
                    {...register("name")}
                    className={`w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? "border-red-500 focus:ring-red-500" : ""
                        }`}
                    placeholder="Seu nome"
                />
                {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>
                )}
            </div>

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

            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                    Confirmar Senha
                </label>
                <input
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword")}
                    className={`w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.confirmPassword ? "border-red-500 focus:ring-red-500" : ""
                        }`}
                    placeholder="Confirme sua senha"
                />
                {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword?.message}</p>
                )}
            </div>

            <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200"
            >
                Registrar
            </button>
        </form>
    );
};

export default RegisterForm;
