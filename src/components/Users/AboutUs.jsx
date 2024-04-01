// eslint-disable-next-line no-unused-vars
import React from "react";
import aboutCardImg from "../../assets/about-card-Img.jpg";
import leftArr from "../../assets/leftArr.svg";
import store from "../../assets/store.svg";
import call from "../../assets/call.svg";
import mail from "../../assets/mail.svg";

const AboutUs = () => {
  return (
    <>
      <div className="w-full px-32 pb-6 md:px-10 sm:px-6 mt-8">
        <h1 className="font-[Poppins] font-semibold text-4xl leading-snug capitalize">
          Unlock Sustainable Style! <br /> Connect with Us for Fashionable
          Choices and , <br /> a Community Passionate About Fashion!
        </h1>
        <p className="text-xs tracking-wide font-[Poppins] max-w-[60%] leading-relaxed mt-4">
          Discover timeless fashion essentials crafted from natural fabrics and
          classic designs, blending seamlessly into any wardrobe. Our pieces are
          designed to endure generations while embracing both vintage charm and
          modern sophistication.
        </p>

        <div className="about-card h-[400px] w-full mt-8 flex justify-between items-center rounded-lg overflow-hidden">
          <div className="img-container flex-1">
            <img
              src={aboutCardImg}
              alt="about-card-img"
              className="w-full h-full"
            />
          </div>
          <div className="content flex-1 font-[Poppins] h-full bg-gray-400/15 flex flex-col justify-center items-start gap-4 p-10">
            <h1 className="text-3xl font-semibold">About Us</h1>
            <p className="text-sm max-w-md leading-normal first-letter:text-2xl">
              Fasco is a Fashion clothing store based in Ahmedabad , Gujarat.
              Est since 2024.
              <br />
              Our customer service is always prepared to support you 24/7
            </p>
            <button className="flex items-center gap-1">
              Shop now <img src={leftArr} alt="left-arr" className="w-6" />
            </button>
          </div>
        </div>

        <h1 className="font-[Poppins] font-semibold text-4xl leading-snug capitalize text-center mt-8 mb-4">
          Contact Us
        </h1>
        <div className="contact-box flex justify-between gap-10">
          <div className="font-[Poppins] flex-1 flex flex-col justify-start items-center gap-2 p-8 bg-gray-400/15 rounded-md">
            <img src={store} alt="store" className="w-6" />
            <span className="uppercase text-gray-500 font-semibold">
              ADDRESS
            </span>
            <p className="text-sm font-semibold">
              Navrangpura, near SP stadium
            </p>
          </div>
          <div className="font-[Poppins] flex-1  flex flex-col justify-start items-center gap-2 p-8 bg-gray-400/15 rounded-md">
            <img src={call} alt="store" className="w-6" />
            <span className="uppercase text-gray-500 font-semibold">
              CONTACT US
            </span>
            <p className="text-sm font-semibold">+91 7698454559</p>
          </div>
          <div className="font-[Poppins] flex-1  flex flex-col justify-start items-center gap-2 p-8 bg-gray-400/15 rounded-md">
            <img src={mail} alt="store" className="w-6" />
            <span className="uppercase text-gray-500 font-semibold">EMAIL</span>
            <p className="text-sm font-semibold">fascofashion@gmail.com</p>
          </div>
        </div>

        <div className="about-card h-[400px] w-full mt-16 flex justify-between items-center rounded-lg overflow-hidden">
          <div className="content w-[50%] font-[Poppins] h-full flex flex-col justify-between items-start gap-4 pr-10">
            <div className="inp-elem flex flex-col w-full font-[Poppins] space-y-1">
              <label
                htmlFor="name"
                className="text-sm tracking-wide text-[#6C7275] font-semibold uppercase"
              >
                FULL NAME
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your Name"
                className="w-full outline-none p-2 border-[#CBCBCB] border rounded-md text-sm focus:border-[#000]"
              />
            </div>
            <div className="inp-elem flex flex-col w-full font-[Poppins] space-y-1">
              <label
                htmlFor="email"
                className="text-sm tracking-wide text-[#6C7275] font-semibold uppercase"
              >
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your Email"
                className="w-full outline-none p-2 border-[#CBCBCB] border rounded-md text-sm focus:border-[#000]"
              />
            </div>
            <div className="inp-elem flex flex-col w-full font-[Poppins] space-y-1">
              <label
                htmlFor="email"
                className="text-sm tracking-wide text-[#6C7275] font-semibold uppercase"
              >
                MESSAGE
              </label>
              <textarea
                name="message"
                id="message"
                placeholder="Your Message"
                rows={5}
                className="w-full outline-none p-2 border-[#CBCBCB] border rounded-md text-sm resize-none focus:border-[#000]"
              />
            </div>
            <button className="py-3 px-12 bg-black text-white rounded-lg uppercase text-sm tracking-wide">
              Send Message
            </button>
          </div>
          <div className="img-container flex-1">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5321.12147542627!2d72.5614287025442!3d23.039200376967518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e85bd0338e0b3%3A0xf7309fbcb4412784!2sSIYARAM%20BOYS%20PG%20%26%20HOSTEL!5e0!3m2!1sen!2sin!4v1711893149819!5m2!1sen!2sin"
              width="100%"
              height="400px"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="footer w-full px-32 sm:px-6 py-6 border-t-2 flex flex-col mt-16 bg-[#0E0E0E]">
        <div className="top w-full flex md:flex-col sm:flex-col justify-between items-center md:gap-4">
          <div className="logo cursor-pointer">
            <h1 className="text-3xl font-normal text-white font-[Volkhov]">FASCO</h1>
          </div>
          <div className="flex gap-10 md:gap-6 sm:gap-2 items-center sm:justify-center sm:flex-wrap">
            {[
              "Support Center",
              "Invoicing",
              "Contract",
              "Careers",
              "Blogs",
              "FAQs",
            ].map((link, i) => {
              return (
                <a key={i} href="#" className="cursor-pointer sm:text-xs text-white">
                  {link}
                </a>
              );
            })}
          </div>
        </div>
        <div className="bottom w-full">
          <p className="w-full font-[Poppins] text-center text-[12px] text-[#8A8A8A]">
            Copyright © 2022 Xpro . All Rights Reseved.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
