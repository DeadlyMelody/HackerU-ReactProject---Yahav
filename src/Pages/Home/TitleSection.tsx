const TitleSection = () => {
  return (
    <>
      <section className="text-centerbg-gradient-to-r flex flex-col place-items-center from-cyan-400 to-blue-900 pt-20 dark:bg-gray-700 dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-800 dark:text-white">
        <h1 style={{ fontSize: "2.5rem" }}> Cards Page </h1>
        <p style={{ fontSize: "1.5rem" }}>
          Here you can find business cards from all categories
        </p>
      </section>
    </>
  );
};

export default TitleSection;
