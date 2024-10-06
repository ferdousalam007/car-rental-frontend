/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, Space, Table } from "antd";
import { bookingApi } from "../../../../redux/features/Booking/bookingApi";
import { GetStatusTag, PaymentStatusTag } from "../../../../utils/getStatusTag";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { TCarBooking } from "../../../../type/global.type";
import Loader from "../../../../shared/Loader/Loader";
import Swal from "sweetalert2";
import type { ColumnsType } from "antd/es/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { feedBackApi } from "@/redux/features/FeedBack/feedBackApi";
import DashboardHeading from "../../DashboardHeading/DashboardHeading";
const reviewSchema = z.object({
  rating: z
    .number()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating must be at most 5" }),
  comment: z.string().min(1, { message: "Comment is required" }),
});

const AllBookings = () => {
  const [returnCarWithPayment] =
    bookingApi.useCarReturnAndWithPaymentMutation();
  const {
    data: myBookings,
    isFetching,
    isLoading,
    refetch,
  } = bookingApi.useGetMyBookingsQuery(undefined);
  const bookingData = myBookings?.data;
 
  const [deleteMyBooking, { isLoading: isDeleting }] =
    bookingApi.useDeleteBookingMutation();
  const tableData = bookingData?.map((item: TCarBooking) => ({
    key: item._id,
    name: item?.car?.name,
    image: item?.car?.carImgUrl,
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
    isRatings: item?.isRatings,
  }));

  const handleDeleteMyBooking: SubmitHandler<FieldValues> = async (
    bookingId
  ) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteMyBooking(bookingId).unwrap();
          Swal.fire("Deleted!", "Your booking has been deleted.", "success");
        } catch (error: any) {
          Swal.fire(
            "Error!",
            error.message || "There was an error deleting your booking.",
            "error"
          );
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your booking is safe :)", "error");
      }
    });
  };

  const handleReturnCarWithPayment: SubmitHandler<FieldValues> = async (
    bookingId
  ) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to complete the payment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, return it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await returnCarWithPayment(bookingId).unwrap();
          window.location.href = res.data.payment_url;
        } catch (error: any) {
          Swal.fire(
            "Error!",
            error.message || "There was an error returning your booking.",
            "error"
          );
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your booking is safe :)", "error");
      }
    });
  };

  const columns: ColumnsType<TCarBooking> = [
    {
      title: "Car Name",
      dataIndex: "name",
      key: "name",
      responsive: ["xs", "sm", "md", "lg"],
    },

    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (last: number) => `Tk ${last.toFixed(2)}/hour`,
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Pick-Up Date",
      dataIndex: "pickUpDate",
      key: "pickUpDate",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Pick-Up Time",
      dataIndex: "pickOfTime",
      key: "pickOfTime",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Drop-Off Date",
      dataIndex: "dropOffDate",
      key: "dropOffDate",
      render: (text: any, record: { status: string }) =>
        record.status === "completed" ? text : "N/A",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Drop-Off Time",
      dataIndex: "dropOfTime",
      key: "dropOfTime",
      render: (text: any, record: { status: string }) =>
        record.status === "completed" ? text : "N/A",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Car Booking Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => GetStatusTag(status),
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (paymentStatus: string) => PaymentStatusTag(paymentStatus),
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Total Cost",
      dataIndex: "totalCost",
      key: "totalCost",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Action",
      key: "action",
      render: (item: any) => {
        const onGoing = item.status === "ongoing";
        const paymentPaid = item.paymentStatus === "paid";
        const payment = item.status === "pending";
        const payStatus = item.paymentStatus==="pending";
      
     
        return (
          <Space size="middle">
            <UpdateBookingModel data={item} />
            <Button
              onClick={() => handleDeleteMyBooking(item.key)}
              disabled={onGoing || isDeleting || payStatus}
            >
              Delete
            </Button>
            <Button
              onClick={() => handleReturnCarWithPayment(item.key)}
              disabled={payment || onGoing || paymentPaid}
            >
              Payment
            </Button>
      
       
              <AddReviewModel
                bookingKey={item}
     
              />
        
       
          </Space>
        );
      },
   
    },
  ];

  return (
    <div className="p-4 md:p-8">
      <DashboardHeading title="All Bookings" highlightedText="List" />

      {isLoading || isFetching ? (
        <Loader />
      ) : (
        <div>
          <Button onClick={() => refetch()} className="my-5">
            Reload Table
          </Button>
          <Table
            columns={columns}
            dataSource={tableData || []}
            pagination={false}
            // scroll={{ x: 1000 }}
            scroll={{ x: "100%" }}
          />
        </div>
      )}
    </div>
  );
};

export default AllBookings;

