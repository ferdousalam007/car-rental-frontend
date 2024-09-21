import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authApi } from "../../../redux/features/Auth/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// Define the Zod schema
const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

// Define the type for form data
type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const [addForgotPassword, { isLoading }] =
    authApi.useForgotPasswordMutation();
  const navigate = useNavigate();

  // Use React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  // Handle form submission
  const onSubmit: SubmitHandler<ForgotPasswordFormValues> = async (data) => {
    try {
      await addForgotPassword(data).unwrap();
      toast.success("Password reset link sent to your email");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to send password reset link");
    }
  };

  return (
    <div className="min-h-[500px] container mx-auto pt-10">
      <div className="flex items-center justify-center">
        <div className="bg-white p-3 rounded w-25 pt-[150px]">
          <h4 className="text-center font-medium text-4xl">Forgot Password</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Email"
                autoComplete="off"
                className="w-full px-3 py-2 border rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full mt-4 py-2 rounded-md bg-blue-500 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
