/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { FaCar, FaCogs, FaChair } from "react-icons/fa";
import { carApi } from "../../redux/features/Car/carApi";
import FeaturedCarCard from "../FeaturedCar/FeaturedCarCard";
import Loader from "../../shared/Loader/Loader";
import { debounce } from "lodash";
import { TCar } from "../../type/global.type";
import { useSearchParams, useLocation } from "react-router-dom"; // Import useSearchParams, useLocation, useNavigate
import PageBreadcamp from "@/component/PageBreadcamp/PageBreadcamp";

// Define the SearchParams type
type SearchParams = {
  carType?: string;
  features?: string;
  seats?: string;
};

const CarBooking = () => {
  const [searchParams, setSearchParams] = useSearchParams(); // useSearchParams hook to get the query parameters
  const location = useLocation(); // Get the current location
 

  // Initialize state with query parameters or default values
  const [carType, setCarType] = useState(searchParams.get("carType") || "");
  const [features, setFeatures] = useState(searchParams.get("features") || "");
  const [seats, setSeats] = useState(searchParams.get("seats") || "");

  // Construct searchParams object based on state values
  const [searchCriteria, setSearchCriteria] = useState<SearchParams>({
    carType,
    features,
    seats,
  });

  // Use the API hook with the searchCriteria state
  const { data: carSearch, isLoading } = carApi.useSearchCarsForBookingQuery(
    searchCriteria,
    {
      skip: !Object.values(searchCriteria).some((param) => param),
    }
  );
const {data:allCars,isLoading:isCarLoading}=carApi.useGetAllCarsQuery(500);
const carData = allCars?.data || [];
   const uniqueCarTypes = [...new Set(carData?.map((car:any) => car.carType))];
const uniqueFeatures = [
  ...new Set(carData.flatMap((car: any) => car.features)),
];
// const uniqueMaxSeats = [...new Set(carData.map((car: any) => car.maxSeats))];
const uniqueMaxSeats = [...new Set(carData.map((car: any) => car.maxSeats))].filter((seat): seat is number => typeof seat === 'number');

console.log(uniqueCarTypes, "carTypes");
console.log(uniqueFeatures, "uniqueFeatures");
  // Update the search parameters state when form values change, debounced
  const handleSearchCar = useCallback(
    debounce((value: SearchParams) => {
      setSearchCriteria(value);
    }, 500),
    [setSearchCriteria]
  );

  // Update state and URL query params on form input changes
useEffect(() => {
  const newParams: SearchParams = {
    carType,
    features,
    seats,
  };
  setSearchParams(newParams);
  handleSearchCar(newParams);
}, [carType, features, handleSearchCar, seats, setSearchParams]);

  // Handle select field changes
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCarType(e.target.value);
  };

  const handleSeatsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSeats(e.target.value);
  };

  const handleFeaturesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFeatures(e.target.value);
  };

  const noCarsMessage =
    !isLoading && carSearch?.data?.length === 0
      ? "No cars available for the selected criteria."
      : "";

  // Reinitialize state based on URL parameters after redirect
 useEffect(() => {
   // Reinitialize state from URL parameters
   setCarType(searchParams.get("carType") || "");
   setFeatures(searchParams.get("features") || "");
   setSeats(searchParams.get("seats") || "");
 }, [location.search, searchParams]);

  return (
    <div>
      <div className="py-8">
        <PageBreadcamp title="Car Booking"></PageBreadcamp>
      </div>

      {/* Booking Form */}
      <div className=" -mt-24 max-w-7xl mx-auto bg-white dark:bg-slate-700 shadow-lg rounded-lg p-6 md:p-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
          {/* Car Type */}
          <div className="lg:col-span-2 flex flex-col">
            <label className="font-semibold mb-2">Select Car Type</label>
            <div className="relative">
              <select
                className="w-full pl-10 pr-4 py-2 dark:bg-slate-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                value={carType} // Assuming carType is a state variable
                onChange={handleTypeChange} // Assuming handleTypeChange updates the selected car type
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
              {/* <select
                className="w-full pl-10 pr-4 py-2 dark:bg-slate-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                value={carType} 
                onChange={handleTypeChange} 
              >
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
              </select> */}
              <FaCar className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          {/* Car Feature */}
          <div className="lg:col-span-2 flex flex-col">
            <label className="font-semibold mb-2">Select Car Feature</label>
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
              {/* <select
                className="w-full pl-10 pr-4 py-2 dark:bg-slate-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                value={features} 
                onChange={handleFeaturesChange} 
              >
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
              </select> */}
              <FaCogs className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          {/* Car Seats */}
          <div className="lg:col-span-2 flex flex-col">
            <label className="font-semibold mb-2">Select Car Seats</label>
            <div className="relative">
              {/* <select
                className="w-full pl-10 pr-4 py-2 dark:bg-slate-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                value={seats}
                onChange={handleSeatsChange} 
              >
                <option value="">Select Max Seats</option>
                {uniqueMaxSeats?.map((seats) => {
                  if (typeof seats === "number") {
                    return (
                      <option key={seats} value={seats}>
                        {seats}
                      </option>
                    );
                  }
                  return null; 
                })}
              </select> */}
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
      </div>

      {/* Car Cards or No Cars Message */}
      <div className="container mx-auto mt-20">
        {isLoading ? (
          <Loader />
        ) : noCarsMessage ? (
          <div className="text-center text-2xl font-semibold text-red-500 max-w-3xl mx-auto bg-slate-300 rounded-md p-4">
            {noCarsMessage}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {carSearch?.data.map((car: TCar) => (
              <FeaturedCarCard key={car._id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarBooking;
