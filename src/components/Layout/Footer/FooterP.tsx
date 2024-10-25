import { Footer } from "flowbite-react";
import "../../../Style/style.css";

const FooterP = () => {
  return (
    <>
      <Footer
        container
        className="flex flex-col rounded-none bg-gradient-to-r from-cyan-400 to-blue-900 dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800"
      >
        <div className="mx-auto mb-4 mt-2 h-[3px] w-9/12 bg-gradient-to-r from-transparent via-red-500/70 to-transparent"></div>
        <div className="w-full text-center">
          <Footer.Copyright
            href="#"
            by="Yahav & Hanady"
            className="text-black dark:text-white"
          />
        </div>
      </Footer>
    </>
  );
};

export default FooterP;
