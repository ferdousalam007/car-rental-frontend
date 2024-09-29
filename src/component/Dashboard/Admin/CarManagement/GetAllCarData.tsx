/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Space, Table, Tag } from "antd";
import { carApi } from "../../../../redux/features/Car/carApi";
import { toast } from "sonner";
import Loader from "../../../../shared/Loader/Loader";
import { TCar } from "../../../../type/global.type";

import UpdateCar from "./UpdateCar";
import DashboardHeading from "../../DashboardHeading/DashboardHeading";

const GetAllCarData = () => {
  const { data: allCars, isLoading: isFetching } = carApi.useGetAllCarsQuery(
    {}
  );
  const carData = allCars?.data;
  console.log(carData,"carData");
  const [deleteCar] = carApi.useDeleteCarMutation();

  const tableData = carData?.map((item: TCar) => ({
    key: item._id,
    isDelete: item?.isDelete,
    carImage: item?.carImgUrl ? item.carImgUrl[0] : null,
    carName: item?.name,
    status: item?.status,
    carType: item?.carType,
    rating: item?.rating,
    pricePerHour: item?.pricePerHour,
    description: item?.description,
    color: item?.color,
    maxSeats: item?.maxSeats,
    gearType: item?.gearType,
    fuelType: item?.fuelType,
    isElectric: item?.isElectric,
  }));

  // delete car
  const handleDeleteCar = async (id: string) => {
    try {
      await deleteCar(id).unwrap();
      toast.success("Car Deleted Successfully", { position: "top-right" });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "carImage",
      key: "carImage",
      render: (carImage: string) => (
        <img
          src={carImage}
          alt="Car"
          style={{
            width: 80,
            height: 80,
            borderRadius: "5%",
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      title: "Car Name",
      dataIndex: "carName",
      key: "carName",
    },
    {
      title: "Car Type",
      dataIndex: "carType",
      key: "carType",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag
        style={{color: "#000"}}
          className={`status ${
            status === "completed" ? "text-green-700" : "text-yeallow-700"
          }`}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (item: any) => (
        <Space size="middle">
          <Button onClick={() => handleDeleteCar(item.key)}>Delete</Button>
          <UpdateCar data={item} />
        </Space>
      ),
    },
  ];
  if (isFetching)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );

  return (
    <div className=" min-h-screen p-4">
      <DashboardHeading title="Manage All " highlightedText="Cars" />
      
      <Table
        columns={columns}
        dataSource={tableData || []}
        pagination={{
          pageSize: 5,
        }}
        className="overflow-x-auto"
      />
    </div>
  );
};

export default GetAllCarData;
