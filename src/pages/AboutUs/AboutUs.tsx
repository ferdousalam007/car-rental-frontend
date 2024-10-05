
import PageBreadcamp from "@/component/PageBreadcamp/PageBreadcamp";
import SectionHeading from "@/component/SectionHeading/SectionHeading";
import TeamCard from "./TeamCard";
import img1 from "../../assets/team/team1.jpg"
import img2 from "../../assets/team/team2.jpg"
import img3 from "../../assets/team/team3.jpg"
import img4 from "../../assets/team/team4.jpg"
import ContactUs from "../ContactUs/ContactUs";
import CompanyHistory from "./CompanyHistory";
import OurFleet from "./OurFleet";
import ValuesAndCommitment from "./ValuesAndCommitment";
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

      <CompanyHistory/>
    

     <OurFleet/>
     <ValuesAndCommitment/>

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
      <ContactUs/>
    </div>
  );
};

export default AboutUs;
