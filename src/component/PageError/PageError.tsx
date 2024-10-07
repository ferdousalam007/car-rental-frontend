import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import error from "../../assets/image.png";

const PageError = () => {
  return (
    <div className="flex items-center justify-center min-h-screen   p-4">
      <div className="text-center p-6 md:p-8 dark:bg-slate-600 shadow-lg rounded-lg max-w-lg w-full">
        <img src={error} alt="Error" className="w-full h-auto mb-6" />
        <div className="text-red-500 text-5xl md:text-6xl mb-4">
         
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-text-primary">
          Oops! Page Not Found
        </h1>
        <p className="text-text-primary mb-6 text-sm md:text-base">
          The page you are looking for doesn’t exist .</p>
        <Link
          to="/"
          className="flex items-center justify-center text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition text-sm md:text-base"
        >
          <AiOutlineHome className="mr-2 text-lg md:text-xl" /> Go to Home
        </Link>
      </div>
    </div>
  );
};

export default PageError;
