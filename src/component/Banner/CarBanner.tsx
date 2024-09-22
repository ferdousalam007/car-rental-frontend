import { Link } from "react-router-dom";
import bannerImg from "../../assets/carBanner.webp"
import CarBookingSearchButton from "@/pages/CarBooking/CarBookingSearchButton";

const CarBanner = () => {
  return (
    <div
      className="bg-contain bg-no-repeat min-h-[850px] w-full flex justify-center overflow-hidden"
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      <div className="container mx-auto">
        <div className="text-center pt-[250px]">
          <h1 className="uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#111827]">
            Make Your Ride Easy & Fast <br /> with Rento Rental
          </h1>
        </div>
        <div className="flex justify-center mt-8 gap-4 ">
          <Link
            to="/booking"
            className="bg-[#111827] hover:bg-[#26324d] text-white font-bold py-4 px-10 rounded"
          >
            Book Now
          </Link>
          <Link
            to="/contact-us"
            className="bg-[#26324d] hover:bg-[#111827] text-white font-bold py-4 px-10 rounded"
          >
            Contact
          </Link>
        </div>
        <CarBookingSearchButton/>
      </div>
    </div>
  );
}

export default CarBanner