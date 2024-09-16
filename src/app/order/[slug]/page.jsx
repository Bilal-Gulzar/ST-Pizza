"use client"
import React from 'react'
import { useState,useEffect } from 'react';
import { HiOutlineTrash } from "react-icons/hi2";
import Image from 'next/image';
import { useAppContext } from '@/app/context/contextApi';
import { redirect, useParams, useSearchParams } from 'next/navigation';
import { Router } from 'next/router';
export default function OrderPage() {
const {slug} = useParams()
const {clearcart} = useAppContext()
   const [phone, setPhone] = useState("");
   const [address, setAddress] = useState("");
   const [postal, setPostal] = useState("");
   const [city, setCity] = useState("");
   const [country, setCountry] = useState("");
   const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

   useEffect(()=>{

if (!localStorage.getItem("token")) {
  return redirect("/");
}

if(typeof window !== 'undefined'){
if(window.location.href.includes('clear-cart=1')){
  clearcart()
}
}

fetch('/api/orderPage?id='+slug)
.then((res)=>res.json())
.then((result)=> {
  setOrders(result)
  setPhone(result.phone)
  setAddress(result.streetAddress)
  setPostal(result.postalCode)
  setCity(result.city)
  setCountry(result.country)
  setIsLoading(false);
})
.catch((e)=>console.error("somthing went wrong",e))
setIsLoading(false)
},[])

let subTotal = 0;
let cartProducts  = orders?.cartProducts
if(cartProducts?.length > 0){
for (const price of cartProducts){
  subTotal += price.basePrice;
}
}

  return (
    <>
      {isLoading ? (
        <div className="w-full flex justify-center items-center h-96">
          <h3 className="text-6xl font-sans   text-center  font-medium text-[#f8341e] ">
            Loading...
          </h3>
        </div>
      ) : (
        <div className="overflow-x-hidden max-w-[900px] mx-auto mt-14 pb-28">
          <h1 className="text-4xl -mt-1 sm:mt-0 text-[#f8341e] text-center font-sans font-bold">
            Your orders
          </h1>
          <div className="mt-7 flex flex-col gap-1 ">
            <p className="text-center font-semibold ">Thanks for your order.</p>
            {window.location.href.includes("clear-cart=1") ? (
              <p className="text-center font-semibold">
                We will call you when your order will be on the way
              </p>
            ) : (
              ""
            )}
          </div>
          <div className=" grid   md:grid-cols-[55%_auto]  mt-12 gap-7 sm:gap-14 px-5 sm:px-10  lg:px-0">
            <div>
              {orders.cartProducts?.length > 0 &&
                orders.cartProducts.map((item, index) => (
                  <div key={index} className="ml-0">
                    <div className="flex justify-between pr-4 gap-2 items-center py-4 border-gray-200 border-b ">
                      <div className="flex items-center gap-2">
                        <div className="min-w-[80px] max-w-[80px] relative  mx-auto h-20 mb-3">
                          <Image
                            src={item.img}
                            alt={item.ItemName}
                            width={0}
                            height={0}
                            className="w-full h-full"
                            sizes="auto"
                            priority
                          />
                        </div>
                        <div className="font-sans text-sm break-all pr-3 sm:pr-7">
                          <p className="text-lg font-bold">{item.ItemName}</p>
                          {item.size && (
                            <p className="font-medium  text-gray-900">
                              Size: <span>{item.size?.name}</span>
                            </p>
                          )}
                          {item.extras?.length > 0 &&
                            item.extras.map((ex, index) => (
                              <p
                                key={index}
                                className="font-medium text-gray-600"
                              >
                                {ex.name} &nbsp;${ex.extraPrice}
                              </p>
                            ))}
                        </div>
                      </div>
                      <div className="flex gap-3 items-center">
                        <p className="font-sans font-bold text-lg">
                          ${item.basePrice}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              {orders?.cartProducts?.length > 0 && (
                <div className="md:flex mt-5 mb-20  hidden flex-col md:items-center  items-end ml-60 ">
                  <div>
                    <div>
                      <p className="text-gray-500 font-semibold font-sans ">
                        Subtotal :{" "}
                        <span className=" font-bold text-gray-950">
                          ${subTotal}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-semibold font-sans ">
                        Delivery :{" "}
                        <span className="text-gray-950 font-bold">$5</span>
                      </p>
                    </div>
                    <div className="">
                      <p className="text-gray-500 font-semibold font-sans  ">
                        Total :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className="text-gray-950 font-bold">
                          ${subTotal + 5}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="">
              <div className="bg-gray-100 border border-gray-200 px-4 mt-2 md:mt-0 py-5 rounded-lg">
                <div className="">
                  <label
                    htmlFor="phone"
                    className="block mt-3 text-sm font-medium leading-6 text-gray-600"
                  >
                    Phone
                  </label>
                  <div className="">
                    <input
                      id="phone"
                      name="phone"
                      type="number"
                      required
                      readOnly
                      placeholder="Phone number"
                      value={phone}
                      autoComplete="phone"
                      className="block w-full  rounded-lg border-0 p-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#f8341e] sm:text-sm sm:leading-6 outline-none"
                    />
                  </div>
                  <label
                    htmlFor="address"
                    className="block mt-3 text-sm font-medium leading-6 text-gray-600"
                  >
                    Address
                  </label>
                  <div className="">
                    <input
                      id="address"
                      name="address"
                      type="text"
                      required
                      readOnly
                      placeholder="Street Address"
                      value={address}
                      autoComplete="address"
                      className="block w-full rounded-lg border-0 p-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#f8341e] sm:text-sm sm:leading-6 outline-none"
                    />
                  </div>
                  <div className="w-full grid grid-cols-2 gap-2">
                    <div>
                      <label
                        htmlFor="postal code"
                        className="block mt-3 text-sm font-medium leading-6 text-gray-600"
                      >
                        Postal code
                      </label>
                      <div className="">
                        <input
                          id="postal code"
                          name="postalcode"
                          type="number"
                          readOnly
                          required
                          placeholder="Postal code"
                          value={postal}
                          autoComplete="postal code"
                          className="block w-full rounded-lg border-0 p-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#f8341e] sm:text-sm sm:leading-6 outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="city"
                        className="block mt-3 text-sm font-medium leading-6 text-gray-600"
                      >
                        City
                      </label>
                      <div className="">
                        <input
                          id="city"
                          name="city"
                          type="text"
                          required
                          readOnly
                          placeholder="City"
                          value={city}
                          autoComplete="city"
                          className="block w-full rounded-lg border-0 p-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#f8341e] sm:text-sm sm:leading-6 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                  <label
                    htmlFor="country"
                    className="block mt-3 text-sm font-medium leading-6 text-gray-600"
                  >
                    Country
                  </label>
                  <div className="">
                    <input
                      id="country"
                      name="country"
                      type="text"
                      placeholder="Country"
                      required
                      readOnly
                      value={country}
                      autoComplete="country"
                      className="block w-full rounded-lg border-0 p-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#f8341e] sm:text-sm sm:leading-6 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {orders?.cartProducts?.length > 0 && (
            <div className="md:hidden mt-5 mb-20  flex flex-col md:items-center items-end pr-11 ">
              <div>
                <div>
                  <p className="text-gray-500 font-semibold font-sans ">
                    Subtotal :{" "}
                    <span className=" font-bold text-gray-950">
                      ${subTotal}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 font-semibold font-sans ">
                    Delivery :{" "}
                    <span className="text-gray-950 font-bold">$5</span>
                  </p>
                </div>
                <div className="">
                  <p className="text-gray-500 font-semibold font-sans  ">
                    Total :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="text-gray-950 font-bold">
                      ${subTotal + 5}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
