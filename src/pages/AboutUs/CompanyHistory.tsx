import aboutImg from "../../assets/about.jpg";
const CompanyHistory = () => {
  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-text-primary py-14">
        <div>
          <h2 className="text-4xl font-bold">About Us</h2>

          <div className="company-history mb-4">
            <h2 className="mt-4 mb-4 text-2xl font-bold">
              A Brief History of Rent
              <span className="text-yellow-600 text-3xl pl-2">O</span>
            </h2>
            <p className="mb-4">
              Founded in 2015, RentO started as a small local car rental service
              with just 10 cars. Today, we've grown into a nationwide network,
              serving thousands of customers daily. Our success stems from our
              commitment to exceptional service, diverse vehicle options, and
              innovative booking technology.
            </p>
            <p>
              At RentO, we're not just renting cars; we're empowering journeys
              and creating memories. Whether for vacation, business, or
              temporary needs, we provide the perfect ride for every occasion,
              making car rentals more accessible, affordable, and convenient for
              all.
            </p>
          </div>
          <div className="mission-statement">
            <h2 className="text-2xl font-bold mb-4">Our Mission Statement</h2>
            <p>
              To provide our customers with seamless, reliable, and affordable
              car rental solutions, enhancing their travel experiences through
              exceptional service and a diverse fleet of well-maintained
              vehicles.
            </p>
          </div>
        </div>
        <div>
          <img src={aboutImg} alt="" />
        </div>
      </div>
    </div>
  );
};
export default CompanyHistory;
