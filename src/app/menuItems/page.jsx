"use client"
import React, { useEffect, useState } from 'react'
import Tabs from '../component/tabs';
import { usePathname } from "next/navigation";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RiArrowRightCircleLine } from "react-icons/ri";
import { decode } from "jsonwebtoken";
var jwt = require("jsonwebtoken");

export default function MenuItems() {
  const router = useRouter()
  const Pathname = usePathname();
const [data,setData] = useState([])
const [isLoading, setIsLoading] = useState(true);

 const handleId=(id)=>{
router.push(`/menuItems/${id}`)
}

useEffect(()=>{
 fetch("/api/MenuItemEndpoint")
.then((resp)=>resp.json())
.then((result)=>{setData(result.menuitems)})
if (typeof window !== "undefined") {
  if (localStorage.getItem("token")) {
    let jwtToken = localStorage.getItem("token");
    let decode = jwt.decode(jwtToken);
    let email = decode.email;
    
    fetch("/api/isAdmin?mail=" + email)
    .then((res) => res.json())
    .then((admin) => {
      setIsLoading(false)
      if (!admin) {
          router.push("/");
        }
      });
  }else{
      setIsLoading(false);
     router.push("/");

  }
}

},[])


  return (
    <>
      {isLoading ? (
        <div className="w-full flex justify-center items-center h-96">
          <h3 className="text-6xl font-sans   text-center  font-medium text-[#f8341e] ">
            Loading...
          </h3>
        </div>
      ) : (
        <section className="overflow-x-hidden max-w-[900px] mx-auto mt-14 pb-28">
          <Tabs path={Pathname} />
          <Link href={"/menuItems/new"}>
            <div className="sm:w-[36rem] gap-2 mx-5 sm:mx-auto flex mt-14 items-center  justify-center lg:w-[47rem] border py-2.5 px-4 shadow-sm border-gray-300  font-semibold rounded-lg  ">
              <p className="font-sans font-bold"> Create new menu Item</p>
              <span>
                <RiArrowRightCircleLine className="size-6" />
              </span>
            </div>
          </Link>
          {data.length > 0 && (
            <div className="sm:w-[36rem]  relative mx-5 sm:mx-auto mt-14 lg:w-[47rem]">
              <p className=" absolute font-sans font-medium  -top-6 left-0 text-gray-600 text-sm ">
                Edit menu item:
              </p>
              <div className=" w-full  grid grid-cols-2 gap-3 md:grid-cols-3">
                {data.map((v, index) => (
                  <div
                    onClick={() => handleId(v._id)}
                    key={index}
                    className="px-4 bg-gray-200 pt-11 pb-8 flex-col relative justify-center cursor-pointer rounded-lg flex items-center gap-2 "
                  >
                    <div className="  w-[130px] sm:w-[170px]  lg:w-[170px] md:w-[150px] relative h-24 mb-3">
                      <Image src={v.img} fill alt={v.ItemName} sizes="auto" priority />
                    </div>
                    <div className="w-full">
                      <p className="font-sans font-medium  px-2 break-words text-center text-base line-clamp-1">
                        {v.ItemName}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
}
