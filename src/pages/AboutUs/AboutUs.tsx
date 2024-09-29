import { FaCircleDollarToSlot,  } from "react-icons/fa6";
import { GiCarWheel } from "react-icons/gi";
import { MdAddCall } from "react-icons/md";
import PageBreadcamp from "@/component/PageBreadcamp/PageBreadcamp";
import SectionHeading from "@/component/SectionHeading/SectionHeading";
import TeamCard from "./TeamCard";
import img1 from "../../assets/team/team1.jpg"
import img2 from "../../assets/team/team2.jpg"
import img3 from "../../assets/team/team3.jpg"
import img4 from "../../assets/team/team4.jpg"
const teamMembers = [
  {
    imageUrl: img1,
    name: "Andrew Wills",
    position: "CEO",
    socialLinks: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      youtube: "https://youtube.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
    },
  },
  {
    imageUrl: img2,
    name: "Sarah Connor",
    position: "CTO",
    socialLinks: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      youtube: "https://youtube.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
    },
  },
  {
    imageUrl: img3,
    name: "John Doe",
    position: "Marketing Director",
    socialLinks: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      youtube: "https://youtube.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
    },
  },
  {
    imageUrl: img4,
    name: "Jane Doe",
    position: "Accountant",
    socialLinks: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      youtube: "https://youtube.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
    },
  },
];
const AboutUs = () => {
  return (
    <div>
      {/* Background Section */}
      <div className="">
        <PageBreadcamp title="About Us">
          <p className="text-white text-center px-4"></p>
        </PageBreadcamp>
      </div>

      {/* Services Section */}
      <div className=" container mx-auto p-6 md:p-12 grid gap-6 md:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white dark:bg-slate-900 border text-center p-6 md:p-10 shadow-md">
          <FaCircleDollarToSlot className="text-5xl mx-auto  mb-4" />
          <h2 className="text-lg md:text-xl font-semibold mb-2">
            Easy Financing
          </h2>
          <p className="">
            Our flexible financing options make it easy for you to get behind
            the wheel of your dream car. Enjoy low rates and hassle-free
            approval.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border text-center text-text-primary p-6 md:p-10 shadow-md">
          <GiCarWheel className="text-5xl  mx-auto mb-4" />
          <h2 className="text-lg md:text-xl font-semibold  mb-2">
            All Brands Cars
          </h2>
          <p className="">
            Whether you're looking for a luxury vehicle or a practical family
            car, we offer a wide range of brands and models to suit your needs.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border text-center p-6 md:p-10 shadow-md text-text-primary">
          <GiCarWheel className="text-5xl  mx-auto mb-4" />
          <h2 className="text-lg md:text-xl font-semibold mb-2">
            Quality Services
          </h2>
          <p className="">
            Our commitment to quality ensures that you receive the best service
            possible. From our experienced team to our rigorous standards, we
            prioritize your satisfaction.
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <span className="font-semibold px-4">
            FIND YOUR NEXT CAR WITH EASE
          </span>
          <h4 className="text-4xl font-bold mt-2 px-4">
            Welcome to <span className="text-red-700">Drive Lux</span>
          </h4>
          <div>
            <p className="mt-10 px-4">
              At Drive Lux, we are dedicated to providing you with a seamless
              car buying experience. Our extensive inventory, competitive
              pricing, and exceptional customer service set us apart in the
              industry.
            </p>
            <p className="mt-10 px-4">
              From the moment you step into our showroom or visit our website,
              you'll find a team ready to assist you in finding the perfect
              vehicle to match your lifestyle and preferences.
            </p>
          </div>
          <div className="flex justify-evenly items-center p-6 text-center">
            <div>
              <span>
                <img
                  src="https://i.ibb.co/12s8F7z/new-car.png"
                  className="w-12 h-12 mx-auto mb-4"
                  alt="New Car"
                />
              </span>
              <h2 className="font-semibold">Competitive Prices</h2>
            </div>
            <div>
              <span>
                <img
                  src="https://i.ibb.co/LP15fBH/car-insurance.png"
                  className="w-12 h-12 mx-auto mb-4"
                  alt="Car Insurance"
                />
              </span>
              <h2 className="font-semibold">Comprehensive Insurance</h2>
            </div>
            <div>
              <span>
                <img
                  src="https://i.ibb.co/chW0ZFS/worker.png"
                  className="w-12 h-12 mx-auto mb-4"
                  alt="Safety Checks"
                />
              </span>
              <h2 className="font-semibold">Thorough Safety Checks</h2>
            </div>
          </div>
        </div>
        <div>
          <img
            src="https://i.ibb.co/DkBNx10/Pngtree-black-super-car-14860193.png"
            alt="Car Display"
          />
        </div>
      </div>

      {/* Call to Action Section */}
      <div style={{ background: "#253241" }} className="p-6 md:p-10 mt-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-white text-2xl md:text-4xl font-semibold">
              Book Your Free Car Inspection
            </h2>
            <p className="text-white text-sm md:text-base">
              Schedule your complimentary inspection today and ensure your
              vehicle is in top condition. Our experts are here to provide you
              with the best service possible.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-center md:justify-end items-center space-y-4 md:space-y-0 md:space-x-8">
            <button className="bg-red-600 text-white px-4 py-2 hover:bg-red-700 transition">
              GET STARTED
            </button>
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm md:text-base">
                Call Us to Book Your Inspection
              </p>
              <span className="flex justify-center md:justify-start items-center text-white">
                <MdAddCall className="mr-2" />
                <p className="text-base">+1 (755) 302-8549</p>
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Meet our Team */}
      <div className="container mx-auto text-center mt-20 px-4">
        <SectionHeading title="Meet Our Team">
          <p>HELPS YOU TO FIND THE PERFECT CAR</p>
        </SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pt-12">
          {teamMembers.map((member, index) => (
            <TeamCard
              key={index}
              imageUrl={member.imageUrl}
              name={member.name}
              position={member.position}
              socialLinks={member.socialLinks}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
