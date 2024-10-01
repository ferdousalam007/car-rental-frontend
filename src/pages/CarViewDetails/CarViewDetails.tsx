import { useParams } from "react-router-dom";
import { carApi } from "../../redux/features/Car/carApi";
import CarDetailsCard from "./CarDetailsCard";
import CarInformation from "./CarInformation";
import Loader from "../../shared/Loader/Loader";
import PageBreadcamp from "@/component/PageBreadcamp/PageBreadcamp";

const CarViewDetails = () => {
  const { id } = useParams();

  const { data: carSingleData, isFetching } = carApi.useGetSingleCarsQuery(
    id as string
  );
  const carDetails = carSingleData?.data;

  return (
    <div>
      <div className="">
        <PageBreadcamp title="Car Details">
          <p className="text-white text-center px-4"></p>
        </PageBreadcamp>
      </div>

      {isFetching ? (
        <div className="flex justify-center items-center ">
          <Loader />
        </div>
      ) : (
        <>
          <CarDetailsCard carDetails={carDetails} />

          <div className="container mx-auto">
            <CarInformation carDetails={carDetails} />
          </div>
        </>
      )}
    </div>
  );
};

export default CarViewDetails;
