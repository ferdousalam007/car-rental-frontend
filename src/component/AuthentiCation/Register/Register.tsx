/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { authApi } from "../../../redux/features/Auth/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define Zod schema for form validation
const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z.string().min(6, "Password is required min 6 characters"),
    confirmPassword: z.string().min(6, "Confirm Password is required min 6 characters"),

    phone: z.string().min(1, "Phone number is required"),
    image: z.any().optional(),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the Terms & Conditions",
    }),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });;

const Register = () => {
  const [addSignUp, { isLoading }] = authApi.useSignUpMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();

    // Append form data including the image file
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("phone", data.phone);
    if (data.image[0] && data.image[0].size > 0) {
      formData.append("image", data.image[0]); // append the first image file
    }
    // formData.append("terms", data.terms);

    try {

      await addSignUp(formData).unwrap();
      toast.success("Registration successful!");
      reset();
      navigate("/login");
    } catch (err: any) {

      console.log(err);
      toast.error(err.data.message || "Registration failed");
    }
  };

  return (
    <div>
      <div className="relative h-[300px] md:h-[400px] w-full">
        <div
          style={{
            backgroundImage: "url('https://i.postimg.cc/7L45rBwC/signin.png')",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70"></div>
        </div>
      </div>
      <div style={{ background: "#E9E9E7" }}>
        <div className="container mx-auto pb-10 pt-20 px-4">
          <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8">
            {/* Form Section */}
            <div className="w-full md:w-1/2 bg-[#4252B1] p-8 rounded-lg">
              <h2 className="text-4xl font-serif font-bold text-center text-white mb-8">
                Create New Account
              </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Name and Email Fields */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <div>
                    <label htmlFor="name" className="block text-white mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Name"
                      className="w-full px-3 py-2 border-b-4 border-transparent rounded-md hover:border-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("name")}
                    />
                    {errors.name && (
                      <span className="text-red-500">
                        {typeof errors.name.message === "string"
                          ? errors.name.message
                          : "Invalid error message"}
                      </span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Email"
                      className="w-full px-3 py-2 border-b-4 border-transparent rounded-md hover:border-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("email")}
                    />
                    {errors.email && (
                      <span className="text-red-500">
                        {typeof errors.email.message === "string"
                          ? errors.email.message
                          : "Invalid error message"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Password and Confirm Password Fields */}
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="password" className="block text-white mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Password"
                      className="w-full px-3 py-2 border-b-4 border-transparent rounded-md hover:border-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("password")}
                    />
                    {errors.password && (
                      <span className="text-red-500">
                        {typeof errors.password.message === "string"
                          ? errors.password.message
                          : "Invalid error message"}
                      </span>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-white mb-2"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      className="w-full px-3 py-2 border-b-4 border-transparent rounded-md hover:border-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                      <span className="text-red-500">
                        {typeof errors.confirmPassword.message === "string"
                          ? errors.confirmPassword.message
                          : "Invalid error message"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Phone Number Field */}
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-white mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Your phone number"
                    className="w-full px-3 py-2 border-b-4 border-transparent rounded-md hover:border-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <span className="text-red-500">
                      {typeof errors.phone.message === "string"
                        ? errors.phone.message
                        : "Invalid error message"}
                    </span>
                  )}
                </div>

                {/* Upload Image Field */}
                <div className="mb-4">
                  <label htmlFor="image" className="block text-white mb-2">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    className="w-full px-3 py-2 bg-white border-b-4 border-transparent rounded-md hover:border-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("image")}
                  />
                </div>

                {/* Terms & Conditions Checkbox */}
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mr-2 leading-tight"
                    {...register("terms")}
                  />
                  <label htmlFor="terms" className="text-white">
                    I agree to the{" "}
                    <a
                      href="https://example.com/terms-and-conditions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 underline"
                    >
                      Terms & Conditions
                    </a>
                  </label>
                  {errors.terms && (
                    <span className="text-red-500">
                      {typeof errors.terms.message === "string"
                        ? errors.terms.message
                        : "Invalid error message"}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`w-full mt-4 py-2 rounded-md transition duration-200 
            ${
              isLoading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
            } 
            text-white flex items-center justify-center`}
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
              </form>

              {/* Additional Links */}
              <p className="mt-4 text-center text-white">
                Already have an account?
                <a href="/login" className="text-blue-500 ml-2 hover:underline">
                  Please Login
                </a>
              </p>
            </div>
            {/* Image Section */}
            <div className="w-full md:w-1/2 md:h-[662px] mt-8 md:mt-0">
              <img
                src="https://i.postimg.cc/7L45rBwC/signin.png"
                alt="Login illustration"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
