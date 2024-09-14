"use client"
import Image from "next/image";
import React from 'react'
import Link from "next/link";
import { HiOutlineArrowRightCircle } from "react-icons/hi2";
import { useEffect,useState } from "react";



export default function Home() {
const [menuItem,setMenuItem] = useState([])
const [fourmenu,setFourmenu] = useState([])

useEffect(() => {
  fetch("/api/categories").then((res) => {
    res.json()
    .then((data) => {
     setCategories(data?.getcategory || []);
      })
      .catch((error) => {
        console.log("something went wrong.", error);
      });
  });


  fetch("/api/MenuItemEndpoint")
    .then((resp) => resp.json())
    .then((result) => {
     setMenuItem(result.menuitems.slice(-3));
     setFourmenu(result.menuitems.slice(-4));
    });

}, []);

  return (
    <main className="w-full">
      <div className="max-w-[900px] pb-12 mx-auto mt-8 ">
        <div className="grid sm:grid-cols-[50%_auto] mx-auto pt-8">
          <div className="mt-6 sm:order-1 order-2">
            <h1 className="font-sans sm:block hidden font-bold text-5xl sm:ml-5 lg:ml-0 ">
              Everything
              <br /> is better <br /> with{" "}
              <span className="text-[#f8341e]">Pizza</span>
            </h1>
            <h1 className="text-center font-sans mx-8 sm:hidden font-bold text-5xl ">
              Everything is better with{" "}
              <span className="text-[#f8341e]">Pizza</span>
            </h1>
            <p className="font-sans sm:ml-5 lg:ml-0  sm:text-start text-center mx-8 sm:mx-0 font-medium text-sm break-words pr-12 mt-5 text-gray-600">
              Pizza is the missing piece that makes every day complete, a simple
              yet delicious joy in life
            </p>
            <div className="flex items-center justify-center sm:justify-start  ml-5 lg:ml-0 mt-7 gap-5 ">
              <button className="w-[150px]  gap-2 h-10 rounded-full  flex justify-center items-center bg-[#f8341e] font-sans font-bold text-white outline-none">
                Order Now{" "}
                <span>
                  <HiOutlineArrowRightCircle className="size-5" />
                </span>
              </button>
              <div className="text-gray-600 font-sans font-bold flex items-center gap-2">
                Learn more{" "}
                <span className="inline-block">
                  <HiOutlineArrowRightCircle className="size-5" />
                </span>
              </div>
            </div>
          </div>
          <div className="relative mx-auto sm:mx-0 sm:order-2 order-1">
            <Image
              src="/pizza.png"
              alt="pizza"
              width={350}
              height={350}
              className="w-auto"
              priority
            />
          </div>
        </div>
        <div className="flex mt-10 flex-col items-center font-sans font-bold">
          <h3 className="text-md text-gray-600">CHECK OUT</h3>
          <h3 className="text-3xl text-[#f8341e] mb-10">Our Best Sellers</h3>
        </div>
        {menuItem.length > 0 && (
          <div className="lg:flex lg:flex-wrap sm:hidden lg:-m-4 md:grid grid  md:grid-cols-3">
            {menuItem.map((v) => (
              <div key={v._id} className="p-4 lg:w-1/3">
                <div className="h-full bg-gray-200 hover:bg-white hover:shadow-lg cursor-pointer px-8 pt-8 pb-5 rounded-lg overflow-hidden text-center relative">
                  <div className="w-[150px]  mx-auto h-24 mb-3">
                    <Image
                      src={v.img}
                      alt={v.ItemName}
                      width={0}
                      height={0}
                      className="w-full h-full"
                      sizes="auto"
                      priority
                    />
                  </div>
                  <h1 className="title-font text-2xl font-bold line-clamp-1 text-gray-900 mb-3">
                    {v.ItemName}
                  </h1>

                  <p className=" line-clamp-3 font-sans mb-3 text-sm text-gray-600 font-medium">
                    {v.description}
                  </p>
                  <div className="flex  items-center justify-center sm:justify-start  gap-5 ">
                      <button className="w-full gap-2 h-10 rounded-full  flex justify-center items-center bg-[#f8341e] font-sans font-bold text-white outline-none">
                    <Link href='/menu' className="line-clamp-1 px-2">
                        Add to cart ${v.basePrice}
                    </Link>
                      </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {fourmenu.length > 0 && (
          <div className="md:hidden hidden sm:grid sm:grid-cols-2 md:grid-cols-3">
            {fourmenu.map((v) => (
              <div key={v._id} className="p-4 lg:w-1/3">
                <div className="h-full bg-gray-200 hover:bg-white hover:shadow-lg cursor-pointer px-8 pt-8 pb-5 rounded-lg overflow-hidden text-center relative">
                  <div className="w-[150px]  mx-auto h-24 mb-3">
                    <Image
                      src={v.img}
                      alt={v.ItemName}
                      width={0}
                      height={0}
                      className="w-full h-full"
                      sizes="auto"
                      priority
                    />
                  </div>
                  <h1 className="title-font text-2xl font-bold text-gray-900 mb-3">
                    {v.ItemName}
                  </h1>

                  <p className=" line-clamp-3 font-sans mb-3 text-sm text-gray-600 font-medium">
                    {v.description}
                  </p>
                  <div className="flex items-center justify-center sm:justify-start  gap-5 ">
                    <button className=" w-full gap-2 h-10 rounded-full  flex justify-center items-center bg-[#f8341e] font-sans font-bold text-white outline-none">
                      Add to cart ${v.basePrice}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex mt-10 flex-col items-center font-sans">
          <h2 className=" font-bold text-md text-gray-600">OUR STORY</h2>
          <h3 className="text-3xl font-bold text-[#f8341e] mb-10" id="about-us">
            About Us
          </h3>
          <div className="sm:max-w-[500px] w-[80vw] mx-auto">
            <p className="font-medium font-sans text-gray-600 text-center">
              Welcome to ST Pizza, where freshly crafted, oven-baked perfection
              is just a click away. Our menu is a journey through mouthwatering
              flavors, with every slice offering a touch of heaven. We pride
              ourselves on hand-tossed dough, premium toppings, and a whole lot
              of love in every bite.
              <br />
              <br />
              Whether you’re craving something extraordinary or prefer to build
              your own pizza masterpiece, our signature creations and
              customizable options are sure to satisfy. From classic cheese to
              bold, new flavors, we’ve got something to suit every taste.
              Experience the ultimate pizza night with our made-from-scratch
              sauces and locally sourced ingredients.
              <br />
              <br /> Why settle for ordinary when you can indulge in
              extraordinary? Our gourmet pizzas are perfect for any occasion,
              whether you’re feeding a family or a crowd. Join us for a slice or
              order online for fast, fresh, and always delicious pizza. At ST
              Pizza, we’re passionate about pizza and dedicated to delivering
              the best experience with every order.
            </p>
          </div>
        </div>
        <div className="flex mt-10 flex-col items-center font-sans">
          <h2 className=" font-bold text-md text-gray-600">DON'T HESITATE</h2>
          <h3
            className="text-4xl font-bold text-[#f8341e] mb-7"
            id="contact-us"
          >
            Contact us
          </h3>
          <h3 className="text-2xl underline font-bold text-gray-600 mb-28">
            +92 349 025 0746
          </h3>
        </div>
      </div>
    </main>
  );
}
