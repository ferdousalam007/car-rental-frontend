import { Link, useLocation } from "react-router-dom";
import Starts from "../../shared/Starts/Starts";
import BookingFormModal from "../CarBooking/BookingFromModal";
import { TCar } from "../../type/global.type";
const CarCard = ({ car }: { car: TCar }) => {
  const id = car?._id;
//   const star = car?.rating;
  const { pathname } = useLocation();

  return (
    // <div className="border rounded-lg p-3 md:h-[500px] shadow-lg   dark:bg-slate-900">
    //   <div className="border border-gray-800  p-3 rounded-lg mb-4">
    //     <img
    //       src={car?.carImgUrl[0]}
    //       alt={car?.name}
    //       className="w-full h-48 rounded-md object-cover "
    //     />
    //   </div>

    //   <div className="md:px-4 p-4 md:py-7 rounded-lg">
    //     <div>
    //       <Starts star={star}></Starts>
    //     </div>
    //     <div className="flex items-center justify-between mb-8">
    //       <div>
    //         <h3 className="text-xl font-bold dark:text-white">{car?.name}</h3>
    //       </div>
    //       <div className="mt-4 md:mt-0">
    //         <span className="text-yellow-600 font-semibold text-xl">
    //           {car?.pricePerHour} Tk
    //         </span>
    //         <p className="text-gray-500 dark:text-white text-sm">Per Hour</p>
    //       </div>
    //     </div>
    //     <p className="text-gray-600 dark:text-white text-sm mb-4 text-justify line-clamp-2">
    //       {car?.description}
    //     </p>
    //     <div className="flex flex-col md:flex-row justify-between">
    //       {pathname === "/booking" ? (
    //         <BookingFormModal car={car} />
    //       ) : (
    //         <Link to={`/view-details/${id}`} className="w-full">
    //           <button className="border px-4 w-full py-1 text-black dark:text-white hover:bg-slate-800 hover:text-white transition mb-2 md:mb-0">
    //             View Details
    //           </button>
    //         </Link>
    //       )}
    //     </div>
    //   </div>
    // </div>
    <div className=" rounded overflow-hidden shadow-lg p-4 border border-gray-200">
      <div className="text-base mb-2 text-left text-text-secondary font-semibold">
        {car.name}
      </div>
      <div className="flex items-center mb-2">
        {/* <i className="fas fa-star text-yellow-500"></i> */}
        {/* <span className="text-gray-500 dark:text-white ml-1">{star}</span> */}
      </div>
      <div>
        {" "}
        <img
          className="w-full h-48 rounded-md object-cover "
          src={car?.carImgUrl[0]}
          alt={car?.name || "car"}
        />
      </div>
      <div className="flex flex-start items-start text-left mb-2 mt-3 h-[40px]">
        {car.description.length > 54
          ? car.description.slice(0, 54) + "..."
          : car.description}
      </div>
      <div className="py-4 mt-6">
        <div className="flex items-center mr-2 justify-between">
          <span>Rating </span>
          <span className="flex items-center">
            <Starts star={car?.avgRating}></Starts>
            <span>({car?.rating?.length ? car.rating.length : 0})</span>
          </span>
        </div>
        <div className="flex items-center mb-2 mt-2 mr-2 justify-between">
       
          <span>Car Type</span>
          <span>{car?.carType}</span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-base font-bold  mb-4">
          TK{car.pricePerHour}/Hour
        </div>
        {/* <Link
          className="bg-slate-900 hover:bg-slate-700 text-white  py-2 px-2 rounded border-transparent border dark:border-slate-600 transition-all duration-300 ease-in-out text-sm"
          to={`/view-details/${id}`}
        >
          View Details
        </Link> */}
        {pathname === "/booking" ? (
            <BookingFormModal car={car} />
          ) : (
            <Link to={`/view-details/${id}`}>
              <button className="bg-slate-900 hover:bg-slate-700 text-white  py-2 px-2 rounded border-transparent border dark:border-slate-600 transition-all duration-300 ease-in-out text-sm">
                View Details
              </button>
            </Link>
          )}
      </div>
    </div>
  );
};

export default CarCard;
