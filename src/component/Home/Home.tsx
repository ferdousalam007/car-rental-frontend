// import Banner from "../Banner/Banner";
import CarPromoVideo from "../../pages/CarPromoVideo/CarPromoVideo";
import FeaturedCart from "../../pages/FeaturedCar/FeaturedCart";
import Testimonial from "../../pages/Testimonial/Testimonial";
import WhyChoose from "../../pages/WhyChoose/WhyChoose";
import CarBanner from "../Banner/CarBanner";

const Home = () => {
  return (
    <div>
      {/* <Banner></Banner> */}
      <CarBanner></CarBanner>
      <div>
        <div className="container mx-auto">
          <FeaturedCart></FeaturedCart>
          <WhyChoose></WhyChoose>
        </div>
        <CarPromoVideo></CarPromoVideo>
        <Testimonial></Testimonial>
      </div>
    </div>
  );
};

export default Home;
