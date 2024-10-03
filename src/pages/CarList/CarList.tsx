/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { carApi } from "../../redux/features/Car/carApi";
// import FeaturedCarCard from "../FeaturedCar/FeaturedCarCard";
import Loader from "../../shared/Loader/Loader";
import { TCar } from "../../type/global.type";
import PageBreadcamp from "@/component/PageBreadcamp/PageBreadcamp";
import CarCard from "../FeaturedCar/CarCard";

const CarList = () => {
  const [carType, setCarType] = useState("");
  const [price, setPrice] = useState<number>(0);

  const { data: getCars, isFetching } = carApi.useGetAllCarsQuery({
    price,
    carType,
  });

  const carData = getCars?.data;

  const uniqueCarTypes = [...new Set(carData?.map((car: any) => car.carType))];

  const handlePriceRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseInt(e.target.value);
    setPrice(parsedValue);
  };

  return (
    <>
      <div className="">
        <PageBreadcamp title="All Car List">
          <p className="text-white text-center px-4">
            All available and available cars
          </p>
        </PageBreadcamp>
      </div>

      <div className="container gap-4 mx-auto flex flex-col md:flex-row justify-around mt-20 px-4">
        <div className="rounded-md w-full md:w-80 p-4 mb-4 md:mb-0 bg-[#EFF2F4] dark:bg-slate-900">
          <div className="p-2 rounded-lg w-full h-[500px] mx-auto">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Filter For Car Type
            </label>
            <select
              onChange={(e) => setCarType(e.target.value)}
              id="car-type"
              className="bg-white border text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white shadow-lg mb-10"
              value={carType} // Controlled component
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

            <div className="w-full">
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
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
            {isFetching ? (
              <div className="col-span-full text-center">
                <Loader />
              </div>
            ) : (
              carData?.map((car: TCar) => (
                // <FeaturedCarCard key={car._id} car={car} />
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
