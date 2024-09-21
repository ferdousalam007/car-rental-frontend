import { IoLocationOutline, IoMailUnreadOutline } from "react-icons/io5";
import { MdDialerSip } from "react-icons/md";
import GoogleMapReact from "google-map-react";

const ContactUs = () => {
  const defaultProps = {
    center: {
      lat: 40.712776, // Replace with your desired latitude
      lng: -74.005974, // Replace with your desired longitude
    },
    zoom: 11,
  };

  return (
    <div>
      <div className="relative h-[300px] md:h-[500px] w-full">
        <div
          style={{
            backgroundImage: "url('https://i.ibb.co/vjFfCzg/contactus.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70"></div>
        </div>
      </div>
      <div className="container mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
          {/* Contact Information */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
            <hr className="w-24 border-red-600 border-b-2 mb-4" />
            <p className="text-gray-700 mb-4">
              We'd love to hear from you! Whether you have a question, feedback,
              or just want to get in touch, feel free to reach out to us. Our
              team is here to help and will get back to you as soon as possible.
            </p>

            {/* Input Information */}
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

          {/* Map Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Find Us Here</h2>
            <hr className="w-24 border-red-700 border-b-2 mb-4" />
            <div className="h-64 md:h-96 bg-gray-200 rounded-lg">
              <GoogleMapReact
                bootstrapURLKeys={{ key: "YOUR_GOOGLE_MAPS_API_KEY" }} // Add your API key here
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
              >
                {/* Add any markers or custom components here if needed */}
              </GoogleMapReact>
            </div>
          </div>
        </div>
      </div>
      <div style={{ background: "#F5F5F5" }} className="px-4 mt-20 py-10">
        <div className="container mx-auto grid md:grid-cols-3 gap-6">
          {/* Location */}
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
          {/* Phone */}
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
          {/* Email */}
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
      </div>
    </div>
  );
};

export default ContactUs;
