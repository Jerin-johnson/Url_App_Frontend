// pages/LoginPage.tsx

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useLogin } from "../hooks/auth/useLogin";
import { useAuthStore } from "../store/auth.store";

import { loginSchema, type LoginFormData } from "../validations/login.schema";
import { AxiosError } from "axios";
import AuthLayout from "../layouts/AuthLayout";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";

export default function LoginPage() {
  const navigate = useNavigate();

  const loginMutation = useLogin();

  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginMutation.mutateAsync({
        email: data.email,
        password: data.password,
      });

      login(response.user, response.accessToken);

      toast.success("Login successful");
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message || "Login failed");
      }

      console.error("Login error:", error);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to your account"
      footer={
        <p className="text-slate-600">
          Don't have an account?
          <button
            onClick={() => navigate("/register")}
            className="ml-1 text-blue-600 font-medium"
          >
            Register
          </button>
        </p>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register("password")}
        />

        <SubmitButton
          isLoading={loginMutation.isPending}
          loadingText="Logging in..."
          text="Login"
        />
      </form>
    </AuthLayout>
  );
}
