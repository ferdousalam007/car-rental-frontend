/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useCallback, useEffect, useState } from "react";
// import "react-datepicker/dist/react-datepicker.css";
// import { FaCar, FaCogs, FaChair } from "react-icons/fa";
// import { carApi } from "../../redux/features/Car/carApi";
// import Loader from "../../shared/Loader/Loader";
// import { debounce } from "lodash";
// import { TCar } from "../../type/global.type";
// import { useSearchParams, useLocation } from "react-router-dom";
// import PageBreadcamp from "@/component/PageBreadcamp/PageBreadcamp";
// import CarCard from "../FeaturedCar/CarCard";

// type SearchParams = {
//   id?: string;
//   carType?: string;
//   features?: string;
//   seats?: string;
// };

// const CarBooking = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const location = useLocation();

//   const [carType, setCarType] = useState(searchParams.get("carType") || "");
//   const [features, setFeatures] = useState(searchParams.get("features") || "");
//   const [seats, setSeats] = useState(searchParams.get("seats") || "");
//   const [id, setId] = useState(searchParams.get("id") || "");

//   const [searchCriteria, setSearchCriteria] = useState<SearchParams>({
//     id,
//     carType,
//     features,
//     seats,
//   });

//   const { data: carSearch, isLoading } = carApi.useSearchCarsForBookingQuery(
//     searchCriteria,
//     {
//       skip:
//         !searchCriteria.id &&
//         !Object.values(searchCriteria).some((param) => param),
//     }
//   );

//   const { data: allCars, isLoading: isCarLoading } =
//     carApi.useGetAllCarsQuery(500);
//   const carData = allCars?.data || [];
//   const uniqueCarTypes = [...new Set(carData?.map((car: any) => car.carType))];
//   const uniqueFeatures = [
//     ...new Set(carData.flatMap((car: any) => car.features)),
//   ];
//   const uniqueMaxSeats = [
//     ...new Set(carData.map((car: any) => car.maxSeats)),
//   ].filter((seat): seat is number => typeof seat === "number");

//   const handleSearchCar = useCallback(
//     debounce((value: SearchParams) => {
//       setSearchCriteria(value);
//     }, 500),
//     [setSearchCriteria]
//   );

//   useEffect(() => {
//     if (id) {
//       handleSearchCar({ id });
//     } else {
//       const newParams: SearchParams = {
//         id,
//         carType,
//         features,
//         seats,
//       };
//       setSearchParams(newParams);
//       handleSearchCar(newParams);
//     }
//   }, [id, carType, features, seats, handleSearchCar, setSearchParams]);

//   const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const newValue = e.target.value;
//     setCarType(newValue);
//     setId("");
//     setSearchParams({ ...searchCriteria, carType: newValue, id: "" });
//   };

//   const handleSeatsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const newValue = e.target.value;
//     setSeats(newValue);
//     setId("");
//     setSearchParams({ ...searchCriteria, seats: newValue, id: "" });
//   };

//   const handleFeaturesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const newValue = e.target.value;
//     setFeatures(newValue);
//     setId("");
//     setSearchParams({ ...searchCriteria, features: newValue, id: "" });
//   };

//   const noCarsMessage =
//     !isLoading && carSearch?.data?.length === 0
//       ? "No cars available for the selected criteria."
//       : "";

//   useEffect(() => {
//     setId(searchParams.get("id") || "");
//     setCarType(searchParams.get("carType") || "");
//     setFeatures(searchParams.get("features") || "");
//     setSeats(searchParams.get("seats") || "");
//   }, [location.search, searchParams]);

//   return (
//     <div>
//       <div className="py-8">
//         <PageBreadcamp title="Car Booking"></PageBreadcamp>
//       </div>

//       <div className="-mt-24 max-w-7xl mx-auto bg-white dark:bg-slate-700 shadow-lg rounded-lg p-6 md:p-8">
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
//           <div className="lg:col-span-2 flex flex-col">
//             <label className="font-semibold mb-2">Select Car Type</label>
//             <div className="relative">
//               <select
//                 className="w-full pl-10 pr-4 py-2 dark:bg-slate-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
//                 value={carType}
//                 onChange={handleTypeChange}
//                 disabled={isCarLoading}
//               >
//                 {isCarLoading ? (
//                   <option>Loading...</option>
//                 ) : (
//                   <>
//                     <option value="">Select Car Type</option>
//                     {uniqueCarTypes?.map((type) => {
//                       if (typeof type === "string") {
//                         return (
//                           <option key={type} value={type}>
//                             {type}
//                           </option>
//                         );
//                       }
//                       return null;
//                     })}
//                   </>
//                 )}
//               </select>
//               <FaCar className="absolute left-3 top-3 text-gray-400" />
//             </div>
//           </div>

