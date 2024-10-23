import { z } from "zod";

export const LoginFormSchema = z.object({
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres"),
});

export const RegisterFormSchema = z.object({
    name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Formato de email inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string().min(6, "A senha de confirmação deve ter pelo menos 6 caracteres"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
});


export type LoginFormType = z.infer<typeof LoginFormSchema>;
export type RegisterFormType = z.infer<typeof RegisterFormSchema>;
