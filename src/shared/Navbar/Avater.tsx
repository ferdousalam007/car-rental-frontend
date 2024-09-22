import { FaUser } from "react-icons/fa6";
import { userApi } from "../../redux/features/user/userApi";
import { useAppSelector } from "../../redux/hooks";
// import { useCurrentToken } from "../../redux/features/Auth/authSlice";
import { useCurrentToken } from "../../redux/features/Auth/AuthSlice";

const Avatar = () => {
  const token = useAppSelector(useCurrentToken);

  const { data: getMe } = userApi.useGetMeQuery(undefined, { skip: !token });
  const user = getMe?.data;

  return (
    <div className="flex items-center">
      {user ? (
        <div className="flex items-center gap-1">
          <img
            src={
              user?.image ||
              "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
            }
            alt={user?.name}
            className="h-8 w-8 rounded-full object-cover"
          />
          <p className="dark:text-gray-300">{user?.name}</p>
        </div>
      ) : (
        <div>
          {/* <FaUser className="h-8 w-8 rounded-full text-gray-500 " />
          <p className="dark:text-gray-300">{user?.name}</p> */}
        </div>
      )}
    </div>
  );
};

export default Avatar;
