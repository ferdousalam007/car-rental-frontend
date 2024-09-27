import SectionHeading from "@/component/SectionHeading/SectionHeading";

const WhyChoose = () => {
  const services = [
    {
      title: "Personalized Service",
      image: "https://i.ibb.co/JtHhFYQ/services.png",
    },
    {
      title: "24/7 Support",
      image: "https://i.ibb.co/XxR7yM7/support.png",
    },
    {
      title: "Best Price",
      image: "https://i.ibb.co/g6Dv298/best-price.jpg",
    },
    {
      title: "Trusted Service",
      image: "https://i.ibb.co/0Q7nYBq/company.png",
    },
  ];

  return (
    <div className="relative text-center py-12">
      <SectionHeading title=" Why We are Specialized! Why Choose">
        <p className="text-gray-600 dark:text-white max-w-2xl mx-auto text-center pb-16">
          We believe in delivering excellence through personalized services,
          available support, and a dedicated team. Our commitment to quality
          ensures that you receive the best possible experience every time.
        </p>
      </SectionHeading>
     
      <div className="relative cursor-pointer px-4 grid grid-cols-2 grid-rows-2 gap-6 w-full max-w-[1200px] h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg group"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-110"
            />
            <div className="absolute bottom-4 left-4 text-white text-lg font-bold shadow-lg">
              {service.title}
            </div>
          </div>
        ))}
        {/* Central Circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full shadow-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
