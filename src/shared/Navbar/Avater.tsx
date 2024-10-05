import { userApi } from "../../redux/features/user/userApi";
import { useAppSelector } from "../../redux/hooks";
// import { useCurrentToken } from "../../redux/features/Auth/authSlice";
import { useCurrentToken } from "../../redux/features/Auth/AuthSlice";
import { Link } from "react-router-dom";

const Avatar = () => {
  const token = useAppSelector(useCurrentToken);

  const { data: getMe } = userApi.useGetMeQuery(undefined, { skip: !token });
  const user = getMe?.data;

  return (
    <div className="flex items-center md:mb-0 mb-4">
      {user ? (
        <div className="flex items-center gap-1">
          <img
            src={
              user?.image ||
              "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
            }
            alt={user?.name}
            className="h-8 w-8 rounded-full object-cover border-2 dark:border border-yellow-700 "
          />
          <p className="text-yellow-700 font-semibold dark:text-gray-300">
            {user?.name?.split(" ").length > 1
              ? (
                  user.name.charAt(0).toUpperCase() +
                  user.name.slice(1).split(" ")[0]
                ).slice(0, 8)
              : (
                  user?.name.charAt(0).toUpperCase() + user?.name.slice(1)
                ).slice(0, 12)}
          </p>
        </div>
      ) : (
        <div>
          {/* <FaUser className="h-8 w-8 rounded-full text-gray-500 " />
          <p className="dark:text-gray-300">{user?.name}</p> */}
          <Link
            className="dark:text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            to="/login"
          >
            login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Avatar;
