import React from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import CategorCaraousel from "./CategorCaraousel";

const HeroSection = () => {
  return (
    <div>
      <section
        className="relative bg-cover bg-center bg-no-repeat h-auto py-20"
        style={{
          backgroundImage: "url('/home_img.jpg')",
        }}
      >
        {/* Faint overlay */}
        <div className="absolute inset-0 bg-white bg-opacity-70"></div>

        {/* Main content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col items-center gap-10">
          {/* Heading */}
          <div className="text-center max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight mb-6">
              Connecting People
              <br />
              to the <span className="text-green-600">Support</span> They{" "}
              <span className="text-orange-600">Deserve</span>
            </h1>

            {/* Search Bar */}
            <div className="flex items-center w-full max-w-xl mx-auto shadow-lg border border-gray-300 rounded-full bg-white px-4 py-2 mt-4">
              <input
                type="text"
                placeholder="Find schemes tailored to your needs"
                className="flex-grow outline-none border-none text-gray-700 text-base bg-transparent placeholder-gray-500"
              />
              <Button className="rounded-full bg-green-600 hover:bg-green-700">
                <Search className="h-5 w-5 text-white" />
              </Button>
            </div>
          </div>

          {/* Category Carousel */}
          <div className="w-full">
            <CategorCaraousel />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
