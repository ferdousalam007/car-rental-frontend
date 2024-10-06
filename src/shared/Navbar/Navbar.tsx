
// import Logo from "./Logo";
import MenuDropDown from "./MenuDropDown";

import  { useState } from 'react';
import { Link } from 'react-router-dom'
import Avatar from "./Avater";
import ThemeMenu from "./ThemeMenu";
import MobileDropdown from "./MobileDropdown";
const Navbar = () => {
   const [isOpen, setIsOpen] = useState(false);
  // const token = useAppSelector(useCurrentToken);
  // console.log(token);
  return (
    // <div className="fixed w-full bg-white z-10 shadow-sm">
    //   <div className="py-4 border-b-[1px]">
    //     <Container>
    //       <div className="flex flex-row items-center justify-between gap-3 md:gap-x-0.5">
    //         {/* Logo Section */}
    //         <div>
    //           <h2>RentO</h2>
    //         </div>

    //         {/* Menu Items: Hidden on smaller screens */}
    //         <div className="">
    //           <MenuItem />
    //         </div>

    //         {/* Menu Dropdown: Visible on all screens */}
    //         <div>
    //           <MenuDropDown />
    //         </div>
    //       </div>
    //     </Container>
    //   </div>
    // </div>
    <nav className="bg-slate-50  dark:bg-gray-800 fixed w-full top-0 z-50 shadow-md border-b-[1px] border-gray-400 dark:border-gray-100">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center justify-between w-full">
            <div className="">
              <Link to="/">
                <h2 className="dark:text-white font-bold text-2xl">
                  Rent{" "}
                  <span className="text-white bg-yellow-600 px-2 rounded ">
                    O
                  </span>
                </h2>
              </Link>
            </div>
            <div className="hidden md:block ">
              <div className="ml-10 flex items-center space-x-1">
                <Link
                  to="/"
                  className="dark:text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/booking"
                  className="dark:text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Booking
                </Link>
                <Link
                  to="/car"
                  className="dark:text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Cars
                </Link>
                <Link
                  to="/about-us"
                  className="dark:text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  About
                </Link>

                <Avatar />
                <MenuDropDown />
                <ThemeMenu />
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-10 space-y-1 sm:px-3">
            <div className="flex items-center justify-start">
              <Avatar />
              <MenuDropDown />
            </div>
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="dark:text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              to="/booking"
              onClick={() => setIsOpen(false)}
              className="dark:text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Booking
            </Link>
            <Link
              to="/car"
              onClick={() => setIsOpen(false)}
              className="dark:text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Cars
            </Link>
            <Link
              to="/about-us"
              onClick={() => setIsOpen(false)}
              className="dark:text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </Link>

            <MobileDropdown onClick={() => setIsOpen(false)} />
            <ThemeMenu />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
