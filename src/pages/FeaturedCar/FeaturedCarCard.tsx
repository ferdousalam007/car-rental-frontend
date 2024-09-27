/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useLocation } from "react-router-dom";
import Starts from "../../shared/Starts/Starts";
import BookingFormModal from "../CarBooking/BookingFromModal";
import { TCar } from "../../type/global.type";

const FeaturedCarCard = ({ car }: { car: TCar }) => {
  const id = car?._id;
  const star = car?.rating;
  const { pathname } = useLocation();

  return (
    <div className="border rounded-lg p-3 md:h-[500px] shadow-lg max-w-xs mx-auto dark:bg-slate-900">
      <div className="border border-gray-800  p-3 rounded-lg mb-4">
        <img
          src={car?.carImgUrl[0]}
          alt={car?.name}
          className="w-full h-48 rounded-md object-cover "
        />
      </div>

      <div className="  md:px-4 p-4 md:py-7 rounded-lg">
        <div>
          <Starts star={star}></Starts>
        </div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-bold dark:text-white">{car?.name}</h3>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="text-yellow-600 font-semibold text-xl">
              {car?.pricePerHour} Tk
            </span>
            <p className="text-gray-500 dark:text-white text-sm">Per Hour</p>
          </div>
        </div>
        <p className="text-gray-600 dark:text-white text-sm mb-4 text-justify line-clamp-2">
          {car?.description}
        </p>
        <div className="flex flex-col md:flex-row justify-between">
          {pathname === "/booking" ? (
            <BookingFormModal car={car} />
          ) : (
            <Link to={`/view-details/${id}`} className="w-full">
              <button className="border px-4 w-full py-1 text-black dark:text-white hover:bg-slate-800 hover:text-white transition mb-2 md:mb-0">
                View Details
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCarCard;
