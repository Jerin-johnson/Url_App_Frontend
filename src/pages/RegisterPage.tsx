import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/auth/useRegister";
import { useAuthStore } from "../store/auth.store";
import {
  registerSchema,
  type RegisterFormData,
} from "../validations/register.schema";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";
import AuthLayout from "../layouts/AuthLayout";
import SubmitButton from "../components/SubmitButton";
import Input from "../components/Input";

export default function RegisterPage() {
  const navigate = useNavigate();

  const registerMutation = useRegister();

  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await registerMutation.mutateAsync({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      login(response.user, response.accessToken);

      toast.success("Registration successful");

      navigate("/");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message || "Registration failed");
      }
      console.log(error);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Sign up to continue"
      footer={
        <p className="text-slate-600">
          Already have an account?
          <button
            onClick={() => navigate("/login")}
            className="ml-1 text-blue-600 font-medium"
          >
            Login
          </button>
        </p>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Name"
          placeholder="Enter your name"
          error={errors.name?.message}
          {...register("name")}
        />

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
          placeholder="Enter password"
          error={errors.password?.message}
          {...register("password")}
        />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <SubmitButton
          isLoading={registerMutation.isPending}
          loadingText="Creating..."
          text="Register"
        />
      </form>
    </AuthLayout>
  );
}
