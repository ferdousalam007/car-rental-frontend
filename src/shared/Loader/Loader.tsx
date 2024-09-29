import { ScaleLoader} from "react-spinners";

const Loader = () => {
  return (
    <div
      className="
      h-[70vh]
      flex 
      flex-col 
      justify-center 
      items-center 
    "
    >
        <ScaleLoader height={35} width={4} color="#d6e011" />
    </div>
  );
};

export default Loader;
