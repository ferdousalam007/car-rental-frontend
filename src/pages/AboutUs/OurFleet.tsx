import toyota from "../../assets/Toyota_Corolla.jpg";
import honda from "../../assets/Honda_Civic.jpg";
import bmw from "../../assets/BMW.jpg";
import Mercedes from "../../assets/Mercedes.jpg";
import Ford from "../../assets/Ford_Explorer.jpg";
import Jeep from "../../assets/Jeep-Grand.jpg";
import Mazda from "../../assets/Mazda_Roadster.jpg";
import Mustang from "../../assets/Shelby_Mustang.jpg";
const carFleet = [
  {
    type: "Economy",
    description:
      "Affordable and fuel-efficient cars for budget-conscious travelers.",
    models: [
      {
        name: "Toyota Corolla",
        image: toyota, // Replace with actual URL
        features: [
          "Air Conditioning",
          "Automatic Transmission",
          "Bluetooth Connectivity",
        ],
      },
      {
        name: "Honda Civic",
        image: honda, // Replace with actual URL
        features: [
          "Air Conditioning",
          "Automatic Transmission",
          "Cruise Control",
        ],
      },
    ],
  },
  {
    type: "Luxury",
    description: "High-end vehicles for a premium driving experience.",
    models: [
      {
        name: "BMW 5 Series",
        image: bmw, // Replace with actual URL
        features: ["Leather Seats", "GPS Navigation", "Premium Sound System"],
      },
      {
        name: "Mercedes-Benz E-Class",
        image: Mercedes, // Replace with actual URL
        features: ["Sunroof", "Heated Seats", "Advanced Safety Features"],
      },
    ],
  },
  {
    type: "SUV",
    description:
      "Spacious and versatile vehicles for family trips and off-road adventures.",
    models: [
      {
        name: "Ford Explorer",
        image: Ford, // Replace with actual URL
        features: ["4WD", "Third Row Seating", "Tow Package"],
      },
      {
        name: "Jeep Grand Cherokee",
        image: Jeep, // Replace with actual URL
        features: [
          "Off-Road Capability",
          "Panoramic Sunroof",
          "Adaptive Cruise Control",
        ],
      },
    ],
  },
  {
    type: "Convertible",
    description: "Stylish convertibles for enjoying the open road.",
    models: [
      {
        name: "Mazda MX-5 Miata",
        image: Mazda, // Replace with actual URL
        features: ["Manual Transmission", "Bluetooth", "Sport Suspension"],
      },
      {
        name: "Ford Mustang Convertible",
        image: Mustang, // Replace with actual URL
        features: ["V8 Engine", "Leather Seats", "Premium Audio"],
      },
    ],
  },
];
  
  const OurFleet = () => {
    return (
      <div className="container">
        <div>
          <h2 className="text-4xl font-bold text-text-primary">Our Fleet</h2>
          {carFleet.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mt-8">
              <h3 className="text-2xl font-semibold text-text-primary">
                {category.type}
              </h3>
              <p className="text-sm  text-text-primary">
                {category.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {category.models.map((model, modelIndex) => (
                  <div
                    key={modelIndex}
                    className="grid grid-cols-1 sm:grid-cols-2 border shadow-md rounded-lg p-4"
                  >
                    <img
                      className="rounded-lg  w-full"
                      src={model?.image}
                      alt={`Image of ${model.name}`}
                    />
                    <div className="ml-4">
                      <h2 className="text-lg font-bold text-text-primary">
                        {model.name}
                      </h2>
                      <ul className="text-sm text-text-primary mt-2">
                        {model.features.map((feature, featureIndex) => (
                          <li key={featureIndex}>- {feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default OurFleet;