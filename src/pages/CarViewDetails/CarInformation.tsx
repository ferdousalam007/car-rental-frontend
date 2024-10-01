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
import CarTestimonial from "./CarTestimonial";

// Define the types for vehicle specifications and features
interface CarDetails {
  vehicleSpecification: string[];
  features: string[];
  description: string;
  _id: string;
}

interface CarInformationProps {
  carDetails: CarDetails;
}

const CarInformation: React.FC<CarInformationProps> = ({ carDetails }) => {
  console.log(carDetails);
  return (
    <div className="container mx-auto">
      <div className=" p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="w-full">
        <Tabs>
            <TabList className=" flex flex-wrap justify-center sm:justify-start  border-b border-gray-200 dark:bg-slate-900 bg-white dark:text-white p-2 rounded-lg">
              {[
                "Vehicle Specifications",
                "Features & Options",
                "Description",
              ].map((tab, index) => (
                <Tab
                  key={index}
                  className=" cursor-pointer px-4 py-2 text-center w-full dark:bg-slate-900 bg-white dark:text-white sm:w-auto hover:bg-gray-100 transition"
                >
                  {tab}
                </Tab>
              ))}
            </TabList>

            <TabPanel className="dark:bg-slate-900 bg-white dark:text-white p-6 ">
              <div className="dark:bg-slate-900 bg-white dark:text-white   ">
                <h2 className="text-2xl font-extrabold text-text-primary mb-6">
                  Vehicle Specifications
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {carDetails.vehicleSpecification
                    .slice(0, 5)
                    .map((spec, index) => (
                      <div key={index} className="flex items-center">
                        <i className="text-yellow-600 mr-2">
                          {index === 0 && <FaCogs />}
                          {index === 1 && <FaTachometerAlt />}
                          {index === 2 && <FaHorse />}
                          {index === 3 && <FaExchangeAlt />}
                          {index === 4 && <FaGasPump />}
                        </i>
                        <h3 className="text-lg font-medium text-text-primary">
                          <span className="font-normal">{spec}</span>
                        </h3>
                      </div>
                    ))}
                </div>
              </div>
            </TabPanel>

            <TabPanel className="dark:bg-slate-900 bg-white dark:text-white  px-6 pb-2">
              <div>
                <h2 className="text-2xl font-extrabold text-text-primary mb-6">
                  Features & Options
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {carDetails.features.slice(0, 5).map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <i className="text-yellow-600 mr-2">
                        {index === 0 && <FaCogs />}
                        {index === 1 && <FaTachometerAlt />}
                        {index === 2 && <FaHorse />}
                        {index === 3 && <FaExchangeAlt />}
                        {index === 4 && <FaGasPump />}
                      </i>
                      <h3 className="text-lg font-medium text-text-primary">
                        <span className="font-normal">{feature}</span>
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            </TabPanel>

            <TabPanel className="dark:bg-slate-900 bg-white dark:text-white  px-6 pb-4 ">
              <h2 className="text-2xl font-bold text-text-primary mb-6">
                Description
              </h2>
              <p className="text-justify">{carDetails.description}</p>
            </TabPanel>
            {/* 
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
          </TabPanel> */}
          </Tabs>
        </div>

        <div>
          <ReturnPolicy />
        </div>
      </div>
      <CarTestimonial carId={carDetails?._id} />
    </div>
  );
};

export default CarInformation;
