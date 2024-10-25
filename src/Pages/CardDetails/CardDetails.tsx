import { useEffect, useState } from "react";
import { TCard } from "../../Types/TCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card } from "flowbite-react";
import TitleSection from "../../components/Shared/TitleSection/TitleSection";
import Swal from "sweetalert2";

const CardDetails = () => {
  const [card, setcard] = useState<TCard>();
  const { id } = useParams<{ id: string }>();

  const getCardData = async () => {
    try {
      const res = await axios.get(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + id,
      );
      setcard(res.data);
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

  useEffect(() => {
    getCardData();
  }, []);

  return (
    <>
      <TitleSection
        title={"Card Details"}
        p={"Here you will find all the details"}
      />

      <div className="flex h-screen flex-col items-center justify-start">
        <div className="m-auto flex flex-wrap items-center justify-center gap-3 max-md:flex-col md:w-4/5">
          <Card
            key={card?._id}
            className="
                        m-auto mt-0 h-auto border-black
                        bg-gradient-to-r from-blue-100 
                        to-purple-200 shadow-lg shadow-slate-800
                        ring-slate-600
                        transition-all
                        duration-300 hover:opacity-95 dark:border-black
                        dark:bg-gradient-to-r
                        dark:from-gray-700
                        dark:to-gray-800
                        dark:text-white
                        dark:shadow-slate-500
                        dark:ring-2
                        max-md:w-[80%]
                        max-sm:w-[90%]
                        md:w-[600px]
                    "
          >
            <h1 className="text-center text-3xl font-semibold md:text-2xl">
              {card?.title}
            </h1>
            <img
              src={card?.image.url}
              alt={card?.image.alt}
              className="m-auto h-[200px] w-full object-cover md:h-[250px] md:w-[300px]"
            />
            <hr />
            <div className="flex flex-col gap-4 text-center">
              <h1 className="font-medium">
                Email: <span className="font-normal">{card?.email}</span>
              </h1>
              <h1 className="font-medium">
                Phone: <span className="font-normal">{card?.phone}</span>
              </h1>
              <h1 className="font-medium">
                Description:{" "}
                <span className="font-normal">{card?.description}</span>
              </h1>
              <h1 className="font-medium">
                Address:{" "}
                <span className="font-normal">
                  {card?.address.country}, {card?.address.city},{" "}
                  {card?.address.street}
                </span>
              </h1>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CardDetails;
