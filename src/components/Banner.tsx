import React from "react";

const Banner: React.FC = () => {
  return (
    <section
      className="w-full flex flex-col items-center justify-center bg-mock  px-4 md:px-16 relative min-h-[350px] md:min-h-[500px]"
      //   style={{
      //     backgroundImage: "url('/gorod_noch_panorama_117682_3840x2160.jpg')",
      //     backgroundSize: "cover",
      //     backgroundPosition: "center",
      //     backgroundRepeat: "no-repeat",
      //   }}
    >
      <div className="flex flex-col gap-y-10 max-w-6xl text-center z-10 items-center">
        <h1 className="text-5xl max-md:text-3xl font-bold text-navy">
          Створи свій простір з нашими фотообоями!{" "}
        </h1>
        <h2 className="max-w-lg text-2xl  text-black hidden md:block">
          Індивідуальні фотообої, стильні сувеніри та авторська поліграфія для
          твого простору
        </h2>
        <button className="border-2 border-teal text-teal px-7 py-5 rounded-lg text-lg font-semibold hover:bg-teal hover:text-white transition-colors">
          ОБРАТИ ДИЗАЙН
        </button>
      </div>
    </section>
  );
};

export default Banner;
