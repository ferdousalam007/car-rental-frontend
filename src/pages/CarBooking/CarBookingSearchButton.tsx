/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { FaCar, FaCogs, FaChair } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// Define the SearchParams type
type SearchParams = {
  carType?: string;
  features?: string;
  seats?: string;
};

const CarBookingSearchButton = () => {
  const [carType, setCarType] = useState("");
  const [features, setFeatures] = useState("");
  const [seats, setSeats] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate hook

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
    <div>
      {/* Booking Form */}
      <div className="relative mx-auto  max-w-[95%] -mt-12 bg-white shadow-lg rounded-lg p-6 md:p-8">
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

        {/* Search Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleSearchCar}
            className="px-8 py-4 bg-orange-400 text-white rounded-md hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-600 w-full"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarBookingSearchButton;
