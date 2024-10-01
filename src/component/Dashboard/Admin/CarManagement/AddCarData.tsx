/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDropzone, Accept } from "react-dropzone";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Select, { MultiValue,StylesConfig } from "react-select";
import { ImagePlus } from "lucide-react";
import {
  carFeatures,
  vehicleSpecifications,
} from "../../../../type/global.type";
import { useCallback, useEffect, useState } from "react";
import { carApi } from "../../../../redux/features/Car/carApi";
import Swal from "sweetalert2";
import DashboardHeading from "../../DashboardHeading/DashboardHeading";



type OptionType = {
  value: string;
  label: string;
};
const MAX_IMAGES = 5;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

// Image file validation function
const isValidImageFile = (file?: File) => {
  const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  return file && validTypes.includes(file.type) && file.size <= MAX_IMAGE_SIZE;
};

const carSchema = z.object({
  name: z.string().nonempty("Car Name is required"),


  // Use z.coerce.boolean() for proper boolean coercion
  isElectric: z.string().refine((val) => val === "true" || val === "false", {
    message: "Please select a valid option for isElectric",
  }),

  pricePerHour: z.coerce
    .number()
    .min(1, "Price Per Hour must be a non-negative number min value 1"),

  maxSeats: z.coerce.number().min(1, "Max Seats must be at least 1"),


  carImgUrl: z
    .array(z.instanceof(File))
    .min(1, "You must upload at least one image.") // At least 1 image required
    .max(MAX_IMAGES, `You can upload a maximum of ${MAX_IMAGES} images.`) // Maximum 5 images
    .refine((files) => files.every(isValidImageFile), {
      message: `Each image must be a valid file type (jpg, png, jpeg, webp) and under 5MB.`,
    }),
  color: z.string().nonempty("Color is required"),
  gearType: z.string().nonempty("Gear Type is required"),
  fuelType: z.string().nonempty("Fuel Type is required"),
  carType: z.string().nonempty("Please select a car type"),

  // carFeatures: z.array(z.string()).nonempty("Car Features are required"),
  carFeatures: z.array(z.string()).nonempty("Car Features are required"),

  vehicleSpecifications: z
    .array(z.string())
    .nonempty("Vehicle Specifications are required"),

  description: z.string().nonempty("Car Description is required"),
});

type CarFormData = z.infer<typeof carSchema>;
const AddCarData = () => {
  const [selectOptions, setSelectOptions] = useState<OptionType[]>([]);
  const [selectVehicleSpecifications, setSelectVehicleSpecifications] =
    useState<OptionType[]>([]);
  const [addCar] = carApi.useCreateCarMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setDarkMode(isDarkMode);
  }, []);

  const customStyles: StylesConfig<OptionType, true> = {
    control: (provided) => ({
      ...provided,
      backgroundColor: darkMode ? "#2d3748" : "#f0f0f0",
      color: darkMode ? "#e2e8f0" : "#2d3748",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: darkMode ? "#4a5568" : "#f8f9fa",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? darkMode
          ? "#2c5282"
          : "#d1e7dd"
        : state.isFocused
        ? darkMode
          ? "#2d3748"
          : "#e9ecef"
        : darkMode
        ? "#1a202c"
        : "#ffffff",
      color: darkMode ? "#cbd5e0" : "#212529",
    }),
  };
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CarFormData>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      isElectric: undefined,
      carFeatures: [],
      vehicleSpecifications: [],
      carImgUrl:[],
    },
  });
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const currentImages = watch("carImgUrl") || [];
      const newImages = [...currentImages, ...acceptedFiles].slice(0, 5); // Limit to 5 images
      setValue("carImgUrl", newImages);
      setImagePreviews(newImages.map((file) => URL.createObjectURL(file)));
    },
    [setValue, watch]
  );

  const removeImage = (index: number) => {
    const currentImages = watch("carImgUrl") || [];
    const updatedImages = currentImages.filter((_, i) => i !== index);
    setValue("carImgUrl", updatedImages);
    setImagePreviews(
      updatedImages.map((file: File) => URL.createObjectURL(file))
    );
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*":[],
    } as Accept,
    multiple: true,
    maxSize: MAX_IMAGE_SIZE,
  });

  const handleFeatureChange = (selectedOptions: MultiValue<OptionType>) => {
    setSelectOptions(selectedOptions as OptionType[]);
    const featureValues = selectedOptions.map((option) => option.value);

    if (featureValues.length > 0) {
      setValue("carFeatures", featureValues as [string, ...string[]]);
    } else {
      setValue("carFeatures", [] as unknown as [string, ...string[]]);
    }
  };

  
  const handleSpecificationChange = (
    selectedOptions: MultiValue<OptionType>
  ) => {
    setSelectVehicleSpecifications(selectedOptions as OptionType[]);
    const specificationValues = selectedOptions.map((option) => option.value);

    if (specificationValues.length > 0) {
      setValue(
        "vehicleSpecifications",
        specificationValues as [string, ...string[]]
      );
    } else {
      setValue("vehicleSpecifications", [] as unknown as [string, ...string[]]);
    }
  };
  // Handle onSubmit
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name",data.name);
    formData.append("description", data.description);
    formData.append("color", data.color);
    formData.append("fuelType", data.fuelType);
    formData.append("carType", data.carType);
    formData.append("gearType", data.gearType);
