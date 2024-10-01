// import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="shrink-0 py-8 bg-[#26324d] dark:bg-slate-900">
      <footer className=" text-gray-400 py-6">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="mb-4 md:mb-0 text-center md:text-left md:border-r md:border-[#D0D6BC3D] px-6">
              <h5 className="text-[25px] font-medium text-white mb-4">About</h5>
              <p>
                At Rent O, we turn outdoor dreams into reality with high-quality
                 gear for all adventurers. Grow with us as we innovate
                and expand, offering the best in outdoor car rent and
                expertise.
              </p>
            </div>
            <div className="mb-4 md:mb-0 text-center">
              <h5 className="text-[25px] font-medium text-white mb-4">
                Rent <span className="text-yellow-500 text-[35px]">O</span>
              </h5>
              <div>
                <h6 className="text-lg	 font-medium text-gray-300">Address</h6>
                <small>
                  {" "}
                  530 Grove St,
                  <br />
                  Sonoma, CA 95448
                </small>
              </div>
              <div>
                <h6 className="text-lg	 font-medium text-gray-300">Phone</h6>
                <small>(123) 662.5553</small>
                <div className="flex space-x-2 justify-center pt-3">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FF8751"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-facebook"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FF8751"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-twitter"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FF8751"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-youtube"
                    >
                      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                      <path d="m10 15 5-3-5-3z" />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FF8751"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-linkedin"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FF8751"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-instagram"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="text-center md:text-left   md:border-l md:border-[#D0D6BC3D] px-6 md:pl-9">
              <h5 className="text-[25px] font-medium text-white mb-4">
                Useful Links
              </h5>
              <div className="space-y-3 flex flex-col">
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
                <Link to="/aboutus" className="hover:text-white ">
                  About
                </Link>
                <Link to="/products" className="hover:text-white">
                  Products
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4 md:mb-0 text-center pt-8 pb-10">
          <p>&copy; {new Date().getFullYear()} Rent O. All rights reserved.</p>
        </div>
      </footer>
    </div>
    // <div style={{ background: "#010101" }} className="text-white">
    //   <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-7">
    //     <div>
    //       <h2 className="text-xl font-semibold mb-4">About Us</h2>
    //       <p className="text-gray-400 text-justify">
    //         We are committed to providing top-quality services and products to
    //         our community. With a focus on innovation and customer satisfaction,
    //         we strive to exceed expectations and deliver value every day.
    //       </p>
    //     </div>
    //     <div>
    //       <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
    //       <ul className="text-gray-400 space-y-2">
    //         <li>— Phone: 1-567-124-44227</li>
    //         <li>— Address: 182 Main Street, Pert Harbour 8007</li>
    //         <li>— Hours: Mon-Sat 8:00-18:00, Sunday Closed</li>
    //       </ul>
    //     </div>
    //     <div>
    //       <h2 className="text-xl font-semibold mb-4">Terms of Service</h2>
    //       <p className="text-gray-400 text-justify">
    //         By using our services, you agree to abide by our terms and
    //         conditions. We value transparency and encourage you to review our
    //         policies to understand your rights and responsibilities.
    //       </p>
    //     </div>
    //   </div>
    //   <div className="flex justify-center space-x-6 mb-4">
    //     <a
    //       href="https://facebook.com"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       className="text-white  text-3xl hover:text-red-600"
    //     >
    //       <FaFacebook />
    //     </a>
    //     <a
    //       href="https://instagram.com"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       className="text-white hover:text-red-600 text-3xl"
    //     >
    //       <FaInstagram />
    //     </a>
    //     <a
    //       href="https://linkedin.com"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       className="text-white hover:text-red-600 text-3xl"
    //     >
    //       <FaLinkedin />
    //     </a>
    //     <a
    //       href="https://github.com"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       className="text-white hover:text-red-600 text-3xl"
    //     >
    //       <FaGithub />
    //     </a>
    //   </div>
    //   <div className="mt-8 text-center text-gray-500">
    //     <ul className="flex justify-center space-x-6 mb-4">
    //       <li>
    //         <a href="/privacy-policy" className="hover:text-gray-400">
    //           Privacy Policy
    //         </a>
    //       </li>

    //       <li>
    //         <a href="/contact-us" className="hover:text-gray-400">
    //           Contact Us
    //         </a>
    //       </li>
    //       <li>
    //         <a href="/refund-policy" className="hover:text-gray-400">
    //           Refund Policy
    //         </a>
    //       </li>
    //     </ul>
    //   </div>
    //   <div className="bg-red-600 text-center py-4">
    //     <p className="text-white text-sm">
    //       © RentWheels - 2024 | All Rights Reserved. Designed By Prince Rubel
    //     </p>
    //   </div>
    // </div>
  );
};

export default Footer;
