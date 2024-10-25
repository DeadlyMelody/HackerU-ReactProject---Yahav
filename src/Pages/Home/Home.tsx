import { useEffect, useState } from "react";
import { TCard } from "../../Types/TCard";
import { Button, Card, Pagination } from "flowbite-react";
import TitleSection from "./TitleSection";
import { FaPhoneAlt, FaHeart } from "react-icons/fa";
import UseCards from "../../Hooks/UseCards";
import UsePagination from "../../Hooks/UsePagination";

const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const {
    searchCards,
    likeOrUnlikedCard,
    navigateToCardDetails,
    getCardsData,
    isCardLiked,
    user,
  } = UseCards();
  const { onPageChange, currentInUse, totalPages, currentPage } =
    UsePagination(searchCards);

  useEffect(() => {
    getCardsData();
  }, []);

  return (
    <>
      <TitleSection />
      <main className="flex min-h-screen items-center justify-center gap-3">
        <div className="m-auto flex flex-wrap items-center justify-center gap-10 p-5 max-md:flex-col max-md:gap-10 md:w-4/5">
          {currentInUse.map((item: TCard) => {
            return (
              <Card
                key={item._id}
                className="h-[500px] 
                                w-[300px] border-black bg-gradient-to-l
                                from-blue-100
                                to-purple-200 text-center
                                shadow-lg
                                shadow-slate-800
                                ring-slate-600 transition-all duration-300
                                hover:opacity-95
                                dark:border-black
                                dark:bg-pink-400
                                dark:bg-gradient-to-r
                                dark:from-gray-700
                                dark:to-gray-800
                                dark:text-white
                                dark:shadow-slate-500
                                dark:ring-2
                                "
              >
                <img
                  onClick={() => navigateToCardDetails(item._id)}
                  src={item.image.url}
                  alt={item.image.alt}
                  className="h-[200px] w-[250px] cursor-pointer rounded object-cover"
                />

                <h1 className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-medium">
                  {item.title}
                </h1>
                <hr />
                <div>
                  <p>{item.subtitle}</p>
                  <p className="mb-2 overflow-hidden text-ellipsis whitespace-nowrap font-light">
                    {item.description}
                  </p>
                  <p>
                    {" "}
                    Phone:{" "}
                    <span className="font-extralight">{item.phone} </span>
                  </p>
                  <p>
                    {" "}
                    Address:{" "}
                    <span className="font-extralight">
                      {item.address.city}
                    </span>{" "}
                  </p>
                  <p>
                    {" "}
                    Card Number:{" "}
                    <span className="font-extralight">
                      {item.bizNumber}
                    </span>{" "}
                  </p>
                </div>

                <div className="flex">
                  <div className="m-auto flex gap-10">
                    <a href={`tel:${item.phone}`}>
                      <FaPhoneAlt className="m-auto cursor-pointer" />
                    </a>

                    {user && user.user && (
                      <FaHeart
                        size={20}
                        className="m-auto cursor-pointer"
                        color={isCardLiked(item) ? "red" : "black"}
                        onClick={() => likeOrUnlikedCard(item)}
                      />
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </main>
      <div className="mt-4 flex justify-center">
        {isMobile ? (
          <div className="flex">
            <Button
              gradientMonochrome="cyan"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="mr-2"
            >
              Previous
            </Button>
            <Button
              gradientMonochrome="cyan"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        ) : (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            showIcons
          />
        )}
      </div>
    </>
  );
};

export default Home;
