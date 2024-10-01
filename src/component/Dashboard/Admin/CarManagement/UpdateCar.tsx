/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal } from "antd";
import { useState, useEffect, useCallback } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { MultiValue, StylesConfig } from "react-select";
import Select from "react-select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone, Accept } from "react-dropzone";
import {
  carFeatures,
  vehicleSpecifications,
} from "../../../../type/global.type";
import { carApi } from "../../../../redux/features/Car/carApi";
import { toast } from "sonner";

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

// Zod schema for validation
const schema = z.object({
  carName: z.string().min(1, "Car Name is required"),
  // rating: z
  //   .number({ invalid_type_error: "Rating must be a number" })
  //   .min(0)
  //   .max(5),
  isElectric: z.any(),
  pricePerHour: z
    .number({ invalid_type_error: "Price must be a number" })
    .positive(),
  maxSeats: z
    .number({ invalid_type_error: "Max Seats must be a number" })
    .positive(),
  color: z.string().min(1, "Car color is required"),
  gearType: z.string().min(1, "Gear Type is required"),
  fuelType: z.string().min(1, "Fuel Type is required"),
  carType: z.string().min(1, "Car Type is required"),
  description: z.string().min(1, "Description is required"),
  carImgUrl: z
    .array(z.instanceof(File))
    .nullable()
    .refine(
      (files) =>
        files === null || (files.length > 0 && files.length <= MAX_IMAGES),
      {
        message: `Please upload between 1 and ${MAX_IMAGES} images.`,
      }
    )
    .refine((files) => files === null || files.every(isValidImageFile), {
      message:
        "Each image must be a valid file type (jpg, png, jpeg, webp) and under 5MB.",
    }),
  carFeatures: z.array(z.string()).optional(),
  vehicleSpecifications: z.array(z.string()).optional(),
});

type CarData = z.infer<typeof schema>;