const AddReviewModel = ({
  bookingKey,

}: {
  bookingKey: any;

}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [addFeedBack] = feedBackApi.useCreateFeedBackMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,

  } = useForm({
    resolver: zodResolver(reviewSchema),
  });
  const [loading, setLoading] = useState(false);
  const { refetch } = bookingApi.useGetMyBookingsQuery(undefined);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();
    formData.append("bookingId", bookingKey.key);
    formData.append("rating", data.rating.toString());
    formData.append("message", data.comment);


    setLoading(true);
    try {
      const response = await addFeedBack(formData).unwrap();
      Swal.fire({
        title: "Success!",
        text: "Feedback added successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
     handleOk(); // Close the modal
     refetch(); 
    
      console.log(response);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to add feedback.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error(error);
    } finally {
      setLoading(false);
      reset();
    }
  };
  const isCompleted = bookingKey.status === "completed";
  const isPayment = bookingKey.paymentStatus === "pending";
  const isRating = bookingKey.isRatings === false;
 

  return (
    <div>
      <Button
        type="primary"
        onClick={showModal}
        disabled={!isCompleted || isPayment || !isRating} // This logic should work correctly
      >
        Add Review
      </Button>
      <Modal
        title="Add Review"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <h2 className="text-2xl font-bold text-text-primary mb-4">
          Leave a Comment
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Your Ratings"
              className={`p-4 border rounded-md w-full bg-white shadow-lg ${
                errors.rating ? "border-red-500" : ""
              }`}
              {...register("rating", { valueAsNumber: true })}
            />
            {errors.rating && (
              <p className="text-red-500">{errors.rating?.message as string}</p>
            )}
          </div>
          <textarea
            placeholder="Enter Your Comment..."
            className={`p-4 border rounded-md w-full  shadow-lg mt-6 ${
              errors.comment ? "border-red-500" : ""
            }`}
            {...register("comment")}
          />
          {errors.comment && (
            <p className="text-red-500">{errors.comment.message as string}</p>
          )}

          <button
            type="submit"
            className={`bg-slate-500 text-white px-4 py-2 hover:bg-red-600 transition rounded-md mt-4 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Add Review"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

const UpdateBookingModel = ({ data }: any) => {
  const [updateBooking] = bookingApi.useUpdateBookingMutation();
  const { register, handleSubmit, reset } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (updateData) => {
    const bookingData = {
      identity: updateData?.identity,
      identityNo: updateData?.identityNo,
      drivingLicenseNo: updateData?.drivingLicenseNo,
    };
    try {
      await updateBooking({
        bookingId: data.key,
        bookingData,
      }).unwrap();

      Swal.fire(
        "Updated!",
        "Your booking has been updated successfully.",
        "success"
      );
      handleCancel();
      reset();
    } catch (error: any) {
      Swal.fire(
        "Error!",
        error.message || "There was an error updating your booking.",
        "error"
      );
    }
  };

  const onGoing = data.status === "ongoing";
  const isCompleted = data.status === "completed";

  return (
    <div>
      <Button onClick={showModal} disabled={onGoing || isCompleted}>
        Update
      </Button>
      <Modal
        title="Update Payment Method"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        className="w-full max-w-lg"
      >
        <div className="text-2xl font-bold text-text-primary mb-4">
          Your Booking Details
          <div className="flex gap-3 flex-wrap py-3">
            <img
              src={data?.image[0]}
              className="w-20 h-20 rounded-full"
              alt=""
            />
            <span className="flex flex-wrap flex-col text-text-primary text-base font-medium">
              <p>car name: {data?.name}</p>
              <p>price per hour: {data?.price}/hour</p>

              <p>your status: {data?.status}</p>
            </span>
          </div>
        </div>
        <hr />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mb-3">
            <label>NID/PASSPORT</label>
            <select
              className="mt-1  border text-text-primary text-sm rounded block w-full p-2.5 shadow-lg"
              {...register("identity")}
            >
              <option value="nid" selected={data.identity === "nid"}>
                NID
              </option>
              <option value="passport" selected={data.identity === "passport"}>
                Passport
              </option>
            </select>
          </div>
          <div className="flex flex-col mb-3">
            <label>ID Number</label>
            <input
              className="mt-1 bg-white border text-text-primary text-sm rounded block w-full p-2.5 shadow-lg"
              {...register("identityNo")}
              defaultValue={data.identityNo}
            />
          </div>
          <div className="flex flex-col mb-3">
            <label>Driving License Number</label>
            <input
              className="mt-1 bg-white border text-text-primary text-sm rounded block w-full p-2.5 shadow-lg"
              {...register("drivingLicenseNo")}
              defaultValue={data.drivingLicenseNo}
            />
          </div>
          <Button className="mt-4 bg-slate-500 text-white" htmlType="submit">
            Submit
          </Button>
        </form>
      </Modal>
    </div>
  );
};
