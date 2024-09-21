import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import car1 from "../../assets/bann1.jpg";
import car2 from "../../assets/banner2.jpg";
import car4 from "../../assets/banner4.jpg";
import "./Banner.css";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="hero-section relative pt-24 md:pt-0">
      <Carousel
        className="main-slide"
        autoPlay={true}
        interval={7000}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
      >
        <div>
          <img
            src={car1}
            className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] 2xl:h-[900px] object-cover"
            alt="Affordable car rentals"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70"></div>
          <div className="slide-content absolute inset-0 flex flex-col justify-center items-start text-left p-4 md:p-4 lg:p-16">
            <h1 className="text-lg sm:text-xl md:text-3xl  lg:text-5xl font-bold leading-tight mb-4 text-black">
              We offer the best prices{" "}
              <span className="text-red-500">in town</span>
            </h1>
            <p className="text-sm sm:text-lg md:text-xl -mt-3 mb:-mt-0  lg:text-2xl text-gray-700 mb:text-gray-400 mb-4">
              Drive away with unbeatable deals on top-rated <br /> vehicles.
            </p>
            <Link to="/booking" className="md:mt-4 mb-6 mb:mb-0">
              <button className="border border-red-500 bg-black text-white hover:border-b-2 hover:border-b-white hover:text-white py-2 px-4 md:px-6 rounded-md hover:bg-red-500 hover:text-primary transition duration-300">
                Book Now
              </button>
            </Link>
          </div>
        </div>

        <div>
          <img
            src={car2}
            className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] 2xl:h-[900px] object-cover"
            alt="Wide selection of cars"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70"></div>
          <div className="slide-content absolute inset-0 flex flex-col justify-center items-start text-left p-4 md:p-8 lg:p-16">
            <h1 className="text-lg sm:text-xl md:text-3xl lg:text-5xl font-bold leading-tight mb-4 text-white">
              Wide Range of <span className="text-red-500">Vehicles</span>
            </h1>
            <p className="text-sm sm:text-lg md:text-xl lg:text-2xl -mt-3 mb:-mt-0 text-gray-300 mb-4">
              From compact cars to luxury SUVs, we have the perfect <br /> ride
              for every journey.
            </p>
            <Link to="/car" className="md:mt-4 mb-6 mb:mb-0">
              <button className="border border-white bg-black text-white hover:text-black py-2 px-4 md:px-6 rounded-md hover:bg-white hover:text-primary transition duration-300">
                Explore Our Fleet
              </button>
            </Link>
          </div>
        </div>

        <div>
          <img
            src="https://i.postimg.cc/bNFJ59zc/banner4.jpg"
            className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] 2xl:h-[900px] object-cover"
            alt="Flexible rental options"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70"></div>
          <div className="slide-content absolute inset-0 flex flex-col justify-center items-start text-left p-4 md:p-8 lg:p-16">
            <h1 className="text-lg sm:text-xl md:text-3xl lg:text-5xl font-bold leading-tight mb-4 text-white">
              Flexible Rental <span className="text-red-500">Plans</span>
            </h1>
            <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-white -mt-3 mb:-mt-0 mb-4">
              Rent by the day, week, or month – the choice is yours.
            </p>
            <Link to="/car" className="md:mt-4 mb-6 mb:mb-0">
              <button className="border border-white bg-black text-white hover:text-black py-2 px-4 md:px-6 rounded-md hover:bg-white hover:text-primary transition duration-300">
                Choose Your Plan
              </button>
            </Link>
          </div>
        </div>

        <div>
          <img
            src={car4}
            className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] 2xl:h-[900px] object-cover"
            alt="24/7 customer support"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70"></div>
          <div className="slide-content absolute inset-0 flex flex-col justify-center items-start text-left -mt-4 md:-mt-0 md:p-8 lg:p-16">
            <h1 className="text-lg sm:text-xl md:text-3xl lg:text-5xl font-bold leading-tight text-white  md:mb-4">
              24/7 Customer <span className="text-red-500">Support</span>
            </h1>
            <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-300 md:text-black mb-4 md:mt-8">
              We're here for you anytime, anywhere. Your satisfaction <br /> is
              our priority.
            </p>
            <Link to="/contact-us" className="">
              <button className="border border-white bg-black text-white hover:text-black py-2 px-4 md:px-6 rounded-md hover:bg-white hover:text-primary transition duration-300">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