const UpdateCar = ({ data }: { data: CarData }) => {
  const [selectOptions, setSelectOptions] = useState<OptionType[]>([]);
  const [selectVehicleSpecifications, setSelectVehicleSpecifications] =
    useState<OptionType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    backgroundColor: darkMode ? "#121212" : "#f0f0f0",
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const keyData: any = data;
  const keyId: string = keyData.key;
  // const isElectric =data.isElectric.toString() === "true" ? "true" : "false";
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CarData>({
    resolver: zodResolver(schema),
    defaultValues: {
      carName: data?.carName || "",
      // rating: data?.rating,
      isElectric: data.isElectric ? "true" : "false",
      pricePerHour: Number(data?.pricePerHour) || 0,
      maxSeats: data?.maxSeats || 0,
      color: data?.color || "",
      gearType: data?.gearType || "",
      fuelType: data?.fuelType || "",
      carType: data?.carType || "",
      description: data?.description || "",
      carImgUrl: null,
      carFeatures: data?.carFeatures || [],
      vehicleSpecifications: data?.vehicleSpecifications || [],
    },
  });
  // const watchImages = watch("carImgUrl");

  const [updateCar] = carApi.useUpdateCarMutation();

  useEffect(() => {
    reset({
      carName: data?.carName || "",
      // rating: data?.rating,
      isElectric: data?.isElectric ,
      pricePerHour: Number(data?.pricePerHour) || 0,
      maxSeats: data?.maxSeats || 0,
      color: data?.color || "",
      gearType: data?.gearType || "",
      fuelType: data?.fuelType || "",
      carType: data?.carType || "",
      description: data?.description || "",
      carImgUrl: null,
      carFeatures: data?.carFeatures || [],
      vehicleSpecifications: data?.vehicleSpecifications || [],
    });
  }, [data, reset]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  // Handle change for car features
  const handleFeatureChange = (selectedOptions: MultiValue<OptionType>) => {
    setSelectOptions(selectedOptions as OptionType[]);
    setValue(
      "carFeatures",
      selectedOptions.map((option) => option.value)
    );
  };

  // Handle change for vehicle specifications
  const handleSpecificationChange = (
    selectedOptions: MultiValue<OptionType>
  ) => {
    setSelectVehicleSpecifications(selectedOptions as OptionType[]);
    setValue(
      "vehicleSpecifications",
      selectedOptions.map((option) => option.value)
    );
  };

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
      "image/*": [],
    } as Accept,
    multiple: true,
    maxSize: MAX_IMAGE_SIZE,
  });

  const onSubmit: SubmitHandler<FieldValues> = async (cdata) => {
    setIsLoading(true);

    // Prepare FormData to handle file uploads and other fields
    const formData = new FormData();
    formData.append("name", cdata.carName);
    // formData.append("rating", cdata.rating);
       formData.append(
         "isElectric",
         cdata.isElectric === "true" ? "true" : "false"
       );
    formData.append("pricePerHour", cdata.pricePerHour);
    formData.append("color", cdata.color);
    formData.append("gearType", cdata.gearType);
    formData.append("fuelType", cdata.fuelType);
    formData.append("carType", cdata.carType);
    formData.append("description", cdata.description);

    if (cdata.carFeatures && cdata.carFeatures.length > 0) {
      formData.append("carFeatures", JSON.stringify(cdata.carFeatures));
    }

    if (
      cdata.vehicleSpecifications &&
      Object.keys(cdata.vehicleSpecifications).length > 0
    ) {
      formData.append(
        "vehicleSpecifications",
        JSON.stringify(cdata.vehicleSpecifications)
      );
    }

    // Append each image file
    cdata.carImgUrl?.forEach((file: File) => {
      formData.append("carImgUrl", file);
    });

    //  console.log(cdata,"cdata?.key");
    try {
      await updateCar({
        id: keyId,
        carData: formData,
      }).unwrap();

      toast.success("Car Updated Successfully", { position: "top-center" });
      reset({
        carImgUrl: null,
      });
      setIsModalOpen(false);
      setImagePreviews([]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update car", { position: "top-center" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={showModal}>Update Car</Button>
      <Modal
        title="Update Car"
        open={isModalOpen}
        onOk={handleSubmit(onSubmit)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Car Name
              </label>
              <input
                type="text"
                defaultValue={data?.carName}
                {...register("carName")}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
              {errors.carName && (
                <p className="text-red-600">{errors.carName.message}</p>
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
                defaultValue={data?.rating}
                type="number"
                {...register("rating", { valueAsNumber: true })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
              {errors.rating && (
                <p className="text-red-600">{errors.rating.message}</p>
              )}
            </div> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="isElectric"
                className="block text-sm font-medium text-gray-700"
              >
                Is Electric?
              </label>
              <select
                {...register("isElectric")}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              >
                <option value="">Select...</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              {errors.isElectric && (
                <p className="text-red-600">
                  {typeof errors.isElectric?.message === "string"
                    ? errors.isElectric.message
                    : ""}
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
                defaultValue={data?.pricePerHour}
                type="number"
                {...register("pricePerHour", { valueAsNumber: true })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
              {errors.pricePerHour && (
                <p className="text-red-600">{errors.pricePerHour.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            {/* Image Upload Section */}
            <div
              {...getRootProps()}
              className="border-dashed border-2 border-gray-300 p-4 text-center"
            >
              <input {...getInputProps()} />
              <p className="text-gray-600">
                Drag and drop images here, or click to select files
              </p>
              <p className="text-gray-500">
                Max {MAX_IMAGES} images, each under 5MB
              </p>
              <p className="text-gray-500">
                Allowed formats: .jpg, .jpeg, .png, .webp
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`Preview ${index}`}
                    className="w-[100px] h-[100px] object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <div>
              <label
                htmlFor="maxSeats"
                className="block text-sm font-medium text-gray-700"
              >
                Max Seats
              </label>
              <input
                defaultValue={data?.maxSeats}
                type="number"
                {...register("maxSeats", { valueAsNumber: true })}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
              {errors.maxSeats && (
                <p className="text-red-600">{errors.maxSeats.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="color"
                className="block text-sm font-medium text-gray-700"
              >
                Car Color
              </label>
              <input
                defaultValue={data?.color}
                type="text"
                {...register("color")}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
              {errors.color && (
                <p className="text-red-600">{errors.color.message}</p>
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
                defaultValue={data?.gearType}
                type="text"
                {...register("gearType")}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
              {errors.gearType && (
                <p className="text-red-600">{errors.gearType.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="fuelType"
                className="block text-sm font-medium text-gray-700"
              >
                Fuel Type
              </label>
              <input
                defaultValue={data?.fuelType}
                type="text"
                {...register("fuelType")}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
              {errors.fuelType && (
                <p className="text-red-600">{errors.fuelType.message}</p>
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
                defaultValue={data?.carType}
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
                <p className="text-red-600">{errors.carType.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                onChange={handleFeatureChange}
                className="mt-1 "
              />
              {errors.carFeatures && (
                <p className="text-red-600">{errors.carFeatures.message}</p>
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
                isMulti={true}
                onChange={handleSpecificationChange}
                className="mt-1"
              />
              {errors.vehicleSpecifications && (
                <p className="text-red-600">
                  {errors.vehicleSpecifications.message}
                </p>
              )}
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
              defaultValue={data?.description}
              {...register("description")}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            {errors.description && (
              <p className="text-red-600">{errors.description.message}</p>
            )}
          </div>

          <button
            type="submit"
            className={`bg-blue-500 text-white w-full font-bold py-2 px-4 rounded ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Car"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default UpdateCar;
