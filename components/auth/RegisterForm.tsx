"use client";
import AuthService from "@/services/authService";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await AuthService.register(
        data.name,
        data.email,
        data.password,
      );
      if (response) {
        alert(response.message);
        router.push("/login");
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-[400px] max-w-md bg-white p-8 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Name"
            className="w-full border p-3 rounded-lg"
            {...register("name", {
              required: "Name is required",
            })}
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded-lg"
            {...register("email", {
              required: "Email is required",
            })}
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-lg"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
