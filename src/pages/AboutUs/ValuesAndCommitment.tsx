import { FaLeaf,  FaLightbulb,FaBuildingUser  } from 'react-icons/fa6'; // Import the specific icons
import { SiAmazonsimpleemailservice } from "react-icons/si";

const ValuesAndCommitment = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold text-center mb-6 py-4">
        Values & Commitment
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="text-text-primary shadow-md border rounded-lg p-6 text-center">
          <SiAmazonsimpleemailservice className="text-text-primary text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Customer Service</h3>
          <p className="text-text-primary text-sm">
            We prioritize exceptional service, ensuring a seamless and enjoyable
            experience for every customer.
          </p>
        </div>
        <div className="text-text-primary shadow-md border rounded-lg p-6 text-center">
          <FaLeaf className="text-text-primary text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
          <p className=" text-sm">
            Committed to eco-friendly practices, we offer fuel-efficient
            vehicles to reduce our carbon footprint.
          </p>
        </div>
        <div className="text-text-primary shadow-md border rounded-lg p-6 text-center">
          <FaBuildingUser className="text-text-primary text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Integrity</h3>
          <p className=" text-sm">
            Integrity guides our operations, ensuring transparency and trust in
            all interactions.
          </p>
        </div>
        <div className="text-text-primary shadow-md border rounded-lg p-6 text-center">
          <FaLightbulb className="text-text-primary text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Innovation</h3>
          <p className=" text-sm">
            Driven by innovation, we embrace technology to enhance customer
            experiences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ValuesAndCommitment;