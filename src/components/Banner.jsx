import React from "react";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="p-12 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex justify-center items-center bg-white">
        <Image
          src="https://steady-study.netlify.app/static/media/studying-girl.4085c1e8.svg"
          alt="Studying Girl Illustration"
          width={500}
          height={400}
          priority
          className="w-full max-w-md h-auto drop-shadow-xl transition hover:scale-105 duration-300"
        />
      </div>
    </div>
  );
};

export default Banner;
