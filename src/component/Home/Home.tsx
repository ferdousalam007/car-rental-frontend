// import Banner from "../Banner/Banner";
import CarBookingSearchButton from "@/pages/CarBooking/CarBookingSearchButton";
// import CarPromoVideo from "../../pages/CarPromoVideo/CarPromoVideo";
import FeaturedCart from "../../pages/FeaturedCar/FeaturedCart";
import Testimonial from "../../pages/Testimonial/Testimonial";
import WhyChoose from "../../pages/WhyChoose/WhyChoose";
import CarBanner from "../Banner/CarBanner";

const Home = () => {
  return (
    <div>
      {/* <Banner></Banner> */}
      <CarBanner></CarBanner>
      <CarBookingSearchButton />
      <div className="bg-white dark:bg-[#26324d]">
        <div className="container">
          <FeaturedCart></FeaturedCart>
          <WhyChoose></WhyChoose>
        </div>
        {/* <CarPromoVideo></CarPromoVideo> */}
        <Testimonial></Testimonial>
      </div>
    </div>
  );
};

export default Home;