// formData.append("rating", Number(data.rating).toString());
formData.append("pricePerHour", Number(data.pricePerHour).toString());
formData.append("maxSeats", Number(data.maxSeats).toString());
    data.carImgUrl.forEach((file: any) => {
      formData.append("carImgUrl", file);
    });
    formData.append(
      "isElectric",
      data.isElectric === "true" ? "true" : "false"
    );
    formData.append("features", JSON.stringify(data.carFeatures as string[]));
    formData.append(
      "vehicleSpecification",
      JSON.stringify(data.vehicleSpecifications as string[])
    );
    console.log([...formData], "formDataaaa");
    try {
      const response = await addCar(formData).unwrap();
      Swal.fire({
        title: "Success!",
        text: "Car added successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
      console.log(response);
      reset();
      setSelectOptions([]); // Reset the select options
      setSelectVehicleSpecifications([]); 
      setImagePreviews([]);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to add car. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className=" min-h-screen p-4">
      <DashboardHeading title="Create New " highlightedText="Car" />
     
      <div className="container mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Car Name
              </label>
              <input
                type="text"
                {...register("name")}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
              {errors.name && (
                <p className="text-red-500 text-xs">
                  {String(errors.name.message)}
                </p>
              )}
            </div>

            {/* <div>
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-700"
              >
                Rating
              </label>
              <input
                type="number"
                {...register("rating")}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
              {errors.rating && (
                <p className="text-red-500 text-xs">
                  {String(errors.rating.message)}
                </p>
              )}
            </div> */}

            <div>
              <label
                htmlFor="isElectric"
                className="block text-sm font-medium text-gray-700"
              >
                Is Electric?
              </label>
              <select
                // {...register("isElectric")}
                {...register("isElectric")}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              >
                <option value="">Select...</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              {errors.isElectric && (
                <p className="text-red-500 text-xs">
                  {errors.isElectric.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="pricePerHour"
                className="block text-sm font-medium text-gray-700"
              >
                Price Per Hour
              </label>
              <input
                type="number"
                {...register("pricePerHour", { valueAsNumber: true })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
              {errors.pricePerHour && (
                <p className="text-red-500 text-xs">
                  {errors.pricePerHour.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="maxSeats"
                className="block text-sm font-medium text-gray-700"
              >
                Max Seats
              </label>
              <input
                type="number"
                {...register("maxSeats", { valueAsNumber: true })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
              {errors.maxSeats && (
                <p className="text-red-500 text-xs">
                  {String(errors.maxSeats.message)}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="color"
                className="block text-sm font-medium text-gray-700"
              >
                Car Color
              </label>
              <input
                type="text"
                {...register("color")}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
              {errors.color && (
                <p className="text-red-500 text-xs">
                  {String(errors.color.message)}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="gearType"
                className="block text-sm font-medium text-gray-700"
              >
                Gear Type
              </label>
              <input
                type="text"
                {...register("gearType")}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
              {errors.gearType && (
                <p className="text-red-500 text-xs">
                  {String(errors.gearType.message)}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="fuelType"
                className="block text-sm font-medium text-gray-700"
              >
                Fuel Type
              </label>
              <input
                type="text"
                {...register("fuelType")}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
              {errors.fuelType && (
                <p className="text-red-500 text-xs">
                  {String(errors.fuelType.message)}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="carType"
                className="block text-sm font-medium text-gray-700"
              >
                Car Type
              </label>
              <select
                {...register("carType")}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              >
                <option value="">Select car type</option>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Convertible">Convertible</option>
                <option value="Truck">Truck</option>
              </select>
              {errors.carType && (
                <p className="text-red-500 text-xs">
                  {String(errors.carType.message)}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="carFeatures"
                className="block text-sm font-medium text-gray-700"
              >
                Car Features
              </label>
              <Select
              styles={customStyles}
                options={carFeatures}
                value={selectOptions}
                isMulti={true}
                onChange={handleFeatureChange} // Set the onChange handler
              />
              {errors.carFeatures && (
                <p className="text-red-500 text-xs">
                  {String(errors.carFeatures.message)}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="vehicleSpecifications"
                className="block text-sm font-medium text-gray-700"
              >
                Vehicle Specifications
              </label>
              <Select
              styles={customStyles}
                options={vehicleSpecifications}
                value={selectVehicleSpecifications}
                isMulti={true }
                onChange={handleSpecificationChange}
              />
              {errors.vehicleSpecifications && (
                <p className="text-red-500 text-xs">
                  {String(errors.vehicleSpecifications.message)}
                </p>
              )}
            </div>
          </div>
          <div className="mt-6">
            <label
              htmlFor="carImgUrl"
              className="block text-sm font-medium text-gray-700"
            >
              Car Image
            </label>
            <div
              {...getRootProps()}
              className={`mt-1 block w-full py-4 px-3 border-2 border-dashed border-gray-300 rounded-md cursor-pointer 
              }`}
            >
              <input {...getInputProps()} />
              <p className="text-center flex align-middle justify-center gap-2">
                <ImagePlus /> Drag & drop some files here, or click to select
                files
              </p>
            </div>
            {errors.carImgUrl && (
              <p className="mt-2 text-red-600">{errors.carImgUrl.message}</p>
            )}
            <div className="mt-2 flex flex-wrap gap-2">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`Preview ${index}`}
                    className="w-[100px] h-[100px] object-cover object-center"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 mt-1 mr-1 bg-red-600 text-white rounded-full p-1 text-xs"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Car Description is required",
              })}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            {errors.description && (
              <p className="text-red-500 text-xs">
                {String(errors.description.message)}
              </p>
            )}
          </div>

          <div className="flex justify-center mt-10 col-span-full">
            <button
              type="submit"
              className={`bg-blue-500 text-white w-full font-bold py-2 px-4 rounded ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Add Car"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCarData;

