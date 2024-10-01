/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { authApi } from "../../../../redux/features/Auth/authApi";
import { toast } from "sonner";
import { RxCross2 } from "react-icons/rx";
import { FaEdit } from "react-icons/fa";
import { userApi } from "../../../../redux/features/user/userApi";
import DashboardHeading from "../../DashboardHeading/DashboardHeading";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone, Accept } from "react-dropzone";
const MAX_IMAGES = 1;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

// Image file validation function
const isValidImageFile = (file?: File) => {
  const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  return file && validTypes.includes(file.type) && file.size <= MAX_IMAGE_SIZE;
};
const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Phone number is required").max(11, "Invalid phone number"),
  address: z.string().optional(),
  image: z
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
});
type ProfileSchema = z.infer<typeof profileSchema>;

const Profile = () => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const { data: user } = authApi.useGetMeQuery(undefined);
  const [edit, setEdit] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateUser] = userApi.useUpdateUserMutation();
  const handleEditIcon = () => {
    setEdit(!edit);
  };
  // console.log(user);
  const { register,
    setValue,
     handleSubmit,
     watch,
     reset,
     formState: { errors },
     } = useForm<ProfileSchema>({
      resolver: zodResolver(profileSchema),
      defaultValues: {
        name: "",
        email: "",
        phone: "",
        address: "",
        image: null,
      },
     });
     // Effect to update the form when user data is loaded
  useEffect(() => {
    if (user && user.data) {
      reset({
        name: user.data.name || "",
        email: user.data.email || "",
        phone: user.data.phone || "",
        address: user.data.address || "",
        image: null,
      });
    }
  }, [user, reset]);
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const currentImages = watch("image") || [];
      const newImages = [...currentImages, ...acceptedFiles].slice(0, 1); // Limit to 5 images
      setValue("image", newImages);
      setImagePreviews(newImages.map((file) => URL.createObjectURL(file)));
    },
    [setValue, watch]
  );

  const removeImage = (index: number) => {
    const currentImages = watch("image") || [];
    const updatedImages = currentImages.filter((_, i) => i !== index);
    setValue("image", updatedImages);
    setImagePreviews(
      updatedImages.map((file: File) => URL.createObjectURL(file))
    );
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    disabled: !edit,
    accept: {
      "image/*": [],
    } as Accept,
    multiple: true,
    maxSize: MAX_IMAGE_SIZE,
  });
 
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data, "data");
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("address", data.address || "");
    if (data.image && data.image.length > 0) {
      data.image.forEach((file:any) => formData.append("image", file));
    }
 
    console.log([...formData], "formDataaaa");
    // const modifiedUserData = {
    //   ...rest,
    //   image: userImage,
    // };
setIsUpdating(true);
    try {
      // return
      const res = await updateUser(formData);
      if (res.data.success) {
        toast.success("Profile updated successfully");
        setEdit(!edit);
        setImagePreviews([]);
      }
    } catch (error) {
      if (error) {
        toast.error("Something went wrong");
      }
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div>
      <DashboardHeading title="Update" highlightedText="Profile" />
      <div className=" mb-5 pb-5 border-b-2 flex items-center justify-center ">
        <div onClick={handleEditIcon} className="cursor-pointer">
          {edit ? (
            <RxCross2 className="w-[50px] h-[50px] text-accent text-red-500 bg-red-100 p-1 rounded-full"></RxCross2>
          ) : (
            <FaEdit className="w-[50px] h-[50px] text-accent text-yellow-500"></FaEdit>
          )}
        </div>
      </div>

      <div className="p-6 max-w-6xl mx-auto rounded shadow-md dark:bg-slate-800">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="w-full md:w-1/2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-lg font-semibold">Name</span>
                </div>
                <input
                  {...register("name")}
                  type="text"
                  className="input w-full  focus:outline-none text-lg border border-gray-700  rounded px-4 py-2"
                  defaultValue={user?.data?.name}
                  disabled={edit ? false : true}
                />
                 {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </label>
            </div>
            <div className="w-full md:w-1/2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-lg font-semibold">
                    Email
                  </span>
                </div>
                <input
                  type="text"
                  defaultValue={user?.data?.email}
                  className="input w-full focus:outline-none text-lg border border-gray-700 rounded px-4 py-2 hover:cursor-not-allowed"
                  readOnly
                />
              </label>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-5 mt-4">
            <div className="w-full md:w-1/2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-lg font-semibold">
                    Phone Number
                  </span>
                </div>
                <input
                  type="text"
                  defaultValue={user?.data?.phone}
                  className="input w-full focus:outline-none text-lg border border-gray-700 rounded px-4 py-2 "
                  disabled={edit ? false : true}
                  {...register("phone")}
                />
                 {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </label>
            </div>
            <div className="w-full md:w-1/2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-lg font-semibold">
                    Address
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="street, city, state"
                  defaultValue={user?.data?.address}
                  className="input w-full focus:outline-none text-lg border border-gray-700 rounded px-4 py-2 "
                  disabled={edit ? false : true}
                  {...register("address")}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">{errors.address.message}</p>
                )}
              </label>
            </div>
          </div>

          <div className="mt-5">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-lg font-semibold">Image</span>
              </div>
              </label>
              {/* <input
                {...register("image")}
                type="file"
                className="file-input file-input-bordered w-full  border border-gray-700 rounded px-4 py-2"
                disabled={edit ? false : true}
              /> */}
              <div
                {...getRootProps({ disabled: !edit }) }
                className={`border-dashed border-2 border-gray-300 p-4 text-center ${
                  edit ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                }`}
              >
                 <input {...getInputProps()} disabled={!edit} />
                 {edit ? (
        <p> <p className="text-gray-600">
        Drag and drop images here, or click to select files
      </p>
      <p className="text-gray-500">
        Max {MAX_IMAGES} images, each under 5MB
      </p>
      <p className="text-gray-500">
        Allowed formats: .jpg, .jpeg, .png, .webp
      </p></p>
      ) : (
        <p>File upload is disabled when not in edit mode</p>
      )}
               
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

          <div className="mt-5">
            <input
              type="submit"
              value= {isUpdating ? 'Updating...' : 'Update'}
              className="file-input file-input-bordered w-full font-bold rounded px-4 py-2 cursor-pointer disabled:cursor-not-allowed bg-yellow-500 hover:bg-yellow-600 transition-all duration-300"
              disabled={edit ? false : true}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
