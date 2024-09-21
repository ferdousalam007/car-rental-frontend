import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import {
  FaCogs,
  FaTachometerAlt,
  FaHorse,
  FaExchangeAlt,
  FaGasPump,
} from "react-icons/fa";
import ReturnPolicy from "./ReturnPolicy";
import "./CarInformation.css";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { feedBackApi } from "../../redux/features/FeedBack/feedBackApi";
import Swal from "sweetalert2";
import { useState } from "react";

// Define the types for vehicle specifications and features
interface CarDetails {
  vehicleSpecification: string[];
  features: string[];
  description: string;
}

interface CarInformationProps {
  carDetails: CarDetails;
}

const feedbackSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  rating: z
    .number()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating must be at most 5" }),
  comment: z.string().min(1, { message: "Comment is required" }),
  image: z.instanceof(FileList).refine((files) => files.length > 0, {
    message: "Image is required",
  }),
  // profile: z.custom<FileList>(
  //   (val) => val instanceof FileList && val.length > 0,
  //   { message: "Profile image is required" }
  // ),
});

const CarInformation: React.FC<CarInformationProps> = ({ carDetails }) => {
  const [addFeedBack] = feedBackApi.useCreateFeedBackMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(feedbackSchema),
  });
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // const { name, rating, comment, profile, ...rest } = data;
    //   console.log(data);
    // setLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("rating", data.rating.toString());
    formData.append("message", data.comment);
    formData.append("image", data.image[0]);
   
    setLoading(true);
    try {
      const response = await addFeedBack(formData).unwrap();
      Swal.fire({
        title: "Success!",
        text: "Feedback added successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      console.log(response);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to add feedback.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error(error);
    } finally {
      setLoading(false);
      reset();
    }
  };
    
  //   try {
  //     const modifiedData = {
  //       ...rest,
  //       name,
  //       rating: Number(rating),
  //       message: comment,
  //       profile: profile[0], // Assuming profile is an array of files
  //     };

  //     const response = await addFeedBack(modifiedData).unwrap();
  //     Swal.fire({
  //       title: "Success!",
  //       text: "Feedback added successfully.",
  //       icon: "success",
  //       confirmButtonText: "OK",
  //     });
  //     console.log(response);
  //   } catch (error) {
  //     Swal.fire({
  //       title: "Error!",
  //       text: "Failed to add feedback.",
  //       icon: "error",
  //       confirmButtonText: "OK",
  //     });
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="w-full">
        <Tabs>
          <TabList className="flex flex-wrap justify-center sm:justify-start mb-5 border-b border-gray-200">
            {[
              "Vehicle Specifications",
              "Features & Options",
              "Description",
              "Reviews",
            ].map((tab, index) => (
              <Tab
                key={index}
                className="cursor-pointer px-4 py-2 text-center w-full sm:w-auto hover:bg-gray-100 transition"
              >
                {tab}
              </Tab>
            ))}
          </TabList>

          <TabPanel>
            <div>
              <h2 className="text-2xl font-extrabold text-gray-800 mb-6">
                Vehicle Specifications
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {carDetails.vehicleSpecification
                  .slice(0, 5)
                  .map((spec, index) => (
                    <div key={index} className="flex items-center">
                      <i className="text-red-500 mr-2">
                        {index === 0 && <FaCogs />}
                        {index === 1 && <FaTachometerAlt />}
                        {index === 2 && <FaHorse />}
                        {index === 3 && <FaExchangeAlt />}
                        {index === 4 && <FaGasPump />}
                      </i>
                      <h3 className="text-lg font-medium text-gray-700">
                        <span className="font-normal">{spec}</span>
                      </h3>
                    </div>
                  ))}
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            <div>
              <h2 className="text-2xl font-extrabold text-gray-800 mb-6">
                Features & Options
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {carDetails.features.slice(0, 5).map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <i className="text-red-500 mr-2">
                      {index === 0 && <FaCogs />}
                      {index === 1 && <FaTachometerAlt />}
                      {index === 2 && <FaHorse />}
                      {index === 3 && <FaExchangeAlt />}
                      {index === 4 && <FaGasPump />}
                    </i>
                    <h3 className="text-lg font-medium text-gray-700">
                      <span className="font-normal">{feature}</span>
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Description
            </h2>
            <p className="text-justify">{carDetails.description}</p>
          </TabPanel>

          <TabPanel>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Leave a <span className="text-red-600">Comment</span>
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name..."
                  className={`p-4 border rounded-md w-full bg-white shadow-lg ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-500">
                    {typeof errors.name.message === "string"
                      ? errors.name.message
                      : "Error"}
                  </p>
                )}
                <input
                  type="number"
                  placeholder="Your Ratings"
                  className={`p-4 border rounded-md w-full bg-white shadow-lg ${
                    errors.rating ? "border-red-500" : ""
                  }`}
                  {...register("rating", { valueAsNumber: true })}
                />
                {errors.rating && (
                  <p className="text-red-500">{errors.rating?.message as string}</p>
                )}
              </div>
              <textarea
                placeholder="Enter Your Comment..."
                className={`p-4 border rounded-md w-full bg-white shadow-lg mt-6 ${
                  errors.comment ? "border-red-500" : ""
                }`}
                {...register("comment")}
              />
              {errors.comment && (
                <p className="text-red-500">
                  {errors.comment.message as string}
                </p>
              )}
              <div className="mt-4">
                <input
                  type="file"
                  placeholder="Your Name..."
                  className={`p-4 border rounded-md w-full bg-white shadow-lg ${
                    errors.image ? "border-red-500" : ""
                  }`}
                  {...register("image")}
                />
                {errors.image && (
                  <p className="text-red-500">
                    {errors.image.message as string}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className={`bg-red-500 text-white px-4 py-2 hover:bg-red-600 transition rounded-md mt-4 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Loading..." : "Post Comment"}
              </button>
            </form>
          </TabPanel>
        </Tabs>
      </div>

      <div>
        <ReturnPolicy />
      </div>
    </div>
  );
};

export default CarInformation;
