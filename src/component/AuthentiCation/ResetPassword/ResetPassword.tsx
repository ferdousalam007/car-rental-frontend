import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authApi } from "../../../redux/features/Auth/authApi";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

// Define the Zod schema for password validation
const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password must be at most 50 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Define the type for form data
type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const [resetPassword, { isLoading }] = authApi.useResetPasswordMutation();
  const navigate = useNavigate();
  const { id, token } = useParams(); // Assuming you get the user ID and reset token from the URL

  // Use React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  // Handle form submission
  const onSubmit: SubmitHandler<ResetPasswordFormValues> = async (data) => {
    if (!id || !token) {
      toast.error("Invalid or missing reset parameters.");
      return;
    }
    console.log(data);
    const newdata = {
      password: data.password,
      id: id,
      token: token,
    };
    
    try {
      const response = await resetPassword({
        body: newdata,
      }).unwrap();
      toast.success(response.message);
      navigate("/login"); // Redirect to login page after successful reset
    }catch (error) {
      console.error("Password reset failed:", error);
      toast.error("Failed to reset password.");
    }
  }


  return (
    <div className="min-h-[500px] container mx-auto pt-10">
      <div className="flex items-center justify-center pt-[150px]">
        <div className="w-full max-w-md">
          <form
            className="bg-white dark:bg-slate-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-4">
              <label
                className="block text-text-primary text-sm font-bold mb-2"
                htmlFor="password"
              >
                New Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline text-text-primary"
                id="password"
                type="password"
                placeholder="Enter your new password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="mb-6">
              <label
                className="block text-tex-primary text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline text-text-primary"
                id="confirmPassword"
                type="password"
                placeholder="Confirm your new password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-slate-600 hover:bg-slate-500 dark:bg-slate-900  text-text-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
