/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Tag } from "antd";
import { bookingApi } from "../../../../redux/features/Booking/bookingApi";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { userApi } from "../../../../redux/features/user/userApi";
import Loader from "../../../../shared/Loader/Loader";
import { TCarBooking } from "../../../../type/global.type";
import { GetStatusTag, PaymentStatusTag } from "../../../../utils/getStatusTag";
import DashboardHeading from "../../DashboardHeading/DashboardHeading";

const UserViewProfile = () => {
  // Fetch user data
  const { data: getMe, isLoading: isLoadingUser } =
    userApi.useGetMeQuery(undefined);
  const userData = getMe?.data;

  // Fetch booking data
  const { data: myBookings, isLoading: isLoadingBookings } =
    bookingApi.useGetMyBookingsQuery(undefined);
  const bookingData = myBookings?.data;

  // Filter for completed bookings
  const completedBookingData = bookingData?.filter(
    (item: TCarBooking) => item.status === "completed"
  );

  const tableData = completedBookingData?.map((item: TCarBooking) => ({
    key: item._id,
    name: item?.car?.name,
    price: item?.car.pricePerHour,
    pickUpDate: item?.pickUpDate,
    pickOfTime: item?.pickTime,
    dropOffDate: item?.dropOffDate,
    dropOfTime: item?.dropTime,
    status: item?.status,
    paymentStatus: item?.paymentStatus,
    identity: item?.identity,
    identityNo: item?.identityNo,
    drivingLicenseNo: item?.drivingLicenseNo,
    totalCost: item?.totalCost,
  }));

  const columns = [
    {
      title: "Car Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (last: number) => `Tk ${last.toFixed(2)}/ hour`,
    },
    {
      title: "Pick-Up Date",
      dataIndex: "pickUpDate",
      key: "pickUpDate",
    },
    {
      title: "Pick-Up Time",
      dataIndex: "pickOfTime",
      key: "pickOfTime",
    },
    {
      title: "Drop-Off Date",
      dataIndex: "dropOffDate",
      key: "dropOffDate",
      render: (text: any, record: { status: string }) =>
        record.status === "completed" ? text : "N/A",
    },
    {
      title: "Drop-Off Time",
      dataIndex: "dropOfTime",
      key: "dropOfTime",
      render: (text: any, record: { status: string }) =>
        record.status === "completed" ? text : "N/A",
    },
    {
      title: "Car Booking Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => GetStatusTag(status),
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (paymentStatus: string) => PaymentStatusTag(paymentStatus),
    },
    {
      title: "Total Cost",
      dataIndex: "totalCost",
      key: "totalCost",
    },
  ];

  // Calculate total completed bookings
  const totalBooking = completedBookingData?.length;

  // Show loading spinner while data is being fetched
  if (isLoadingUser || isLoadingBookings) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <DashboardHeading
        title=" Welcome Back"
        highlightedText={userData?.name}
      />

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* User Profile Card */}
          <div className="relative border bg-white dark:bg-slate-800 shadow-lg rounded-lg p-8 transition-transform duration-300 hover:shadow-xl transform hover:-translate-y-1">
            <div className="flex justify-center cursor-pointer">
              <Link to="/dashboard/profile-update" className="relative">
                <img
                  className="w-36 h-36 object-cover rounded-full border-4 border-white shadow-lg"
                  src={userData?.image}
                  alt={userData?.name}
                />
                {/* Edit Icon */}
                <div className=" inset-0 flex items-center justify-center  transition-opacity duration-300 rounded-full">
                  <FaEdit className="text-3xl text-text-primary" />
                </div>
              </Link>
            </div>
            <div className="text-center mt-6">
              <h2 className="text-3xl font-semibold text-text-primary">
                {userData?.name}
              </h2>
              <Tag className="mt-2 text-gray-500 text-base">
                {userData?.role}
              </Tag>
            </div>
            <div className="mt-8 text-center text-text-primary">
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

          {/* Total Completed Booking History Card */}
          <div className="bg-white dark:bg-slate-800 shadow-lg rounded-lg p-8 transition-transform duration-300 hover:shadow-xl  transform hover:-translate-y-1 border">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-6">
              My Completed Booking Summary
            </h2>
            <div className="bg-gray-100 dark:bg-slate-900 p-8 rounded-lg text-center">
              {totalBooking > 0 ? (
                <p className="text-xl text-gray-700 dark:text-white">
                  You have completed
                  <span className="text-yellow-700 font-bold text-2xl">
                    {"  "} {totalBooking} {"  "}
                  </span>
                  car bookings so far.
                </p>
              ) : (
                <p className="text-xl text-gray-700 font-bold">
                  You currently have
                  <span className="text-red-700"> no completed bookings</span>.
                  Keep exploring and book a car!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* End Content Section */}
      <hr className="mt-10" />
      <div className="pb-12">
        <DashboardHeading title="My Completed Booking" />

        <div>
          {totalBooking > 0 ? (
            <Table
              columns={columns}
              dataSource={tableData || []}
              pagination={{
                pageSize: 5,
              }}
              className="overflow-x-auto"
            />
          ) : (
            <div className="text-center text-red-700 border max-w-4xl p-4 mx-auto mt-10 sm:mt-20 lg:mt-40 rounded-md shadow-lg">
              <p className="text-lg sm:text-xl font-bold">
                It looks like you haven't completed any bookings yet.
              </p>
              <p className="text-lg sm:text-xl font-bold">
                Start exploring our cars and make your first booking!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserViewProfile;
