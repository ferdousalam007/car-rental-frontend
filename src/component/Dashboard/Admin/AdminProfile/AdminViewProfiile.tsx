/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Tag } from "antd";
import { userManagementApi } from "../../../../redux/features/Admin/userManagementApi";
import { authApi } from "../../../../redux/features/Auth/authApi";
import { bookingApi } from "../../../../redux/features/Booking/bookingApi";
import { carApi } from "../../../../redux/features/Car/carApi";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { TCar } from "../../../../type/global.type";
import Loader from "../../../../shared/Loader/Loader";
import { FaCar, FaCaretLeft, FaUsers } from "react-icons/fa6";
import DashboardHeading from "../../DashboardHeading/DashboardHeading";

const AdminViewProfile = () => {
  // Fetch all cars
  const { data: allCars, isLoading: isLoadingCars } = carApi.useGetAllCarsQuery(
    {}
  );
  const carData = allCars?.data;

  // Fetch user data
  const { data: getMe, isLoading: isLoadingUser } =
    authApi.useGetMeQuery(undefined);
  const userData = getMe?.data;

  // Fetch all bookings
  const { data: myBookings, isLoading: isLoadingBookings } =
    bookingApi.useGetAllBookingsQuery(undefined);
  const bookingData = myBookings?.data;

  // Fetch all users
  const { data: allUser, isLoading: isLoadingUsers } =
    userManagementApi.useGetAllUserQuery(undefined);
  const allUserData = allUser?.data;

  // Calculate totals
  const totalUser = allUserData?.length;
  const totalBookings = bookingData?.length;

  // Available car list
  const tableData = carData
    ?.filter((item: TCar) => item.status === "available")
    .map((item: TCar) => ({
      key: item._id,
      isDelete: item?.isDelete,
      carImage: item?.carImgUrl ? item.carImgUrl[0] : null,
      carName: item?.name,
      status: item?.status,
      carType: item?.carType,
      carPrice: item?.pricePerHour,
    }));

  const columns = [
    {
      title: "Image",
      dataIndex: "carImage",
      key: "carImage",
      render: (carImage: any) => (
        <img
          src={carImage}
          alt="Car"
          style={{
            width: 40,
            height: 40,
            borderRadius: "100%",
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      title: "Car Name",
      dataIndex: "carName",
      key: "carName",
    },
    {
      title: "Car Price",
      dataIndex: "carPrice",
      key: "carPrice",
      render: (last: number) => `Tk ${last.toFixed(2)}/ hour`,
    },
    {
      title: "Car Type",
      dataIndex: "carType",
      key: "carType",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: any) => (
        <Tag
          className={`status ${
            status === "available" ? "text-green-500" : "text-red-500"
          }`}
        >
          {status}
        </Tag>
      ),
    },
  ];

  // Show loading spinner while data is being fetched
  if (isLoadingCars || isLoadingUser || isLoadingBookings || isLoadingUsers) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <DashboardHeading
        title=" Dashboard"
        highlightedText={userData?.name.toUpperCase()}
      />
      {/* Header Section */}

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* User Profile Card */}
          <div className="relative bg-white shadow-md rounded-lg p-8 transition-transform duration-300 hover:shadow-xl transform hover:-translate-y-1">
            <div className="flex justify-center">
              <Link to="/dashboard/profile-update" className="relative">
                <img
                  className="w-36 h-36 object-cover rounded-full border-4 border-white shadow-lg"
                  src={userData?.image}
                  alt={userData?.name}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 hover:opacity-100 rounded-full">
                  <FaEdit className="text-2xl text-white" />
                </div>
              </Link>
            </div>
            <div className="text-center mt-6">
              <h2 className="text-3xl font-semibold text-gray-800">
                {userData?.name}
              </h2>
              <Tag className="mt-2 text-gray-600">{userData?.role}</Tag>
            </div>
            <div className="mt-8 text-center text-gray-600">
              <p>
                <span className="font-semibold">Mobile: </span>
                {userData?.phone}
              </p>
              <p className="mt-2">
                <span className="font-semibold">Email: </span>
                {userData?.email}
              </p>
            </div>
          </div>

          {/* Total Booking History Card */}
          <div className="bg-white shadow-md rounded-lg p-6 transition-transform duration-300 hover:shadow-xl col-span-1 sm:col-span-2 lg:col-span-1 transform hover:-translate-y-1">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
              <FaCar className="inline mr-2 text-yellow-500" /> Booking
              <span className="text-yellow-500">Summary</span>
            </h2>
            <div className="bg-gray-100 p-8 rounded-lg text-center">
              <span className="text-red-600 font-bold text-4xl">
                {totalBookings}{" "}
                <FaCaretLeft className="inline justify-center items-center mr-2 text-red-500" />
              </span>
              <p className="text-xl text-gray-700">
                You have received a total of car bookings.
              </p>
            </div>
          </div>

          {/* User Summary Card */}
          <div className="bg-white shadow-md rounded-lg p-6 transition-transform duration-300 hover:shadow-xl col-span-1 sm:col-span-2 lg:col-span-1 transform hover:-translate-y-1">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
              <FaUsers className="inline mr-2 text-yellow-500" /> User
              <span className="text-yellow-500">Summary</span>
            </h2>
            <div className="bg-gray-100 p-8 rounded-lg text-center">
              <span className="text-red-600 font-bold text-4xl">
                {totalUser}
                <FaUsers className="inline text-4xl justify-center items-center mr-2 text-red-500" />
              </span>
              <p className="text-xl text-gray-700 ">
                Users are registered in the system.
              </p>
            </div>
          </div>
        </div>
      </div>

   
      <div>
        <div className="mt-6 mb-6">
          <DashboardHeading title="Available" highlightedText="Car List" />
        </div>

        <div className="md:p-6">
          <Table
            columns={columns}
            dataSource={tableData || []}
            className="overflow-x-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminViewProfile;
