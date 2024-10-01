/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authApi } from "../../../redux/features/Auth/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import PageBreadcamp from "@/component/PageBreadcamp/PageBreadcamp";

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
    } catch (err: any) {
      console.log(err);
      toast.error("Failed to send password reset link");
    }
  };

  return (
    <div className="">
      <div className="">
        <PageBreadcamp title="Forgot Password">
          <p className="text-white text-center px-4"></p>
        </PageBreadcamp>
      </div>
      <div className="container">
        <div className="flex items-center justify-center mt-12">
          <div className="bg-white dark:bg-gray-900  p-8 rounded max-w-[350px] ">
            <h4 className="text-center font-medium text-3xl pb-4">
              Forgot Password
            </h4>
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
                className="w-full mt-4 py-2 rounded-md bg-slate-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
