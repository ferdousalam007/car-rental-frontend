import SectionHeading from "@/component/SectionHeading/SectionHeading";
import img1 from "../../assets/PersonalizedService.png";
import img2 from "../../assets/Support24.png";
import img3 from "../../assets/bestprice.png";
import img4 from "../../assets/TrustedService.png";

const WhyChoose = () => {
  const whyChooseData = [
    {
      id: 1,
      title: "Personalized Service",
      description:
        "We tailor our services to meet your individual needs, ensuring a smooth and enjoyable rental experience every time.",
      image: img1, // Replace with actual image path
    },
    {
      id: 2,
      title: "24/7 Support",
      description:
        "Our dedicated customer support team is available around the clock to assist you with any questions or concerns.",
      image: img2, // Replace with actual image path
    },
    {
      id: 3,
      title: "Best Price",
      description:
        "We offer competitive rates without compromising on quality, giving you the best value for your money.",
      image: img3, // Replace with actual image path
    },
    {
      id: 4,
      title: "Trusted Service",
      description:
        "With years of experience in the industry, we have built a reputation for providing reliable and trustworthy service.",
      image: img4, // Replace with actual image path
    },
  ];

  return (
    <div className="text-center py-12">
      <SectionHeading title=" Why We are Specialized! Why Choose">
        <p className="text-gray-600 dark:text-white max-w-2xl mx-auto text-center pb-16">
          We believe in delivering excellence through personalized services,
          available support, and a dedicated team. Our commitment to quality
          ensures that you receive the best possible experience every time.
        </p>
      </SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-11 pt-12 pb-10 dark:bg-slate-900 rounded-lg shadow-custom px-4">
        {whyChooseData.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 shadow-lg border-2 border-gray-300 rounded-lg relative dark:bg-slate-700"
          >
            <div className="w-full h-[325px]">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center rounded-lg"
              />
            </div>
            <div className="p-5 space-y-3 flex flex-col justify-center text-left">
              <h4 className="font-bold text-2xl text-text-primary">
                {item.title}
              </h4>
              <p className="text-base text-text-primary">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChoose;
