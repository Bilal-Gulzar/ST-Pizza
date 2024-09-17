"use client"
import React, { useState } from 'react'
import Link from 'next/link';
import Image from 'next/image'
// import { AiOutlineShoppingCart } from "react-icons/ai";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiAccountBoxLine } from "react-icons/ri";
import { PiBagBold } from "react-icons/pi";
import { useRouter } from 'next/navigation';
import { useEffect} from 'react';
import { BiLogIn, BiLogOut} from "react-icons/bi";
import { useAppContext } from '../context/contextApi';
import { MdNoAccounts } from "react-icons/md";

export default function Navbar() {
  const {cartProducts} = useAppContext(); 

const router = useRouter()
const {token,setToken,name} = useAppContext()
const [nav,setNav]=useState(false)  
const removejwt = ()=>{
 localStorage.removeItem('token')
 setToken(null)
 router.push('/')
  }

  return (
    <nav className=" sticky md:relative bg-white z-30 right-0 left-0 top-0 shadow-md md:shadow-none  ">
      <div className="max-w-[900px] mx-auto sm:pr-5 lg:pr-0">
        <div className="flex flex-row justify-between items-center sm:mt-4 font-sans font-bold  ">
          <div className="flex items-center gap-5 ">
            <Link href={"/"}>
              <h2 className="text-4xl text-[#f8341e] mt-3 md:mt-0 ml-5 lg:ml-0">
                ST Pizza
              </h2>
            </Link>
            <ul className="text-gray-600 md:flex hidden mt-3 gap-4 ">
              <Link href={"/"}>
                {" "}
                <li>Home</li>
              </Link>
              <Link href={"/menu"}>
                <li>Menu</li>
              </Link>
              <Link href={"/#about-us"}>
                {" "}
                <li>About</li>
              </Link>
              <Link href={"/#contact-us"}>
                {" "}
                <li>Contact</li>
              </Link>
            </ul>
          </div>
          <div className="flex gap-5 sm:gap-4 mt-4 md:mr-0 mr-5 items-center">
            {token && (
              <div>
                <Link href={"/profile"}>
                  <h2 className="font-sans sm:block hidden font-bold text-gray-600 mt-2">
                    Hello,{name?.split(" ")[0].substring(0, 12)}
                  </h2>
                </Link>
              </div>
            )}
            {!token && (
              <Link href={"/login"}>
                <h2 className="font-sans font-bold text-gray-600 mt-2 sm:block hidden">
                  Login
                </h2>
              </Link>
            )}
            {!token && (
              <Link href={"/register"}>
                <button className="w-[100px] h-9 rounded-full  hidden sm:flex justify-center items-center bg-[#f8341e] font-sans font-bold text-white outline-none">
                  Register
                </button>
              </Link>
            )}
            {token && (
              <button
                onClick={removejwt}
                className="w-[100px]  h-9 rounded-full hidden sm:flex justify-center items-center bg-[#f8341e] font-sans font-bold text-white outline-none"
              >
                Logout
              </button>
            )}
            <Link href={"/cart"}>
              <div className=" relative  pt-2">
                <HiOutlineShoppingCart className="size-7" />
                {cartProducts.length > 0 && (
                  <div className="bg-[#f8341e] w-[19px] absolute h-[19px] flex justify-center items-center top-0 -right-3  text-[11px] rounded-full">
                    {cartProducts.length}
                  </div>
                )}
              </div>
            </Link>
            {token && (
              <div
                onClick={() => setNav(!nav)}
                className=" sm:hidden mt-2 w-8 h-8 rounded-full  flex justify-center items-center bg-gray-200"
              >
                <div className="relative w-5 h-5  rounded-full bg-gray-200">
                  <Image
                    src="/user.png"
                    fill
                    alt="user"
                    sizes="auto"
                    priority
                    className="w-full h-full"
                  />
                </div>
              </div>
            )}
            {!token && (
              <Link href={"/login"}>
                <button className=" sm:hidden mt-2  rounded-lg  flex justify-center items-center px-2.5 py-1.5 bg-[#f8341e] text-white ">
                  {" "}
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
        <div className="w-screen  ">
          <ul className="text-gray-600 font-sans font-bold pb-2 flex md:hidden mt-3 gap-5 justify-center ">
            <Link href={"/"}>
              <li className="hover:text-[#f8341e]">Home</li>
            </Link>
            <Link href={"/menu"}>
              <li className="hover:text-[#f8341e]">Menu</li>
            </Link>
            <Link href={"/#about-us"}>
              <li className="hover:text-[#f8341e]">About</li>
            </Link>
            <Link href={"/#contact-us"}>
              <li className="hover:text-[#f8341e]">Contact</li>
            </Link>
          </ul>
        </div>
        {nav && (
          <div
            className={`${
              !token ? "hidden" : ""
            }  p-7 items-center justify-center font-sans rounded  text-[14px] sm:hidden  text-black cursor-pointer shadow-lg font-semibold flex flex-col gap-2 absolute  top-2 right-[60px] text-sm bg-white`}
          >
            <Link href={"/profile"}>
              {" "}
              <p
                onClick={() => {
                  setNav(false);
                }}
                className="hover:text-[#f8341e] text-center"
              >
                Profile
              </p>
            </Link>
            <div
              className="flex items-center gap-1 hover:text-[#f8341e]"
              onClick={() => {
                setNav(false), removejwt();
              }}
            >
              <span>
                <BiLogOut className="size-5  hover:text-[#f8341e]" />{" "}
              </span>{" "}
              LogOut
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
