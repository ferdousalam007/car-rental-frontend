
import { CiSquareCheck } from "react-icons/ci";
import "./CarInformation.css";
import CarTestimonial from "./CarTestimonial";

// Define the types for vehicle specifications and features
interface CarDetails {
  vehicleSpecification: string[];
  features: string[];
  description: string;
  _id: string;
}

interface CarInformationProps {
  carDetails: CarDetails;
}

const CarInformation: React.FC<CarInformationProps> = ({ carDetails }) => {
 
  return (
    <div className=" mx-auto">
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-6 ">
        <div className="w-full shadow-md border rounded-md p-6">
          <h2 className="text-2xl font-extrabold text-text-primary mb-6">
            Vehicle Specifications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {carDetails?.vehicleSpecification.map((spec, index) => (
              <div key={index} className="flex items-center">
                <p className="text-lg font-medium text-text-primary flex items-center gap-2">
                  <CiSquareCheck />
                  {spec}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full shadow-md border rounded-md p-6">
          <h2 className="text-2xl font-extrabold text-text-primary mb-6">
            Features & Options
          </h2>
          <div className="flex flex-wrap gap-4">
            {carDetails?.features.map((feature, index) => (
              <div key={index}>
                <p className="text-lg font-medium text-text-primary flex items-center gap-2">
                  <CiSquareCheck />
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full shadow-md border rounded-md p-6">
          <h2 className="text-2xl font-bold text-text-primary mb-6">
            Description
          </h2>
          <p className="text-lg font-medium text-text-primary">{carDetails?.description}</p>
        </div>
      </div>

      
      <CarTestimonial carId={carDetails?._id} />
    </div>
  );
};

export default CarInformation;
