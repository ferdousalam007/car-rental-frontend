/* eslint-disable @typescript-eslint/no-explicit-any */

import Stars from "../../shared/Starts/Starts";

import { FaCarSide, FaGasPump, FaUsers } from "react-icons/fa6";
import { FaCogs } from "react-icons/fa";
import { Link } from "react-router-dom";
import CarSlider from "./CarSlider";

const CarDetailsCard = ({ carDetails }: any) => {
  const star = carDetails?.avgRating;
  const review = carDetails?.rating;
  console.log(carDetails);
  return (
    <div className="container my-10 p-4">
      {/* Left side - Image/Slider */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="">
          <CarSlider imageUrls={carDetails?.carImgUrl} />
        </div>
        <div className="w-full lg:pl-10 mt-8 lg:mt-0">
          <div className="max-w-md mx-auto rounded-xl overflow-hidden md:max-w-2xl">
            <div className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-2xl font-bold text-text-primary">
                    {carDetails?.name}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center text-text-primary">
                    <Stars star={star} />
                    <span className="ml-1 font-bold">
                      ({review?.length})total reviews
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-lg text-text-primary mt-2 font-semibold">
                Tk{carDetails?.pricePerHour}
                <span className="text-text-primary"> / PerHour</span>
              </div>
              <p className="mt-4 text-text-primary line-clamp-2">
                {carDetails?.description}
              </p>
              <hr className="text-xl mt-4" />
              <div className="mt-6">
                <div className="text-lg font-semibold text-text-primary">
                  Key Feature
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center">
                    <FaUsers className="text-text-primary w-6 h-6" />
                    <div className="ml-2 text-sm">
                      <span className="text-text-primary">PASSENGERS:</span>{" "}
                      {carDetails?.maxSeats || "N/A"} Seats
                    </div>
                  </div>

                  <div className="flex items-center">
                    <FaCogs className="text-text-primary w-6 h-6" />
                    <div className="ml-2 text-sm">
                      <span className="text-text-primary">GEAR:</span>{" "}
                      {carDetails?.gearType || "N/A"}
                    </div>
                  </div>

                  <div className="flex items-center">
                  <FaCarSide className="text-text-primary w-6 h-6"/>

                    <div className="ml-2 text-sm">
                      <span className="text-text-primary">CARTYPE:</span>{" "}
                      {carDetails?.carType || "N/A"} 
                    </div>
                  </div>

                  <div className="flex items-center">
                    <FaGasPump className="text-text-primary w-6 h-6" />
                    <div className="ml-2 text-sm">
                      <span className="text-text-primary">FUEL:</span>{" "}
                      {carDetails?.fuelType || "N/A"}
                    </div>
                  </div>
                </div>
              </div>

              <hr className="mt-6 mb-5" />
              <span
                className={`text-base font-medium px-3 py-1  rounded-lg  text-text-primary  ${
                  carDetails?.status === "available"
                    ? "bg-green-200 dark:bg-green-800"
                     : carDetails?.status === "unavailable"
                    ? "bg-red-200 dark:bg-red-800 "
                    : ""
                }`}
              >
                {carDetails?.status}
              </span>
              <div className="mt-6">
                {carDetails?.status === "available" ? (
                  <Link
                    to={`/booking?carType=${carDetails?.carType}`}
                    className="w-full"
                  >
                    <button className="border-2 font-semibold border-text-text-primary px-4 w-full py-1 text-text-primary hover:bg-black hover:text-white transition mb-2 md:mb-0">
                      Book Now
                    </button>
                  </Link>
                ) : (
                  <button
                    className={`border-2 font-semibold border-text-text-primary px-4 w-full py-1 transition mb-2 md:mb-0 ${
                      carDetails?.status === "available"
                        ? "text-text-primary hover:bg-black hover:text-white"
                        : "text-gray-400 cursor-not-allowed"
                    }`}
                    disabled={carDetails?.status !== "available"}
                  >
                    Book Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Description */}
    </div>
  );
};

export default CarDetailsCard;
