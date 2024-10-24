import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormType, LoginFormSchema } from "@/models/User";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { UserService } from "@/services/user";

export default function LoginForm() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<LoginFormType>({
        mode: "all",
        resolver: zodResolver(LoginFormSchema),
    })

    async function onSubmit(values: LoginFormType) {
        const userService = new UserService();
        setLoading(true);
        try {
            await userService.login(values.email, values.password);
            toast.success("Usuário logado com sucesso!")
            router.push("/");
        } catch (error) {
            toast.error("Erro ao fazer login!")
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg"
            >
                <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email ou nome de usuário</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Seu email ou username"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Sua senha"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 hover:bg-blue-600"
                >
                    {loading ? "Carregando..." : "Entrar"}
                </Button>
            </form>
        </Form>
    );
}
