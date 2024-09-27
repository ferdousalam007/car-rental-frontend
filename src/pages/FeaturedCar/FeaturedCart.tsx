import Slider from "react-slick";
import FeaturedCarCard from "./FeaturedCarCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { carApi } from "../../redux/features/Car/carApi";
import Loader from "../../shared/Loader/Loader";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { TCar } from "../../type/global.type";
import SectionHeading from "@/component/SectionHeading/SectionHeading";

const FeaturedCart = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const { data: getCars, isFetching } = carApi.useGetAllCarsQuery({ price: 0 });
  const carData = getCars?.data;

  return (
    <div className="">
      <div className="text-center py-16">
        <SectionHeading title="Recommended Cars">
          <p className="text-gray-600 dark:text-white max-w-2xl mx-auto text-center ">
            Experience the perfect blend of performance and comfort with our
            top-rated vehicles, featuring advanced technology, sleek design, and
            exceptional fuel efficiency.
          </p>
          <div className="mb-7 flex justify-end">
            <div className="flex items-center justify-center bg-gray-200 rounded-full w-12 h-12 cursor-pointer">
              <Link to="/car">
                <FaArrowRight className="text-gray-600 text-xl" />
              </Link>
            </div>
          </div>
        </SectionHeading>

        {isFetching ? (
          <Loader />
        ) : (
          <Slider {...settings}>
            {carData?.map((car: TCar, index: number) => (
              <FeaturedCarCard car={car} key={index} />
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default FeaturedCart;
