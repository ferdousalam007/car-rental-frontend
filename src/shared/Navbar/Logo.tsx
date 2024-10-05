import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div >
      <Link to="/">
        <h2 className="dark:text-white font-bold text-2xl">
          Rent <span className="text-white bg-yellow-600 px-2 rounded ">O</span>
        </h2>
      </Link>
    </div>
  );
};

export default Logo;
