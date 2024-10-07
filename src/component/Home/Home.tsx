import CarBookingSearchButton from "@/pages/CarBooking/CarBookingSearchButton";

import FeaturedCart from "../../pages/FeaturedCar/FeaturedCart";
import Testimonial from "../../pages/Testimonial/Testimonial";
import WhyChoose from "../../pages/WhyChoose/WhyChoose";
import CarBanner from "../Banner/CarBanner";

const Home = () => {
  return (
    <div>
      <CarBanner></CarBanner>
      <CarBookingSearchButton />
      <div className="bg-white dark:bg-[#26324d]">
        <div className="container">
          <FeaturedCart></FeaturedCart>
          <WhyChoose></WhyChoose>
        </div>

        <Testimonial></Testimonial>
      </div>
    </div>
  );
};

export default Home;
