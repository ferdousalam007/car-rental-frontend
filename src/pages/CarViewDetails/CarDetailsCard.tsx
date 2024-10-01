/* eslint-disable @typescript-eslint/no-explicit-any */

import Stars from "../../shared/Starts/Starts";

import { FaCarSide, FaDoorOpen, FaGasPump, FaUsers } from "react-icons/fa6";
import { FaCalendarAlt, FaCogs, FaTachometerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import CarSlider from "./CarSlider";

const CarDetailsCard = ({ carDetails }: any) => {
  const star = carDetails?.rating;
  console.log(carDetails);
  return (
    <div className="container  my-10 p-4">
      {/* Left side - Image/Slider */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className=" ">
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
                  <div className="flex items-center text-yellow-400">
                    <Stars star={star} />
                  </div>
                </div>
              </div>
              <div className="text-lg text-yellow-600 mt-2">
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
                    <FaCarSide className="text-yellow-600 w-6 h-6" />
                    <div className="ml-2 text-sm">
                      <span className="text-text-primary">BODY:</span> Sedan
                    </div>
                  </div>

                  <div className="flex items-center">
                    <FaTachometerAlt className="text-yellow-600 w-6 h-6" />
                    <div className="ml-2 text-sm">
                      <span className="text-text-primary">MILEAGE:</span> 70.000
                      (Mi)
                    </div>
                  </div>

                  <div className="flex items-center">
                    <FaCalendarAlt className="text-yellow-600 w-6 h-6" />
                    <div className="ml-2 text-sm">
                      <span className="text-text-primary">YEARS:</span> 2023
                      Model
                    </div>
                  </div>

                  <div className="flex items-center">
                    <FaCogs className="text-yellow-600 w-6 h-6" />
                    <div className="ml-2 text-sm">
                      <span className="text-text-primary">ENGINE:</span> 2500
                    </div>
                  </div>

                  <div className="flex items-center">
                    <FaUsers className="text-yellow-600 w-6 h-6" />
                    <div className="ml-2 text-sm">
                      <span className="text-text-primary">PASSENGERS:</span>{" "}
                      {carDetails?.maxSeats} Seats
                    </div>
                  </div>

                  <div className="flex items-center">
                    <FaCogs className="text-yellow-600 w-6 h-6" />
                    <div className="ml-2 text-sm">
                      <span className="text-text-primary">GEAR:</span>{" "}
                      {carDetails?.gearType}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <FaDoorOpen className="text-yellow-600 w-6 h-6" />
                    <div className="ml-2 text-sm">
                      <span className="text-text-primary">DOORS:</span> 2 Doors
                    </div>
                  </div>

                  <div className="flex items-center">
                    <FaGasPump className="text-yellow-600 w-6 h-6" />
                    <div className="ml-2 text-sm">
                      <span className="text-text-primary">FUEL:</span>{" "}
                      {carDetails?.fuelType}
                    </div>
                  </div>
                </div>
              </div>

              <hr className="mt-6" />
              <div className="mt-6">
                {carDetails?.status === "available" ? (
                  <Link
                    to={`/booking?carType=${carDetails?.carType}`}
                    className="w-full"
                  >
                    <button className="border-2 font-semibold border-yellow-600 px-4 w-full py-1 text-yellow-600 hover:bg-black hover:text-white transition mb-2 md:mb-0">
                      Book Now
                    </button>
                  </Link>
                ) : (
                  <button
                    className={`border-2 font-semibold border-yellow-600 px-4 w-full py-1 transition mb-2 md:mb-0 ${
                      carDetails?.status === "available"
                        ? "text-yellow-600 hover:bg-black hover:text-white"
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
