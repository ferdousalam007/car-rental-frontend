import { Link } from "react-router-dom";

const MenuItem = () => {
  return (
    <div className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="flex  sm:flex-row items-center justify-between">
        {/* Home - Hidden  */}
        <Link to="/">
          <div className="hidden sm:block text-sm font-semibold px-6   flex-1 text-center">
            Home
          </div>
        </Link>

        {/* Bookings - Always visible */}
        <Link to="/booking">
          <div className="text-sm font-semibold px-3 md:px-6  sm:border-x-[1px]">
            Bookings
          </div>
        </Link>

        {/* Contact Us - Always visible */}
        <Link to="/car">
          <div className="text-sm font-semibold px-3 md:px-6 sm:border-x-[1px]">
            Rent a Car
          </div>
        </Link>

        {/* About Us - Always visible */}

        <Link to="/about-us">
          <div className="hidden sm:block text-sm font-semibold px-3 md:px-6 sm:border-x-[1px]">
            About Us
          </div>
        </Link>
        <Link to="/contact-us">
          <div className="hidden sm:block text-sm font-semibold px-3 md:px-6">
            Contact Us
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MenuItem;
