import { useState } from "react";
import { carApi } from "../../redux/features/Car/carApi";
import FeaturedCarCard from "../FeaturedCar/FeaturedCarCard";
import Loader from "../../shared/Loader/Loader";
import { TCar } from "../../type/global.type";

const CarList = () => {
  const [carType, setCarType] = useState("");
  const [price, setPrice] = useState<number>(0);
  const { data: getCars, isFetching } = carApi.useGetAllCarsQuery({
    price,
    carType,
  });

  const carData = getCars?.data;

  const handlePriceRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseInt(e.target.value);
    setPrice(parsedValue);
  };

  return (
    <>
      <div className="relative h-[300px] md:h-[500px] w-full">
        <div
          style={{
            backgroundImage: "url('https://i.ibb.co/9v9k4gQ/carlist.jpg')",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70"></div>
        </div>
      </div>
      <div className="container gap-4 mx-auto flex flex-col md:flex-row justify-around mt-20 px-4">
        <div
          style={{ background: "#EFF2F4" }}
          className="rounded-md w-full md:w-80 p-4 mb-4 md:mb-0"
        >
          <div className="p-2 rounded-lg w-full h-[500px] mx-auto">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Filter For Car Type
            </label>
            <select
              onChange={(e) => setCarType(e.target.value)}
              id="car-type"
              className="bg-white border text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white shadow-lg mb-10"
            >
              <option value="" selected>
                Car Type
              </option>
              <option value="luxury sedan">Luxury Sedan</option>
              <option value="sports car">Sports Car</option>
              <option value="muscle car">Muscle Car</option>
              <option value="suv">SUV</option>
              <option value="convertible">Convertible</option>
            </select>

            <div className="w-full">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="minmax-range"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tk {price}
                </label>
                <label
                  htmlFor="minmax-range"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tk 2000
                </label>
              </div>
              <input
                onChange={handlePriceRange}
                id="minmax-range"
                type="range"
                min="0"
                max="2000"
                value={price}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
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
                <FeaturedCarCard key={car._id} car={car} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CarList;
