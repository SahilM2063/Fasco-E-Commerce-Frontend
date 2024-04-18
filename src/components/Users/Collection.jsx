/* eslint-disable no-unused-vars */
import React from "react";
import menFashion from "../../assets/menFashion.jpeg";
import womenFashion from "../../assets/womenFashion.jpeg";
import kidFashion from "../../assets/kidsFashion.jpeg";
import menAcce from "../../assets/menAcce.jpeg";
import womenAcce from "../../assets/womenAcce.jpeg";
import { Link } from "react-router-dom";

const Collection = () => {
  return (
    <div className="w-full px-32 pb-6 md:px-10 sm:px-6 mt-8">
      <div className="container-box w-full h-full">
        <div className="row w-full flex sm:flex-col justify-between items-start gap-10 md:gap-0 sm:gap-6 h-[400px] sm:h-auto md:h-[300px] mb-16 md:mb-12 sm:mb-8">
          <div className="image-container w-full h-full rounded-md overflow-hidden">
            <img
              src={menFashion}
              alt="fashion"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="content flex flex-col items-start justify-start gap-2 pl-8 sm:pl-0 w-full md:w-[90%] h-full">
            <div className="text-container w-full">
              <h1 className="font-[Poppins] font-semibold text-4xl md:text-lg sm:text-xl">
                Men Fashion
              </h1>
              <p className="text-sm text-[#7B7B7B]/70 font-[Poppins] text-justify leading-5 md:leading-4 mt-4 md:mt-2 md:text-[10px] sm:text-xs">
                The modern men&#39;s wardrobe is a canvas of versatility and
                sophistication. From classic tailored suits that exude timeless
                charm to casual ensembles infused with contemporary flair, the
                range of options is as diverse as the personalities they adorn.
                Rich textures, vibrant hues, and meticulous attention to detail
                create a narrative of individuality, allowing each man to
                express his unique style journey with confidence and elegance.
              </p>
              <div className="flex items-center gap-1 mt-6 md:mt-2 md:flex-wrap">
                {["Trendy", "Comfortable", "Versatile", "Casual", "Formal"].map(
                  (item, index) => (
                    <span
                      key={index}
                      className="text-black font-[Gilroy] px-[6px] py-1 text-[13px] md:text-[11px] sm:text-xs rounded-full border border-black"
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>
            <Link to={"/shop"}  className="bg-black text-white tracking-wide text-sm md:text-xs sm:text-xs font-[Poppins] rounded-full px-10 md:px-6 sm:px-6 py-3 md:py-2 sm:py-2 mt-4 sm:mt-2">
              Explore
            </Link>
          </div>
        </div>
        <div className="row w-full flex sm:flex-col-reverse justify-between items-start gap-10 md:gap-0 sm:gap-6 h-[400px] sm:h-auto md:h-[300px] mb-16 md:mb-12 sm:mb-8">
          <div className="content flex flex-col items-start justify-start gap-2 pr-8 sm:pr-0 w-full md:w-[90%] h-full">
            <div className="text-container w-full">
              <h1 className="font-[Poppins] font-semibold text-4xl md:text-lg sm:text-xl">
                Women Fashion
              </h1>
              <p className="text-sm text-[#7B7B7B]/70 font-[Poppins] text-justify leading-5 md:leading-4 mt-4 md:mt-2 md:text-[10px] sm:text-xs">
                In the realm of women&#39;s fashion, the wardrobe is akin to a
                canvas of endless possibilities, blending versatility with
                sophistication. From elegant dresses that embody timeless charm
                to casual outfits infused with modern flair, the range of
                options is as diverse as the personalities they adorn. Luxurious
                fabrics, captivating colors, and meticulous attention to detail
                weave a narrative of individuality, empowering each woman to
                embark on her unique style journey with confidence and grace.
              </p>
              <div className="flex items-center gap-1 mt-6 md:mt-2 md:flex-wrap">
                {["Trendy", "Versatile", "Elegant", "Chic", "Empowering"].map(
                  (item, index) => (
                    <span
                      key={index}
                      className="text-black font-[Gilroy] px-[6px] py-1 text-[13px] md:text-[11px] sm:text-xs rounded-full border border-black"
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>
            <Link to={"/shop"} className="bg-black text-white tracking-wide text-sm md:text-xs sm:text-xs font-[Poppins] rounded-full px-10 md:px-6 sm:px-6 py-3 md:py-2 sm:py-2 mt-4 sm:mt-2">
              Explore
            </Link>
          </div>
          <div className="image-container w-full h-full rounded-md overflow-hidden">
            <img
              src={womenFashion}
              alt="fashion"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="row w-full flex sm:flex-col justify-between items-start gap-10 md:gap-0 sm:gap-6 h-[400px] sm:h-auto md:h-[300px] mb-16 md:mb-12 sm:mb-8">
          <div className="image-container w-full h-full rounded-md overflow-hidden">
            <img
              src={kidFashion}
              alt="fashion"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="content flex flex-col items-start justify-start gap-2 pl-8 sm:pl-0 w-full md:w-[90%] h-full">
            <div className="text-container w-full">
              <h1 className="font-[Poppins] font-semibold text-4xl md:text-lg sm:text-xl">
                Kid Fashion
              </h1>
              <p className="text-sm text-[#7B7B7B]/70 font-[Poppins] text-justify leading-5 md:leading-4 mt-4 md:mt-2 md:text-[10px] sm:text-xs">
                Children&#39;s fashion is a vibrant canvas filled with
                versatility and creativity. From charming outfits that evoke
                timeless innocence to playful ensembles infused with a modern
                twist, the choices are as diverse as the personalities they
                reflect. Soft textures, cheerful colors, and intricate details
                come together to create a narrative of individuality, empowering
                each child to express their unique style journey with confidence
                and enthusiasm.
              </p>
              <div className="flex items-center gap-1 mt-6 md:mt-2 md:flex-wrap">
                {["Playful", "Comfortable", "Casual", "Dressy"].map(
                  (item, index) => (
                    <span
                      key={index}
                      className="text-black font-[Gilroy] px-[6px] py-1 text-[13px] md:text-[11px] sm:text-xs rounded-full border border-black"
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>
            <Link to={"/shop"} className="bg-black text-white tracking-wide text-sm md:text-xs sm:text-xs font-[Poppins] rounded-full px-10 md:px-6 sm:px-6 py-3 md:py-2 sm:py-2 mt-4 sm:mt-2">
              Explore
            </Link>
          </div>
        </div>
        <div className="row w-full flex sm:flex-col-reverse justify-between items-start gap-10 md:gap-0 sm:gap-6 h-[400px] sm:h-auto md:h-[300px] mb-16 md:mb-12 sm:mb-8">
          <div className="content flex flex-col items-start justify-start gap-2 pr-8 sm:pr-0 w-full md:w-[90%] h-full">
            <div className="text-container w-full">
              <h1 className="font-[Poppins] font-semibold text-4xl md:text-lg sm:text-xl">
                Men Accessories
              </h1>
              <p className="text-sm text-[#7B7B7B]/70 font-[Poppins] text-justify leading-5 md:leading-4 mt-4 md:mt-2 md:text-[10px] sm:text-xs">
                In the realm of men&#39;s accessories, versatility and
                refinement take center stage. From classic watches that exude
                timeless elegance to modern pieces infused with contemporary
                flair, the range of options is as varied as the men who wear
                them. Opulent materials, bold colors, and impeccable
                craftsmanship weave a tale of individuality, empowering each man
                to articulate his unique style journey with assurance and
                finesse.
              </p>
              <div className="flex items-center gap-1 mt-6 md:mt2 md:flex-wrap">
                {["Stylish", "Functional", "Adaptable", "Elegant"].map(
                  (item, index) => (
                    <span
                      key={index}
                      className="text-black font-[Gilroy] px-[6px] py-1 text-[13px] md:text-[11px] sm:text-xs rounded-full border border-black"
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>
            <Link to={"/shop"} className="bg-black text-white tracking-wide text-sm md:text-xs sm:text-xs font-[Poppins] rounded-full px-10 md:px-6 sm:px-6 py-3 md:py-2 sm:py-2 mt-4 sm:mt-2">
              Explore
            </Link>
          </div>
          <div className="image-container w-full h-full sm:max-h-[230px] rounded-md overflow-hidden">
            <img
              src={menAcce}
              alt="fashion"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="row w-full flex sm:flex-col justify-between items-start gap-10 md:gap-0 sm:gap-6 h-[400px] sm:h-auto md:h-[300px] mb-16 md:mb-12 sm:mb-8">
          <div className="image-container w-full h-full sm:max-h-[230px] rounded-md overflow-hidden">
            <img
              src={womenAcce}
              alt="fashion"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="content flex flex-col items-start justify-start gap-2 pl-8 sm:pl-0 w-full md:w-[90%] h-full">
            <div className="text-container w-full">
              <h1 className="font-[Poppins] font-semibold text-4xl md:text-lg sm:text-xl">
                Women Accessories
              </h1>
              <p className="text-sm text-[#7B7B7B]/70 font-[Poppins] text-justify leading-5 md:leading-4 mt-4 md:mt-2 md:text-[10px] sm:text-xs">
                Women&#39;s accessories epitomize versatility and
                sophistication. From timeless handbags exuding refined charm to
                contemporary jewelry pieces, the options mirror diverse
                personalities. Luxurious materials, vibrant colors, and
                intricate craftsmanship combine to create an aura of
                individuality, empowering women to embark on their style journey
                with confidence and grace.
              </p>
              <div className="flex items-center gap-1 mt-6 md:mt2 md:flex-wrap">
                {["Chic", "Functional", "Adaptable", "Relaxed", "Elegant"].map(
                  (item, index) => (
                    <span
                      key={index}
                      className="text-black font-[Gilroy] px-[6px] py-1 text-[13px] md:text-[11px] sm:text-xs rounded-full border border-black"
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>
            <Link to={"/shop"} className="bg-black text-white tracking-wide text-sm md:text-xs sm:text-xs font-[Poppins] rounded-full px-10 md:px-6 sm:px-6 py-3 md:py-2 sm:py-2 mt-4 sm:mt-2">
              Explore
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
