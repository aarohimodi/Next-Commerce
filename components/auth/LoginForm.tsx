"use client";
import AuthService from "@/services/authService";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { loginSuccess } from "@/store/authSlice";
import { useDispatch } from "react-redux";
import { showNotification } from "@/store/uiSlice";
type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await AuthService.login(data.email, data.password);
      if (response.success) {
        const profile = await AuthService.getProfile();
        dispatch(loginSuccess(profile.user));
        if (response.user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      } else {
        dispatch(showNotification(response.message));
        // alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-30% bg-blue-500 max-w-md text-white p-8  text-center rounded-tl-xl rounded-tr-xl">
        <h3>Admin Login Info</h3>
        <h4>username: chinky@gmail.com | password: 123456</h4>
      </div>
      <div className="w-full max-w-md h-fit  bg-white p-8 rounded-bl-xl rounded-br-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
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
            Login
          </button>
        </form>
      </div>
    </>
  );
}
