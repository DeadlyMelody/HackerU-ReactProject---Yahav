import { useEffect, useState } from "react"; //React hooks for managing state and side effects.
import { TCard } from "../../Types/TCard";
import { Button, Card, Pagination } from "flowbite-react";
import { FaPhoneAlt, FaHeart } from "react-icons/fa";
import TitleSection from "../../components/Shared/TitleSection/TitleSection";
import UseCards from "../../Hooks/UseCards";
import UsePagination from "../../Hooks/UsePagination";

const FavoriteCards = () => {
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
    searchFavoriteCards,
    getCardsData,
    navigateToCardDetails,
    isCardLiked,
    likeOrUnlikedCard,
    user,
  } = UseCards();
  const { onPageChange, currentInUse, totalPages, currentPage } =
    UsePagination(searchFavoriteCards);

  /* Calls getCardsData when the component mounts (for instance when it first loads). */
  useEffect(() => {
    getCardsData();
  }, []);

  return (
    <>
      <TitleSection
        title={"Favorite Cards"}
        p={"Here you can find all your favorite business cards"}
      />

      <main className="flex min-h-screen items-center justify-center gap-3">
        <div className="bg-grey-800 m-auto flex flex-wrap items-center justify-center gap-10 p-5 max-md:flex-col max-md:gap-10 md:w-4/5">
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
          // For mobile: only show previous and next buttons
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
          // For desktop: show full pagination
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

export default FavoriteCards;