//           <div className="lg:col-span-2 flex flex-col">
//             <label className="font-semibold mb-2">Select Car Feature</label>
//             <div className="relative">
//               <select
//                 className="w-full pl-10 pr-4 py-2 dark:bg-slate-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
//                 value={features}
//                 onChange={handleFeaturesChange}
//                 disabled={isCarLoading}
//               >
//                 {isCarLoading ? (
//                   <option>Loading...</option>
//                 ) : (
//                   <>
//                     <option value="">Select Feature</option>
//                     {uniqueFeatures?.map((feature) => {
//                       if (typeof feature === "string") {
//                         return (
//                           <option key={feature} value={feature}>
//                             {feature}
//                           </option>
//                         );
//                       }
//                       return null;
//                     })}
//                   </>
//                 )}
//               </select>
//               <FaCogs className="absolute left-3 top-3 text-gray-400" />
//             </div>
//           </div>

//           <div className="lg:col-span-2 flex flex-col">
//             <label className="font-semibold mb-2">Select Car Seats</label>
//             <div className="relative">
//               <select
//                 className="w-full pl-10 pr-4 py-2 dark:bg-slate-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
//                 value={seats}
//                 onChange={handleSeatsChange}
//                 disabled={isCarLoading}
//               >
//                 {isCarLoading ? (
//                   <option>Loading...</option>
//                 ) : (
//                   <>
//                     <option value="">Select Max Seats</option>
//                     {uniqueMaxSeats?.map((seat: number) => (
//                       <option key={seat} value={seat}>
//                         {seat}
//                       </option>
//                     ))}
//                   </>
//                 )}
//               </select>
//               <FaChair className="absolute left-3 top-3 text-gray-400" />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto mt-20">
//         {isLoading ? (
//           <Loader />
//         ) : noCarsMessage ? (
//           <div className="text-center text-2xl font-semibold text-red-500 max-w-3xl mx-auto bg-slate-300 rounded-md p-4">
//             {noCarsMessage}
//           </div>
//         ) : id ? (
//           <CarCard car={carSearch?.data[0]} />
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             {carSearch?.data.map((car: TCar) => (
//               <CarCard key={car._id} car={car} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CarBooking;
import { useCallback, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { FaCar, FaCogs, FaChair } from "react-icons/fa";
import { carApi } from "../../redux/features/Car/carApi";
import Loader from "../../shared/Loader/Loader";
import { debounce } from "lodash";
import { TCar } from "../../type/global.type";
import { useSearchParams, useLocation } from "react-router-dom";
import PageBreadcamp from "@/component/PageBreadcamp/PageBreadcamp";
import CarCard from "../FeaturedCar/CarCard";

type SearchParams = {
  id?: string;
  carType?: string;
  features?: string;
  seats?: string;
};

const CarBooking = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const [searchCriteria, setSearchCriteria] = useState<SearchParams>({
    id: searchParams.get("id") || "",
    carType: searchParams.get("carType") || "",
    features: searchParams.get("features") || "",
    seats: searchParams.get("seats") || "",
  });

  // Only fetch data if at least one parameter has a non-empty value
  const shouldFetchData = Object.values(searchCriteria).some((param) => param);

  const { data: carSearch, isLoading } = carApi.useSearchCarsForBookingQuery(
    searchCriteria,
    {
      skip: !shouldFetchData, // Skip API call if all params are empty
    }
  );

  const { data: allCars, isLoading: isCarLoading } =
    carApi.useGetAllCarsQuery(500);
  const carData = allCars?.data || [];
  const uniqueCarTypes = [...new Set(carData?.map((car: any) => car.carType))];
  const uniqueFeatures = [
    ...new Set(carData.flatMap((car: any) => car.features)),
  ];
  const uniqueMaxSeats = [
    ...new Set(carData.map((car: any) => car.maxSeats)),
  ].filter((seat): seat is number => typeof seat === "number");
   const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
     const newValue = e.target.value;
     setSearchParams({ ...searchCriteria, carType: newValue, id: "" });
   };

   const handleSeatsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
     const newValue = e.target.value;
     setSearchParams({ ...searchCriteria, seats: newValue, id: "" });
   };

   const handleFeaturesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
     const newValue = e.target.value;
     setSearchParams({ ...searchCriteria, features: newValue, id: "" });
   };
  const handleSearchCar = useCallback(
    debounce((newSearchCriteria: SearchParams) => {
      setSearchCriteria(newSearchCriteria);
    }, 500),
    []
  );

 

  useEffect(() => {
    const id = searchParams.get("id") || "";
    const carType = searchParams.get("carType") || "";
    const features = searchParams.get("features") || "";
    const seats = searchParams.get("seats") || "";

    const newSearchCriteria = { id, carType, features, seats };

    setSearchCriteria(newSearchCriteria);

    if (Object.values(newSearchCriteria).some((param) => param)) {
      // Only trigger search if there are non-empty params
      handleSearchCar(newSearchCriteria);
    }
  }, [location.search, searchParams, handleSearchCar]);

  

  const noCarsMessage =
    !isLoading && carSearch?.data?.length === 0
      ? "No cars available for the selected criteria."
      : "";

  return (
    <div>
      <div className="py-8">
        <PageBreadcamp title="Car Booking"></PageBreadcamp>
      </div>

      <div className="-mt-24 max-w-7xl mx-auto bg-white dark:bg-slate-700 shadow-lg rounded-lg p-6 md:p-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2 flex flex-col">
            <label className="font-semibold mb-2">Select Car Type</label>
            <div className="relative">
              <select
                className="w-full pl-10 pr-4 py-2 dark:bg-slate-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                value={searchCriteria.carType}
                onChange={handleTypeChange}
                disabled={isCarLoading}
              >
                {isCarLoading ? (
                  <option>Loading...</option>
                ) : (
                  <>
                    <option value="">Select Car Type</option>
                    {uniqueCarTypes?.map((type) => (
                      <option key={type as string} value={type as string}>
                        {type as string}
                      </option>
                    ))}
                  </>
                )}
              </select>
              <FaCar className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col">
            <label className="font-semibold mb-2">Select Car Feature</label>
            <div className="relative">
              <select
                className="w-full pl-10 pr-4 py-2 dark:bg-slate-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                value={searchCriteria.features}
                onChange={handleFeaturesChange}
                disabled={isCarLoading}
              >
                {isCarLoading ? (
                  <option>Loading...</option>
                ) : (
                  <>
                    <option value="">Select Feature</option>
                    {uniqueFeatures?.map((feature) => (
                      <option key={feature as string} value={feature as string}>
                        {feature as string}
                      </option>
                    ))}
                  </>
                )}
              </select>
              <FaCogs className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col">
            <label className="font-semibold mb-2">Select Car Seats</label>
            <div className="relative">
              <select
                className="w-full pl-10 pr-4 py-2 dark:bg-slate-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                value={searchCriteria.seats}
                onChange={handleSeatsChange}
                disabled={isCarLoading}
              >
                {isCarLoading ? (
                  <option>Loading...</option>
                ) : (
                  <>
                    <option value="">Select Max Seats</option>
                    {uniqueMaxSeats?.map((seat: number) => (
                      <option key={seat} value={seat}>
                        {seat}
                      </option>
                    ))}
                  </>
                )}
              </select>
              <FaChair className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-20">
        {isLoading ? (
          <Loader />
        ) : noCarsMessage ? (
          <div className="text-center text-2xl font-semibold text-red-500 max-w-3xl mx-auto bg-slate-300 rounded-md p-4">
            {noCarsMessage}
          </div>
        ) : searchCriteria.id ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* <CarCard car={carSearch?.data[0]} /> */}{" "}
            {carSearch?.data
              .filter((car: TCar) => car._id === searchCriteria.id) // Filter by ID
              .map((car: TCar) => (
                <CarCard key={car._id} car={car} />
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {carSearch?.data.map((car: TCar) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarBooking;

