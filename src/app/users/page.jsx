"use client"
import React, { useEffect } from 'react'
import Tabs from '../component/tabs';
import { usePathname,useRouter } from "next/navigation";
import { useState } from 'react';
import { decode } from "jsonwebtoken";
var jwt = require("jsonwebtoken");


export default function Users() {
  const Pathname = usePathname();
  const router = useRouter();
  const [emails,setEmails]=useState([])
  const [isLoading, setIsLoading] = useState(true);

  const fetchingData = async()=>{
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/getusers`
    );
    setIsLoading(false)
    const response = await res.json();
    setEmails(response || []);
 };   
 
 const handleNext =(_id)=>{
 router.push(`${process.env.NEXT_PUBLIC_HOST}/users/${_id}`)

 }

 useEffect(()=>{
  fetchingData()

if(typeof window !== 'undefined'){
if (localStorage.getItem("token")) {
  let jwtToken = localStorage.getItem("token");
  let decode = jwt.decode(jwtToken);
  let email = decode.email;

  fetch("/api/isAdmin?mail=" + email)
    .then((res) => res.json())
    .then((admin) => {
      if (!admin) {
        router.push("/");
      }
    });
}else {
  router.push("/");
}

}
 },[])

  return (
    <>
    {
      isLoading ?
      <div className="w-full flex justify-center items-center h-96">
          <h3 className="text-6xl font-sans   text-center  font-medium text-[#f8341e] ">
            Loading...
          </h3>
        </div>
        :
    <section className="overflow-x-hidden max-w-[900px] mx-auto mt-14 pb-28">
      <Tabs path={Pathname} />
      <div className="w-full flex items-center flex-col mt-14 gap-3">
        {emails.map((v, i) => (
          <div
            key={i}
            className="w-[85vw] mx-auto  sm:mx-0  sm:w-[30rem] flex justify-between  items-center lg:w-[32rem] rounded-lg border py-2 px-4 shadow-sm  border-gray-300 bg-gray-100 sm:text-sm sm:leading-6 outline-none gap-3 sm:gap-0"
          >
            <p className=" font-bold  sm:block hidden font-sans text-gray-900">{v.name}</p>
            <p className="text-gray-800 font-sans line-clamp-1 font-medium">{v.email}</p>
            <button
              onClick={() => handleNext(v._id)}
              className="bg-gray-100 border-gray-400 border text-gray-900 w-[53px] py-1 rounded-md  flex justify-center items-center font-sans font-bold  outline-none"
            >
              Edit
            </button>
          </div>
        ))}
        {/* <div className="flex-col bg-black/80  inset-0 absolute justify-center hidden items-center">
          <div className=" sm:w-[19rem] lg:w-[20rem] flex flex-col gap-5 p-3 pb-4 rounded-lg bg-white">
            <p className="text-center text-sm font-medium">
              are you sure you want to delete this user?
            </p>
            <div className="flex gap-3 w-full items-center justify-center">
              <button className="bg-gray-100  border-gray-300 border text-black w-[80px] py-1.5 rounded-md  text flex justify-center items-center font-sans font-bold  outline-none">
                Cancel
              </button>
              <button className="bg-[#f8341e] text-white w-[80px] py-1.5 rounded-md  flex justify-center items-center font-sans font-bold  outline-none">
                Delete
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </section>
    }
    </>
  );
}
