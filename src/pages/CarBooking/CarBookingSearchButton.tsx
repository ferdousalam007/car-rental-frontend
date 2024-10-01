/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { carApi } from "@/redux/features/Car/carApi";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { FaCar, FaCogs, FaChair } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// Define the SearchParams type
// type SearchParams = {
//   carType?: string;
//   features?: string;
//   seats?: string;
// };

const CarBookingSearchButton = () => {
  const [carType, setCarType] = useState("");
  const [features, setFeatures] = useState("");
  const [seats, setSeats] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate hook
const { data: allCars, isLoading: isCarLoading } =
  carApi.useGetAllCarsQuery(500);
const carData = allCars?.data || [];
const uniqueCarTypes = [...new Set(carData?.map((car: any) => car.carType))];
const uniqueFeatures = [
  ...new Set(carData.flatMap((car: any) => car.features)),
];
// const uniqueMaxSeats = [...new Set(carData.map((car: any) => car.maxSeats))];
const uniqueMaxSeats = [
  ...new Set(carData.map((car: any) => car.maxSeats)),
].filter((seat): seat is number => typeof seat === "number");
  // Handle for the select fields
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCarType(e.target.value);
  };

  const handleSeatsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSeats(e.target.value);
  };

  const handleFeaturesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFeatures(e.target.value);
  };

  // Update search parameters and trigger navigation with query params on button click
  const handleSearchCar = () => {
    // Create the query parameters string
    const params = new URLSearchParams({
      carType: carType || "", // Add only if carType is defined
      features: features || "", // Add only if features are defined
      seats: seats || "", // Add only if seats are defined
    });

    // Navigate to the booking route with the query params
    navigate(`/booking?${params.toString()}`);
  };

  return (
    <div className="bg-white dark:bg-[#26324d] pb-7">
      {/* Booking Form */}
      <div className="relative mx-auto  max-w-[95%] -mt-12 bg-white dark:bg-slate-700 shadow-lg rounded-lg p-6 md:p-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
          {/* Car Type */}
          <div className="lg:col-span-2 flex flex-col">
            <label className="font-semibold mb-2 dark:text-white">
              Select Car Type
            </label>
            <div className="relative">
              <select
                className="w-full pl-10 pr-4 py-2 dark:bg-slate-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                value={carType}
                onChange={handleTypeChange}
                disabled={isCarLoading} // Disable dropdown while loading
              >
                {isCarLoading ? (
                  <option>Loading...</option> // Show loading message while data is being fetched
                ) : (
                  <>
                    <option value="">Select Car Type</option>
                    {uniqueCarTypes?.map((type) => {
                      if (typeof type === "string") {
                        return (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        );
                      }
                      return null;
                    })}
                  </>
                )}
              </select>
              <FaCar className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          {/* Car Feature */}
          <div className="lg:col-span-2 flex flex-col">
            <label className="font-semibold mb-2 dark:text-white">
              Select Car Feature
            </label>
            <div className="relative">
              <select
                className="w-full pl-10 pr-4 py-2 dark:bg-slate-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                value={features} // Assuming features is a state variable
                onChange={handleFeaturesChange} // Assuming handleFeaturesChange updates the selected feature
                disabled={isCarLoading} // Disable dropdown while loading
              >
                {isCarLoading ? (
                  <option>Loading...</option>
                ) : (
                  <>
                    <option value="">Select Feature</option>
                    {uniqueFeatures?.map((feature) => {
                      if (typeof feature === "string") {
                        return (
                          <option key={feature} value={feature}>
                            {feature}
                          </option>
                        );
                      }
                      return null;
                    })}
                  </>
                )}
              </select>
              <FaCogs className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          {/* Car Seats */}
          <div className="lg:col-span-2 flex flex-col">
            <label className="font-semibold mb-2 dark:text-white">
              Select Car Seats
            </label>
            <div className="relative">
              <select
                className="w-full pl-10 pr-4 py-2 dark:bg-slate-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                value={seats} // Assuming maxSeats is a state variable
                onChange={handleSeatsChange} // Assuming handleSeatsChange updates the selected max seats
                disabled={isCarLoading} // Disable dropdown while loading
              >
                {isCarLoading ? (
                  <option>Loading...</option> // Show loading message while data is being fetched
                ) : (
                  <>
                    <option value="">Select Max Seats</option>
                    {uniqueMaxSeats?.map((seat: number) => (
                      <option key={seat} value={seat}>
                        {seat}
                      </option>
                    ))}
                  </>
                )}
              </select>
              <FaChair className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleSearchCar}
            className="px-8 py-4 bg-slate-600 dark:bg-slate-900 text-white rounded-md hover:bg-slate-900 dark:hover:bg-slate-600 dark:hover:border dark:hover:border-slate-400 border  focus:outline-none focus:ring-2 focus:ring-slate-900 w-full"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarBookingSearchButton;
