import { useCallback, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { FaCar, FaCogs, FaChair } from "react-icons/fa";
import { carApi } from "../../redux/features/Car/carApi";
import FeaturedCarCard from "../FeaturedCar/FeaturedCarCard";
import Loader from "../../shared/Loader/Loader";
import { debounce } from "lodash";
import { TCar } from "../../type/global.type";
import { useSearchParams, useLocation } from "react-router-dom"; // Import useSearchParams, useLocation, useNavigate

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
      <div className="relative h-[300px] md:h-[500px] w-full">
        <div
          style={{
            backgroundImage: "url('https://i.ibb.co/T8Wy3z9/bookings.jpg')",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70"></div>
        </div>
      </div>

      {/* Booking Form */}
      <div className="relative -mt-24 max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6 md:p-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
          {/* Car Type */}
          <div className="lg:col-span-2 flex flex-col">
            <label className="font-semibold mb-2">Select Car Type</label>
            <div className="relative">
              <select
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={carType}
                onChange={handleTypeChange}
              >
                <option value="">Select Car Type</option>
                <option value="Sports Car">Sports Car</option>
                <option value="Muscle Car">Muscle Car</option>
                <option value="Sedan">Sedan</option>
                <option value="Luxury Sedan">Luxury Sedan</option>
                <option value="Truck">Truck</option>
              </select>
              <FaCar className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          {/* Car Feature */}
          <div className="lg:col-span-2 flex flex-col">
            <label className="font-semibold mb-2">Select Car Feature</label>
            <div className="relative">
              <select
                className="bg-white w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2"
                value={features}
                onChange={handleFeaturesChange}
              >
                <option value="">Select Feature</option>
                <option value="V8 Engine">V8 Engine</option>
                <option value="Manual Transmission">Manual Transmission</option>
                <option value="Rear-Wheel Drive">Rear-Wheel Drive</option>
                <option value="Performance Exhaust">Performance Exhaust</option>
                <option value="Sports Seats">Sports Seats</option>
              </select>
              <FaCogs className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          {/* Car Seats */}
          <div className="lg:col-span-2 flex flex-col">
            <label className="font-semibold mb-2">Select Car Seats</label>
            <div className="relative">
              <select
                className="bg-white w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2"
                value={seats}
                onChange={handleSeatsChange}
              >
                <option value="">Select Seats</option>
                <option value="1">1 Seat</option>
                <option value="2">2 Seats</option>
                <option value="3">3 Seats</option>
                <option value="4">4 Seats</option>
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
