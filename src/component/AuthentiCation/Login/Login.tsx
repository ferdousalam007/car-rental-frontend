/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, useForm } from "react-hook-form";
import { authApi } from "../../../redux/features/Auth/authApi";
import { toast } from "sonner";
import { useAppDispatch } from "../../../redux/hooks";
import { verifyToken } from "../../../utils/verifyToken";
import { setUser } from "../../../redux/features/Auth/AuthSlice";
import {
  Link,
  useNavigate,
  useLocation,
  // useSearchParams,
} from "react-router-dom";
import PageBreadcamp from "@/component/PageBreadcamp/PageBreadcamp";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  // const [searchParams] = useSearchParams();
  const [addLogin, { isLoading }] = authApi.useLoginMutation();

  // Capture the previous URL and searchParams or use default fallback values
  const from = location.state?.from?.pathname || "/";
  // const searchParamsStr =
  //   location.state?.searchParams || searchParams.toString();
  const searchParamsStr = location.state?.from.search || "";
// console.log("from",from)
// console.log("searchParamsStr", searchParamsStr)
// console.log("location.state", location.state?.from.search)
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in");
    try {
      const res = await addLogin(data).unwrap();
      verifyToken(res.token);

      dispatch(setUser({ user: res.data, token: res.token }));
      toast.success("Logged in", {
        id: toastId,
        duration: 2000,
        position: "top-center",
      });

      // Redirect back to the previous page with the preserved searchParams
      const targetUrl = from + (searchParamsStr ? `${searchParamsStr}` : "");
console.log("targetUrl", targetUrl)
      // Logging to verify the constructed URL
      console.log("Redirecting to:", targetUrl);

      navigate(targetUrl, { replace: true });
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error?.data?.message || "Login failed", {
        id: toastId,
        duration: 2000,
        position: "top-center",
      });
    }
  };

  return (
    <div>
      {/* Background Section */}
      <div className="">
        <PageBreadcamp title="Login">
          <p className="text-white text-center px-4"></p>
        </PageBreadcamp>
      </div>

      {/* Main Content Section */}
      <div>
        <div className="container mx-auto pb-10 pt-20 px-4">
          <div className="flex items-center justify-center  md:space-x-8">
            {/* Form Section */}
            <div className="max-w-[550px] my-auto  bg-gray-700 p-8 rounded-lg">
              <h2 className="text-4xl font-serif font-bold text-center text-white mb-8">
                Login to your account
              </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-white mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="w-full px-3 py-2   border-transparent rounded-md  transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("email", { required: true })}
                  />
                </div>

                {/* Password Field */}
                <div className="mt-6 mb-4">
                  <label htmlFor="password" className="block text-white mb-3">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="w-full px-3 py-2 bg-white dark:bg-[#121212]   border-transparent rounded-md  transition duration-300 focus:outline-none focus:ring-2 focus:ring-slate-500"
                    {...register("password", { required: true })}
                  />
                </div>
                <Link
                  to="/forgot-password"
                  className="text-white hover:underline"
                >
                  You Forgot Password ?
                </Link>
                {/* Submit Button */}
                <button
                  type="submit"
                  className={`w-full mt-4 py-2 rounded-md transition duration-200 
                    ${
                      isLoading
                        ? "bg-slate-300"
                        : "bg-slate-500 hover:bg-slate-600 cursor-pointer"
                    } 
                    text-white flex items-center justify-center`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="loader-icon"></span>
                      <span className="ml-2">Logging in...</span>
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>

              {/* Additional Links */}
              <p className="mt-4 text-center text-white">
                Don't have an account?
                <Link
                  to="/register"
                  className="text-blue-600 ml-2 hover:underline"
                >
                  Please Register
                </Link>
              </p>
            </div>

            {/* Image Section */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
