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
    <div
      style={{ background: "#EFF2F4" }}
      className="border rounded-lg p-3 md:h-[500px] shadow-lg max-w-xs mx-auto"
    >
      <div className="bg-white p-3 rounded-lg mb-4">
        <img
          src={car?.carImgUrl[0]}
          alt={car?.name}
          className="w-full h-48 rounded-md object-cover "
        />
      </div>

      <div className="bg-white md:px-4 p-4 md:py-7 rounded-lg">
        <div>
          <Starts star={star}></Starts>
        </div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-bold">{car?.name}</h3>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="text-red-500 font-semibold text-xl">
              {car?.pricePerHour} Tk
            </span>
            <p className="text-gray-500 text-sm">Per Hour</p>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-4 text-justify line-clamp-2">
          {car?.description}
        </p>
        <div className="flex flex-col md:flex-row justify-between">
          {pathname === "/booking" ? (
            <BookingFormModal car={car} />
          ) : (
            <Link to={`/view-details/${id}`} className="w-full">
              <button className="border px-4 w-full py-1 text-black hover:bg-black hover:text-white transition mb-2 md:mb-0">
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
