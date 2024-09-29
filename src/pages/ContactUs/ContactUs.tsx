;
import PageBreadcamp from "@/component/PageBreadcamp/PageBreadcamp";
import faqImg from "../../assets/bgtes.webp";
import { Mail, MapIcon, PhoneCall } from "lucide-react";
const ContactUs = () => {
  

  return (
    <div>
      <div className="">
        <PageBreadcamp title="Contact Us"></PageBreadcamp>
      </div>
      <div className="container mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        {/* <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
        
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
            <hr className="w-24 border-red-600 border-b-2 mb-4" />
            <p className="text-gray-700 mb-4">
              We'd love to hear from you! Whether you have a question, feedback,
              or just want to get in touch, feel free to reach out to us. Our
              team is here to help and will get back to you as soon as possible.
            </p>

         
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    className="shadow appearance-none border border-b-1 hover:border-b-red-600 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-blue-500"
                    type="text"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    className="shadow appearance-none border border-b-1 hover:border-b-red-600 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-blue-500"
                    type="email"
                    placeholder="example@example.com"
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    id="phone"
                    className="shadow appearance-none border border-b-1 hover:border-b-red-600 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-blue-500"
                    type="text"
                    placeholder="123-456-7890"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1" htmlFor="subject">
                    Subject
                  </label>
                  <input
                    id="subject"
                    className="shadow appearance-none border border-b-1 hover:border-b-red-600 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-blue-500"
                    type="text"
                    placeholder="Subject of your message"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-1" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  className="shadow appearance-none border border-b-1 hover:border-b-red-600 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-blue-500 resize-none"
                  placeholder="Write your message here..."
                  rows={5}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-red-500 text-white px-6 py-2 hover:bg-red-600 transition"
              >
                SUBMIT
              </button>
            </form>
          </div>

       
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Find Us Here</h2>
            <hr className="w-24 border-red-700 border-b-2 mb-4" />
            <div className="h-64 md:h-96 bg-gray-200 rounded-lg">
              <GoogleMapReact
                bootstrapURLKeys={{ key: "YOUR_GOOGLE_MAPS_API_KEY" }} 
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
              >
              
              </GoogleMapReact>
            </div>
          </div>
        </div> */}
        <div className="grid grid-cols-1 lg:grid-cols-2  pt-14 space-y-10 lg:space-y-0">
          <div>
            <div className="">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14709.910925608301!2d89.54032675!3d22.821808299999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1722003557283!5m2!1sen!2sbd"
                width="100%"
                height="500"
                style={{ border: 0 }}
                // allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
              ></iframe>
            </div>
          </div>
          <div
            className="shadow-custom rounded bg-slate-800"
            // style={{ backgroundImage: `url(${faqImg})` }}
          >
            <div className="rounded ">
              <div className="bg-slate-900 text-center py-5 rounded-t-lg">
                <h2 className="text-3xl font-semibold text-white">
                  Contact Info
                </h2>
              </div>
              <div>
                <div>
                  <div className="flex items-center gap-5 space-x-5 justify-center border-b py-5">
                    <MapIcon size={40} color="#ff8851" />
                    <div>
                      <p className="text-xl font-bold text-white">
                        Our Location
                      </p>
                      <small className="text-base text-white">
                        456, Lorem Street,
                        <br /> New York, 33454, NY
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {" "}
                <div>
                  <div className="flex items-center gap-5 space-x-5 justify-center border-b py-5">
                    <PhoneCall size={40} color="#ff8851" />
                    <div>
                      <p className="text-xl font-bold text-white">
                        Phone Number
                      </p>
                      <small className="text-base text-white">
                        +1 888-654-4329
                        <br /> +1 888-543-8765
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <div className="flex items-center gap-5 space-x-5 justify-center border-b py-5">
                    <Mail size={40} color="#ff8851" />
                    <div>
                      <p className="text-xl font-bold text-white">
                        Email Address
                      </p>
                      <small className="text-base text-white">
                        contact@example.com
                        <br /> admin@example.com
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {" "}
                <div>
                  <div className="flex items-center gap-5 space-x-5 justify-center py-5 ">
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ff8851"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-twitter"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ff8851"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-facebook"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ff8851"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-linkedin"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect width="4" height="12" x="2" y="9" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div style={{ background: "#F5F5F5" }} className="px-4 mt-20 py-10">
        <div className="container mx-auto grid md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center p-6 shadow-md bg-white rounded-lg text-center">
            <span className="flex items-center justify-center text-2xl bg-red-500 text-white w-12 h-12 rounded-full mb-4">
              <IoLocationOutline />
            </span>
            <span className="text-gray-700 font-semibold">
              123 Main Street, City, Country
            </span>
            <span className="text-gray-700 font-semibold">
              New York, NY 10011, USA
            </span>
          </div>

          <div className="flex flex-col items-center p-6 shadow-md bg-white rounded-lg text-center">
            <span className="flex items-center justify-center text-2xl bg-red-500 text-white w-12 h-12 rounded-full mb-4">
              <MdDialerSip />
            </span>
            <span className="text-gray-700 font-semibold">
              +1 (234) 567-890
            </span>
            <span className="text-gray-700 font-semibold">
              Mon-Sat 9:00am-5:00pm
            </span>
          </div>

          <div className="flex flex-col items-center p-6 shadow-md bg-white rounded-lg text-center">
            <span className="flex items-center justify-center text-2xl bg-red-500 text-white w-12 h-12 rounded-full mb-4">
              <IoMailUnreadOutline />
            </span>
            <span className="text-gray-700 font-semibold">
              info@example.com
            </span>
            <span className="text-gray-700 font-semibold">
              24 X 7 online support
            </span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ContactUs;
