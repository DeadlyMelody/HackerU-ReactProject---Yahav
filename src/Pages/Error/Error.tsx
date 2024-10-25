import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { MdHeartBroken } from "react-icons/md";

const Error = () => {
  const nav = useNavigate();

  const homePage = () => {
    nav("/home");
  };

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center gap-10">
        <h1 className="text-3xl">404</h1>
        <p className="text-2xl">
          this isnt an existing page, just go back bruh!
        </p>
        <MdHeartBroken size={60} />
        <Button
          onClick={homePage}
          className="bg-cyan-400 dark:border-black dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800"
        >
          {" "}
          Go Back To Home Page{" "}
        </Button>
      </div>
    </>
  );
};

export default Error;
