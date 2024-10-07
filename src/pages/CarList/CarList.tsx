import { useState } from "react";
import { carApi } from "../../redux/features/Car/carApi";
import Loader from "../../shared/Loader/Loader";
import { TCar } from "../../type/global.type";
import PageBreadcamp from "@/component/PageBreadcamp/PageBreadcamp";
import CarCard from "../FeaturedCar/CarCard";

const CarList = () => {
  // State for car type and price range
  const [carType, setCarType] = useState<string>("");
  const [price, setPrice] = useState<number>(0);

  // Fetch car data with carType and price filters
  const { data: getCars, isFetching } = carApi.useGetAllCarsQuery({
    price,
    carType,
  });

  const carData = getCars?.data;
  // Get unique car types for the dropdown
  const uniqueCarTypes = [...new Set(carData?.map((car: any) => car.carType))];

  // Handle sorting by price: ascending if starting at 0, descending if starting at 2000
  const sortedCarData = carData?.slice().sort((a: TCar, b: TCar) => {
    const priceA = a.price ?? Infinity; // Use Infinity if price is undefined
    const priceB = b.price ?? Infinity;
    if (price === 0) {
      // Sort in ascending order when price is 0
      return priceA - priceB;
    } else if (price === 2000) {
      // Sort in descending order when price is 2000
      return priceB - priceA;
    }
    return 0; // Default (no sorting in between)
  });

  // Handle price range slider input
  const handlePriceRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseInt(e.target.value);
    setPrice(parsedValue);
  };

  return (
    <>
      {/* Page Header with Breadcrumb */}
      <div>
        <PageBreadcamp title="All Car List">
          <p className="text-white text-center px-4">
            All available and available cars
          </p>
        </PageBreadcamp>
      </div>

      {/* Main Container */}
      <div className="container grid grid-cols-1 gap-10">
        {/* Filters for car type and price */}
        <div className="rounded-md w-full p-4 mb-4 bg-white shadow border dark:bg-slate-800 -mt-10">
          <div className="p-2 rounded-lg w-full mx-auto">
            {/* Car Type Filter */}
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Filter For Car Type
            </label>
            <select
              onChange={(e) => setCarType(e.target.value)}
              id="car-type"
              className="bg-white border text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white shadow-lg mb-10"
              value={carType}
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
            </select>

            {/* Price Range Filter */}
            <div className="w-full mb-6">
              <div className="flex items-center justify-between">
                <button
                  className="px-3 py-1 text-sm font-medium text-white bg-gray-700 rounded-lg"
                  onClick={() => setPrice(0)}
                >
                  Tk 0
                </button>
                <label
                  htmlFor="minmax-range"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tk {price}
                </label>
                <button
                  className="px-3 py-1 text-sm font-medium text-white bg-gray-700 rounded-lg"
                  onClick={() => setPrice(2000)}
                >
                  Tk 2000
                </button>
              </div>
              <input
                onChange={handlePriceRange}
                id="minmax-range"
                type="range"
                min="0"
                max="2000"
                value={price}
                className="w-full h-2 dark:bg-gray-200 rounded-lg appearance-none cursor-pointer bg-gray-700"
              />
            </div>
          </div>
        </div>

        {/* Display Car Cards */}
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {isFetching ? (
              <div className="col-span-full text-center">
                <Loader />
              </div>
            ) : (
              sortedCarData?.map((car: TCar) => (
                <CarCard key={car._id} car={car} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CarList;
