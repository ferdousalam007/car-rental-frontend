import bannerImg from "../../assets/pagebreadcamp.png"
const PageBreadcamp = ({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className="w-full h-[300px] md:h-[400px] bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      <h1 className= "text-3xl md:text-4xl font-bold text-center text-white px-3">{title}</h1>
      {children}
    </div>
  );
};
export default PageBreadcamp;

