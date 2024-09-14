import React from "react";
import Link from "next/link";

export default function notfound() {
  return (
    <section className="mt-0">
      <div className=" lg:text-start  pt-[30%]  xl:pt-[20%] lg:pb-[20%] py-[23%] ">
        <div className="relative w-full flex justify-center">
          <h1 className=" -mt-14 tracking-widest text-9xl font-sans sm:text-[12rem] font-extrabold text-black">
            404
          </h1>
          <div
            className="text-white bg-[#f8341e]  px-1 text-sm sm:text-lg rounded rotate-12 absolute sm:bottom-14
             bottom-10 "
          >
            Page Not Found
          </div>
        </div>
        <div className="w-full flex justify-center">
          <button className="sm:mt-4 mt-14  relative border-[1px]  border-[#f8341e] w-36 h-14  font-medium text-lg  text-[#f8341e] ring-[#f8341e] focus:ring  outline-none ">
            <Link href={`/`}>
              <span
                className=" transition-all duration-200  translate-x-[3px] translate-y-[3px] tran inset-0 border-[#f8341e] absolute border-r-[3px] border-b-[3px] hover:translate-x-0 hover:translate-y-0 
               hover:border-r-0 hover:border-b-0"
              ></span>
              Go Home
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
}
