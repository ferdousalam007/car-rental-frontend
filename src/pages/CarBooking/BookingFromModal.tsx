import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useAppSelector } from "../../redux/hooks";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Modal } from "antd";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { bookingApi } from "../../redux/features/Booking/bookingApi";
import { toast } from "sonner";
import { TCar } from "../../type/global.type";

const BookingFormModal = ({ car }: { car: TCar }) => {
  const [card, setCard] = useState(true);
  const [createBooking] = bookingApi.useAddBookMutation();
  const { user, token } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
    const location = useLocation();
  const { register, handleSubmit, reset } = useForm();

  const [open, setOpen] = useState(false);

  //submit data
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const bookingData = {
      identity: data?.identity,
      identityNo: data?.identityNo,
      drivingLicenseNo: data?.drivingLicenseNo,
      user: user?._id,
      car: car?._id,
    };
   
    try {
      const res = await createBooking(bookingData).unwrap();
      if (res.success) {
        toast.success("Car Booked Successfully", { position: "top-center" });
        reset();
        setOpen(false);
      } else {
        toast.error(res.message, { position: "top-center" });
      }
    } catch (error) {
      toast.error(
        (error as { message?: string })?.message || "Something went wrong"
      );
    }
  };
  //show model
  const showModel = () => {
    if (user && token) {
      setOpen(true);
    } else {
      navigate("/login",{ state: { from: location } });
    }
  };
  const handelCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={showModel}
        className="bg-slate-900 hover:bg-slate-700 text-white  py-2 px-2 rounded border-transparent border dark:border-slate-600 transition-all duration-300 ease-in-out text-sm"
      >
        Book Now
      </button>
      <Modal open={open} onCancel={handelCancel} footer={null}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" mx-auto ">
            <div className="bg-white dark:bg-slate-900 p-3 rounded-lg shadow-md">
              <div className="flex mb-6  ">
                <div className="text-text-primary items-center font-semibold py-2 px-4 border-b-4 border-yellow-500">
                  Booking Form
                </div>
              </div>

              {/* Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Return Date & Time */}

                {/* Quantity */}
                <div>
                  <label className="block font-semibold mb-2">
                    Select Nid / Passport
                  </label>
                  <select
                    className="w-full px-4 py-2 border rounded-md"
                    {...register("identity", { required: true })}
                  >
                    <option value="nid">Nid</option>
                    <option value="passport">Passport</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Passport No / Nid No
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="passport no"
                    {...register("identityNo", { required: true })}
                  />
                </div>

                {/* Driving License */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2">
                    Driving License
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="driving license"
                    {...register("drivingLicenseNo", { required: true })}
                  />
                </div>
                {/* payment section */}
                <section className="lg:col-span-2 flex flex-col">
                  <div className="h-full  ">
                    {/* Pay component */}
                    <div>
                      {/* Card body */}
                      <div className="relative max-w-lg mx-auto">
                        <div className="">
                          {/* Toggle */}
                          <div className="flex justify-center mb-6">
                            <div className="relative flex w-full p-1 dark:bg-gray-700 rounded">
                              <span
                                className="absolute inset-0 m-1 pointer-events-none"
                                aria-hidden="true"
                              >
                                <span
                                  className={`absolute inset-0 w-1/2 bg-white dark:bg-yellow-700 rounded border border-gray-200 shadow-sm transform transition duration-150 ease-in-out ${
                                    card ? "translate-x-0" : "translate-x-full"
                                  }`}
                                ></span>
                              </span>
                              <p
                                className="relative flex-1 md:text-sm md:p-2 md:font-medium transition duration-150 ease-in-out focus:outline-none focus-visible:ring-2 items-center justify-center flex cursor-pointer"
                                onClick={() => setCard(true)}
                              >
                                Pay With Card
                              </p>
                              <p
                                className="relative flex-1 md:text-sm font-medium md:p-2 text-center transition duration-150 ease-in-out focus:outline-none focus-visible:ring-2 items-center justify-center flex cursor-pointer hover:cursor-pointer"
                                onClick={() => setCard(false)}
                              >
                                Pay With Online Banking
                              </p>
                            </div>
                          </div>

                          {/* Card form */}
                          {card && (
                            <div className="space-y-4">
                              <div>
                                <label
                                  className="block font-semibold mb-2"
                                  htmlFor="card-nr"
                                >
                                  Card Number
                                  <span className="text-red-500">*</span>
                                </label>
                                <input
                                  id="card-nr"
                                  className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                                  type="text"
                                  {...register("cardNumber", {
                                    required: true,
                                  })}
                                  placeholder="1234 1234 1234 1234"
                                />
                              </div>
                              <div className="flex space-x-4">
                                <div className="flex-1">
                                  <label
                                    className="block font-semibold mb-2"
                                    htmlFor="card-expiry"
                                  >
                                    Expiry Date{" "}
                                    <span className="text-red-500">*</span>
                                  </label>
                                  <input
                                    id="card-expiry"
                                    className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                                    type="text"
                                    placeholder="MM/YY"
                                    {...register("expiryDate", {
                                      required: true,
                                    })}
                                  />
                                </div>
                                <div className="flex-1">
                                  <label
                                    className="block font-semibold mb-2"
                                    htmlFor="card-cvc"
                                  >
                                    CVC <span className="text-red-500">*</span>
                                  </label>
                                  <input
                                    id="card-cvc"
                                    className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                                    type="text"
                                    placeholder="CVC"
                                    {...register("cvc", {
                                      required: true,
                                    })}
                                  />
                                </div>
                              </div>
                              <div>
                                <label
                                  className="block font-semibold mb-2"
                                  htmlFor="card-name"
                                >
                                  Name on Card
                                  <span className="text-red-500">*</span>
                                </label>
                                <input
                                  id="card-name"
                                  className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                                  type="text"
                                  placeholder="John Doe"
                                  {...register("cardName", { required: true })}
                                />
                              </div>
                              <div>
                                <label
                                  className="block font-semibold mb-2"
                                  htmlFor="card-email"
                                >
                                  Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                  id="card-email"
                                  className="text-sm text-gray-800 bg-white mb-4 border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                                  type="email"
                                  {...register("email", {
                                    required: true,
                                  })}
                                  placeholder="john@company.com"
                                />
                              </div>
                            </div>
                          )}

                          {/* PayPal form */}
                          {!card && (
                            <div>
                              <div className="flex flex-col mb-4">
                                <label className="font-semibold mb-2">
                                  Mobile Banking(Bkash/Nogod/Rocket)
                                </label>
                                <input
                                  className="mt-1 bg-white border text-gray-900 text-sm rounded block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white shadow-lg"
                                  {...register("mobileBanking", {
                                    required: true,
                                  })}
                                  placeholder="banking no"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Terms and Conditions */}
                <div className="md:col-span-2 mt-4">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      {...register("terms", { required: true })}
                    />
                    <span className="ml-2">
                      I have read and agree to the website{" "}
                      <Link to="/terms-condition">
                        <b className="text-blue-500">Terms & Conditions</b>
                      </Link>
                    </span>
                  </label>
                </div>

                {/* Booking Button */}
                <div className="md:col-span-2 mt-4">
                  <button className="border-2 border-slate-600 px-4 w-full py-1 text-text-primary hover:bg-black hover:text-white transition mb-2 md:mb-0">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default BookingFormModal;
