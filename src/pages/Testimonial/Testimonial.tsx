/* eslint-disable @typescript-eslint/no-explicit-any */
import SectionHeading from "@/component/SectionHeading/SectionHeading";
import { feedBackApi } from "../../redux/features/FeedBack/feedBackApi";

const Testimonial = () => {
  const { data: getAllComment } = feedBackApi.useGetMyFeedBacksQuery(undefined);
console.log(getAllComment ,"getAllComment");
  const comments = getAllComment?.data;

  return (
    <div className="bg-[#F7F7F7] dark:bg-[#26324d] py-12 container">
      <SectionHeading title="Customer Experiences">
        <p className="text-gray-600 dark:text-white max-w-2xl mx-auto text-center pb-16">
          Hear what our satisfied customers have to say about their journey with
          RentO.
        </p>
      </SectionHeading>
      <div className="mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {comments
            ?.slice(-4)
            .reverse()
            .map((testimonial: any, index: number) => (
              <div
                key={index}
                className="p-6 bg-white rounded-md shadow-lg flex flex-col items-center  text-center md:text-left  border bg-slate-100 dark:bg-slate-900 border-gray-300 dark:border-slate-700"
              >
                <img
                  src={testimonial.userData.image}
                  alt={testimonial.name}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-lg mb-4 "
                />
                <div className="mt-2  w-full">
                  <h3 className="text-lg md:text-xl font-semibold mb-1 text-text-primary text-center">
                    {testimonial.name}
                    {testimonial.userData.name}
                  </h3>
                  {/* <p className="text-gray-500 mb-3">customer</p> */}
                  <div className="flex justify-center mb-2">
                    {Array(testimonial.rating)
                      .fill(2)
                      .map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          className="w-5 h-5 text-orange-500"
                        >
                          <path d="M12 17.27l5.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73-1.64 7.03L12 17.27z" />
                        </svg>
                      ))}
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 text-sm md:text-base text-justify mb-6">
                    {testimonial.message}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
