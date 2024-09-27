import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div>
      <Link to="/">
        {/* <img
          className="hidden md:block"
          width="100"
          height="100"
          src="https://i.ibb.co/fDwcFwj/logo.png"
          alt=""
        /> */}
        <h2 className="dark:text-white font-bold text-2xl">
          Rent <span className="text-white bg-yellow-600 px-2 rounded ">O</span>
        </h2>
      </Link>
    </div>
  );
};

export default Logo;
