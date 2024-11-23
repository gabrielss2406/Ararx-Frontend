import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormSchema, RegisterFormType } from "@/models/User";
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
import { useState } from "react";
import { UserService } from "@/services/user";
import { useRouter } from "next/router";
import { toast } from "sonner";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<RegisterFormType>({
    mode: "all",
    resolver: zodResolver(RegisterFormSchema),
  });

  async function onSubmit(values: RegisterFormType) {
    const userService = new UserService();
    setLoading(true);
    try {
      await userService.register(values);
      toast.success("Usuário criado com sucesso!");
      router.push("/login");
    } catch {
      toast.error("Erro ao criar usuário");
    } finally {
      setLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form
        className="space-y-4 max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* Campo Nome */}
        <FormField
          name="handler"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input id="name" placeholder="Seu nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo Email */}
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  placeholder="Seu email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo Senha */}
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  id="password"
                  type="password"
                  placeholder="Sua senha"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo Confirmar Senha */}
        <FormField
          name="confirmPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar Senha</FormLabel>
              <FormControl>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirme sua senha"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Botão de Registrar */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600"
        >
          {loading ? "Carregando..." : "Registrar"}
        </Button>
      </form>
    </Form>
  );
}
