import { Link } from "react-router-dom";
import bannerImg from "../../assets/carBanner.webp"

const CarBanner = () => {
  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat min-h-[850px] w-full flex justify-center overflow-hidden"
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      <div className="container mx-auto">
        <div className="text-center pt-[180px] sm:pt-[250px]">
          <h1 className="leading-relaxed uppercase text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold text-text-primary">
            Make Your Ride Easy & Fast <br /> with Rento Rental
          </h1>
        </div>
        <div className="flex justify-center mt-8 gap-4 ">
          <Link
            to="/booking"
            className="bg-[#111827] hover:bg-[#26324d] text-white font-bold py-4 px-6 sm:px-10 rounded"
          >
            Book Now
          </Link>
          <Link
            to="/contact-us"
            className="bg-[#26324d] hover:bg-[#111827] text-white font-bold py-4 px-6 sm:px-10 rounded"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CarBanner