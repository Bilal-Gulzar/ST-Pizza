"use client"
import React from 'react'
import Image from 'next/image';
import { useAppContext } from '../context/contextApi';
import { HiOutlineTrash } from "react-icons/hi2";
import { useState,useEffect} from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
// import { resolve } from 'styled-jsx/macro';

export default function Cart() {
 const [email, setEmail] = useState("");
 const [phone, setPhone] = useState("");
 const [address, setAddress] = useState("");
 const [postal, setPostal] = useState("");
 const [city, setCity] = useState("");
 const [country, setCountry] = useState("");
 const [isLoading, setIsLoading] = useState(true);
 const router = useRouter()
 const { cartProducts,removeMenuFromCart} = useAppContext();
let subTotal = 0;

for (const price of cartProducts){

   subTotal  += price.basePrice
}

const proceedToCheckout = async(evt)=>{
  evt.preventDefault()

 const data = { cartProducts, email, address, postal, city, phone, country };
 
  let promise = new Promise((resolve, reject) => {
     fetch("/api/checkout", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(data),
   }).then(async (response)=>{
    if(response.ok){
   resolve()
    window.location  = await response.json()
    }else{
      reject()
    }
   })
 });
 await toast.promise(promise,{
loading: 'Preparing your order...',
success: 'Redirecting to payment... ',
error: 'something went wrong... Please try again Later'
 })

}
 const fetcingData = async (jwt) => {
  setIsLoading(true)
   const res = await fetch(
     `${process.env.NEXT_PUBLIC_HOST}/api/updateProfile?token=${jwt}`
   );
   const response = await res.json();
   if (response.success) {
     setEmail(response.Userdata?.email || "");
     setPhone(response.Userdata?.phone || "");
     setAddress(response.Userdata?.address || "");
     setPostal(response.Userdata?.postalcode || "");
     setCity(response.Userdata?.city || "");
     setCountry(response.Userdata?.country || "");

   } else {
     console.log(response.error);
   }
   setIsLoading(false)
 };


useEffect(() => {
  const jwtToken = localStorage.getItem("token");
  if (!jwtToken) {
    router.push("/login");
  } else {
    fetcingData(jwtToken);
  }

if(typeof window !== 'undefined'){

if(window.location.href.includes('canceled=1')){
  toast.error('Payment failed')
}
}

}, [])

  return (
    <section className="max-w-[900px] mx-auto mt-14 pb-28">
      {isLoading ? (
        <div className='w-full flex justify-center items-center h-96'>
          <h3 className="text-6xl font-sans   text-center  font-medium text-[#f8341e] ">
            Loading...
          </h3>
        </div>
      ) : (
        <div>
          <h1 className="text-4xl -mt-1 sm:mt-0 text-[#f8341e] text-center font-bold">
            Cart
          </h1>
          {cartProducts?.length == 0 && (
            <h2 className="text-center text-xl pb-20 font-sans font-semibold mt-10">
              Your Cart is empty
            </h2>
          )}
          {cartProducts?.length > 0 && (
            <div className=" grid md:grid-cols-2  mt-12 gap-9 px-4 sm:px-10  lg:px-0">
              <div>
                {cartProducts?.length > 0 &&
                  cartProducts.map((item, index) => (
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
                            {/* <div> */}
                            <p className="text-lg font-bold ">{item.ItemName}</p>
                            {/* </div> */}
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
                          <p className="font-sans font-semibold text-lg">
                            ${item.basePrice}
                          </p>
                          <span
                            onClick={() => {
                              removeMenuFromCart(index),
                                toast.success("Product removed");
                            }}
                            className=" cursor-pointer bg-white border rounded-xl border-gray-300"
                          >
                            <HiOutlineTrash className="size-6 m-2 " />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                {cartProducts?.length > 0 && (
                  <div className=" md:flex hidden mt-5 mb-20 flex-col md:items-center  items-end  ml-60 ">
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
                <div className="bg-gray-200 px-4 mt-4 md:mt-0 py-5 rounded-lg">
                  <h2 className="text-xl font-semibold text-center md:text-start ">
                    checkout
                  </h2>
                  <form onSubmit={proceedToCheckout} className="space-y-6">
                    {/* <div className="relative  sm:w-[20rem] mx-5 sm:mx-0  md:w-[22rem]  lg:w-[28rem]"> */}
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
                          placeholder="Phone number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          autoComplete="phone"
                          className="block w-full  rounded-lg border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#f8341e] sm:text-sm sm:leading-6 outline-none"
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
                          placeholder="Street Address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          autoComplete="address"
                          className="block w-full rounded-lg border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#f8341e] sm:text-sm sm:leading-6 outline-none"
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
                              required
                              placeholder="Postal code"
                              value={postal}
                              onChange={(e) => setPostal(e.target.value)}
                              autoComplete="postal code"
                              className="block w-full rounded-lg border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#f8341e] sm:text-sm sm:leading-6 outline-none"
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
                              placeholder="City"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                              autoComplete="city"
                              className="block w-full rounded-lg border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#f8341e] sm:text-sm sm:leading-6 outline-none"
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
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          autoComplete="country"
                          className="block w-full rounded-lg border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#f8341e] sm:text-sm sm:leading-6 outline-none"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="  w-full  h-9 rounded-lg  flex justify-center items-center bg-[#f8341e] font-sans font-bold text-white outline-none"
                    >
                      Pay ${subTotal}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
          {cartProducts?.length > 0 && (
            <div className="md:hidden mt-5 mb-20  flex flex-col md:items-center md:pr-64 items-end pr-11 ">
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
    </section>
  );
}
