import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { CardCreationSchema } from "../../Validations/CardCreationSchema";
import { FloatingLabel, Button } from "flowbite-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { initialCardData } from "./initialCardData";
import Swal from "sweetalert2";

const CardCreation = () => {
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialCardData,
    mode: "onChange",
    resolver: joiResolver(CardCreationSchema),
  });

  const onSubmit = async (form: typeof initialCardData) => {
    try {
      axios.defaults.headers.common["x-auth-token"] =
        localStorage.getItem("token");
      await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
        form,
      );
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your Card Has Been Created",
        showConfirmButton: false,
        timer: 1500,
        background: "#6d6d6d",
        color: "#ffffff",
        iconColor: "#E18E96",
        timerProgressBar: true,
      });
      nav("/mycards");
    } catch (error) {
      Swal.fire({
        title: "failed!",
        icon: "error",
        timerProgressBar: true,
        timer: 2000,
        toast: true,
        showCloseButton: true,
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="m-auto flex flex-col gap-4 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-900 p-4 pt-20 shadow-lg dark:bg-gray-800 dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800"
      >
        <h1 className="mt-6 text-center text-2xl font-bold text-gray-800">
          Card Creation
        </h1>

        <div className="m-auto flex gap-3">
          <div className="flex flex-col">
            <FloatingLabel
              label="Title"
              type="text"
              variant="standard"
              {...register("title")}
              className={`dark:text-black ${errors.title ? "text-red-800" : "text-black"}`}
            />
            <span className="text-sm text-red-800">
              {errors.title?.message}
            </span>
          </div>

          <div className="flex flex-col">
            <FloatingLabel
              label="Subtitle"
              type="text"
              variant="standard"
              {...register("subtitle")}
              className={`dark:text-black ${errors.subtitle ? "text-red-800" : "text-black"}`}
            />
            <span className="text-sm text-red-800">
              {errors.subtitle?.message}
            </span>
          </div>
        </div>

        <div className="m-auto flex gap-3">
          <div className="flex flex-col">
            <label
              htmlFor="message"
              className="mb-2 block text-center text-sm font-medium text-gray-900 dark:text-black"
            >
              Description
            </label>

            <textarea
              id="message"
              {...register("description")}
              className={`m-auto block h-[200px] w-[300px] resize-none rounded-lg border border-gray-300 bg-pink-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-black dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${errors.description ? "text-red-800" : "text-black"}`}
              placeholder="Write your card description here..."
            ></textarea>

            <span className="mt-2 text-center text-sm text-red-800">
              {errors.description?.message}
            </span>
          </div>
        </div>

        <div className="m-auto flex gap-3">
          <div className="flex flex-col">
            <FloatingLabel
              label="Phone"
              type="number"
              variant="standard"
              {...register("phone")}
              className={`dark:text-black ${errors.phone ? "text-red-800" : "text-black"}`}
            />
            <span className="text-sm text-red-800">
              {errors.phone?.message}
            </span>
          </div>

          <div className="flex flex-col">
            <FloatingLabel
              label="Email"
              type="email"
              variant="standard"
              {...register("email")}
              className={`dark:text-black ${errors.email ? "text-red-800" : "text-black"}`}
            />
            <span className="text-sm text-red-800">
              {errors.email?.message}
            </span>
          </div>
        </div>

        <div className="m-auto flex gap-3">
          <div className="flex flex-col">
            <FloatingLabel
              label="Web"
              type="text"
              variant="standard"
              {...register("web")}
              className={`dark:text-black ${errors.web ? "text-red-800" : "text-black"}`}
            />
            <span className="text-sm text-red-800">{errors.web?.message}</span>
          </div>

          <div className="flex flex-col">
            <FloatingLabel
              label="Image URL"
              type="text"
              variant="standard"
              {...register("image.url")}
              className={`dark:text-black ${errors.image?.url ? "text-red-800" : "text-black"}`}
            />
            <span className="text-sm text-red-800">
              {errors.image?.url?.message}
            </span>
          </div>
        </div>

        <div className="m-auto flex gap-3">
          <div className="flex flex-col">
            <FloatingLabel
              label="Image Alt"
              type="text"
              variant="standard"
              {...register("image.alt")}
              className={`dark:text-black ${errors.image?.alt ? "text-red-800" : "text-black"}`}
            />
            <span className="text-sm text-red-800">
              {errors.image?.alt?.message}
            </span>
          </div>

          <div className="flex flex-col">
            <FloatingLabel
              label="Country"
              type="text"
              variant="standard"
              {...register("address.country")}
              className={`dark:text-black ${errors.address?.country ? "text-red-800" : "text-black"}`}
            />
            <span className="text-sm text-red-800">
              {errors.address?.country?.message}
            </span>
          </div>
        </div>

        <div className="m-auto flex gap-3">
          <div className="flex flex-col">
            <FloatingLabel
              label="City"
              type="text"
              variant="standard"
              {...register("address.city")}
              className={`dark:text-black ${errors.address?.city ? "text-red-800" : "text-black"}`}
            />
            <span className="text-sm text-red-800">
              {errors.address?.city?.message}
            </span>
          </div>

          <div className="flex flex-col">
            <FloatingLabel
              label="State"
              type="text"
              variant="standard"
              {...register("address.state")}
              className={`dark:text-black ${errors.address?.state ? "text-red-800" : "text-black"}`}
            />
            <span className="text-sm text-red-800">
              {errors.address?.state?.message}
            </span>
          </div>
        </div>

        <div className="m-auto flex gap-3">
          <div className="flex flex-col">
            <FloatingLabel
              label="Street"
              type="text"
              variant="standard"
              {...register("address.street")}
              className={`dark:text-black ${errors.address?.street ? "text-red-800" : "text-black"}`}
            />
            <span className="text-sm text-red-800">
              {errors.address?.street?.message}
            </span>
          </div>

          <div className="flex flex-col">
            <FloatingLabel
              label="House Number"
              type="number"
              variant="standard"
              {...register("address.houseNumber")}
              className={`dark:text-black ${errors.address?.houseNumber ? "text-red-800" : "text-black"}`}
            />
            <span className="text-sm text-red-800">
              {errors.address?.houseNumber?.message}
            </span>
          </div>
        </div>

        <div className="m-auto flex gap-3">
          <div className="flex flex-col">
            <FloatingLabel
              label="ZIP"
              type="number"
              variant="standard"
              {...register("address.zip")}
              className={`dark:text-black ${errors.address?.zip ? "text-red-800" : "text-black"}`}
            />
            <span className="text-sm text-red-800">
              {errors.address?.zip?.message}
            </span>
          </div>
        </div>

        <Button
          type="submit"
          disabled={!isValid}
          className="m-auto w-[20%] bg-cyan-500"
        >
          Create Card
        </Button>
      </form>
    </>
  );
};

export default CardCreation;
