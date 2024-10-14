import TitleSection from "../../components/Shared/TitleSection/TitleSection";
import { useEffect } from "react"; //React hooks
import { TCard } from "../../Types/TCard";
import { useNavigate } from "react-router-dom";  //Hook for navigating between routes.
import { Card, Pagination } from "flowbite-react";
import { FaPhoneAlt, FaHeart } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { BsTrash3Fill } from "react-icons/bs";
import { PiPlus } from "react-icons/pi";
import UseCards from "../../Hooks/UseCards";
import UsePagination from "../../Hooks/UsePagination";

const MyCards = () => {

    const {
        searchCards,
        getMyCardsData,
        navigateToCardDetails,
        isCardLiked,
        likeOrUnlikedCard,
        user,
        deleteCard
    } = UseCards();

    const { onPageChange, currentCards, totalPages, currentPage } = UsePagination(searchCards);


    const nav = useNavigate();

    const navigateToCardCreation = () => {
        nav("/cardCreation");
    };

    /* Calls getMyCardsData when the component mounts (for instance when it first loads). */
    useEffect(() => {
        getMyCardsData();
    }, []);

    return (
        <>
            <TitleSection title={'My Cards'} p={'Here you can find all your created business cards'} />

            <main className="flex items-center justify-center min-h-screen gap-3 bg-gradient-to-r from-pink-100 to-pink-200 dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800">
                <div className="flex flex-wrap items-center justify-center gap-10 p-5 m-auto bg-grey-800 max-md:flex-col max-md:gap-10 md:w-4/5">
                    {currentCards.map((item: TCard) => {
                        return (
                            <Card key={item._id}
                                className="
                                bg-gradient-to-r from-pink-200 to-pink-300
                                border-black
                                h-[500px] w-[300px]
                                text-center
                                dark:border-black
                                dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800
                                dark:text-white
                                dark:ring-2
                                ring-slate-600
                                shadow-lg
                                shadow-slate-800
                                dark:shadow-slate-500
                                hover:opacity-70
                                transition-all
                                duration-300
                                " >

                                <img onClick={() => navigateToCardDetails(item._id)}
                                    src={item.image.url}
                                    alt={item.image.alt}
                                    className="w-[250px] h-[200px] object-cover cursor-pointer" />

                                <h1 className="overflow-hidden text-ellipsis whitespace-nowrap">{item.title}</h1>
                                <hr />

                                <div>
                                    <p className="overflow-hidden text-ellipsis whitespace-nowrap">{item.description}</p>
                                    <p>{item.subtitle}</p>
                                    <p> Phone: {item.phone} </p>
                                    <p> Address: {item.address.city} </p>
                                    <p> Card Number: {item.bizNumber} </p>
                                </div>

                                <div className="flex">
                                    <div className="flex gap-10 m-auto">
                                        <a href={`tel:${item.phone}`}>
                                            <FaPhoneAlt className="m-auto cursor-pointer" />
                                        </a>

                                        {user && user.user &&
                                            <FaHeart
                                                size={20}
                                                className="m-auto cursor-pointer"
                                                color={isCardLiked(item) ? "red" : "black"}
                                                onClick={() => likeOrUnlikedCard(item)}
                                            />}


                                        <BsPencilSquare
                                            size={20}
                                            className="m-auto cursor-pointer"
                                            onClick={() => nav("/edit-card/" + item._id)}
                                        //navigate to Update Card Details
                                        />

                                        <BsTrash3Fill
                                            size={20}
                                            className="m-auto cursor-pointer"
                                            onClick={() => deleteCard(item)} />

                                    </div>
                                </div>
                            </Card>
                        )
                    })}


                    <div className="fixed flex p-5 bg-pink-300 rounded-full cursor-pointer dark:bg-white right-10 top-31 bottom-10">
                        <PiPlus size={30} onClick={navigateToCardCreation} />
                    </div>

                </div>
            </main>
            <Pagination className="text-center bg-pink-300 dark:bg-gray-600 "
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                showIcons
            />
        </>
    )
};

export default MyCards;