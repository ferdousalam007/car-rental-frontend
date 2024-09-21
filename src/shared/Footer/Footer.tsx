import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <div style={{ background: "#010101" }} className="text-white">
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-7">
        <div>
          <h2 className="text-xl font-semibold mb-4">About Us</h2>
          <p className="text-gray-400 text-justify">
            We are committed to providing top-quality services and products to
            our community. With a focus on innovation and customer satisfaction,
            we strive to exceed expectations and deliver value every day.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <ul className="text-gray-400 space-y-2">
            <li>— Phone: 1-567-124-44227</li>
            <li>— Address: 182 Main Street, Pert Harbour 8007</li>
            <li>— Hours: Mon-Sat 8:00-18:00, Sunday Closed</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Terms of Service</h2>
          <p className="text-gray-400 text-justify">
            By using our services, you agree to abide by our terms and
            conditions. We value transparency and encourage you to review our
            policies to understand your rights and responsibilities.
          </p>
        </div>
      </div>
      <div className="flex justify-center space-x-6 mb-4">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white  text-3xl hover:text-red-600"
        >
          <FaFacebook />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-red-600 text-3xl"
        >
          <FaInstagram />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-red-600 text-3xl"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-red-600 text-3xl"
        >
          <FaGithub />
        </a>
      </div>
      <div className="mt-8 text-center text-gray-500">
        <ul className="flex justify-center space-x-6 mb-4">
          <li>
            <a href="/privacy-policy" className="hover:text-gray-400">
              Privacy Policy
            </a>
          </li>

          <li>
            <a href="/contact-us" className="hover:text-gray-400">
              Contact Us
            </a>
          </li>
          <li>
            <a href="/refund-policy" className="hover:text-gray-400">
              Refund Policy
            </a>
          </li>
        </ul>
      </div>
      <div className="bg-red-600 text-center py-4">
        <p className="text-white text-sm">
          © RentWheels - 2024 | All Rights Reserved. Designed By Prince Rubel
        </p>
      </div>
    </div>
  );
};

export default Footer;
