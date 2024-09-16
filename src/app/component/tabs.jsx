import React from 'react'
import Link from 'next/link';
import "../globals.css";

export default function Tabs({path}) {
  return (
    <section className="ml-3 sm:ml-0 ">
      <div className="flex sm:justify-center gap-4 w-full hide-scrollbar overflow-x-auto">
        <Link href={"/profile"}>
          <button
            className={`${
              path === "/profile"
                ? "bg-[#f8341e] text-white"
                : "bg-gray-300 text-gray-600"
            }  w-[80px] h-9 rounded-full  flex justify-center items-center font-sans font-bold  outline-none`}
          >
            Profile
          </button>
        </Link>
        <Link href={"/categories"}>
          <button
            className={`${
              path === "/categories"
                ? "bg-[#f8341e] text-white"
                : "bg-gray-300 text-gray-600"
            } w-[110px] h-9 rounded-full flex justify-center items-center font-sans font-bold  outline-none`}
          >
            Categories
          </button>
        </Link>
        <Link href={"/menuItems"}>
          {/* /menuItems/.test(path) this is another away to get or check params or query */}
          <button
            className={`${
              path.includes("/menuItems")
                ? "bg-[#f8341e] text-white"
                : "bg-gray-300 text-gray-600"
            } w-[110px] h-9 rounded-full  flex justify-center items-center font-sans font-bold outline-none`}
          >
            Menu Items
          </button>
        </Link>
        <Link href={"/users"}>
          <button
            className={`${
              path === "/users" || path === "users"
                ? "bg-[#f8341e] text-white"
                : "bg-gray-300 text-gray-600"
            } w-[77px] h-9 rounded-full  flex justify-center items-center  font-sans font-bold outline-none`}
          >
            Users
          </button>
        </Link>
        <Link href={"/order"}>
          <button
            className={`${
              path === "/order"
                ? "bg-[#f8341e] text-white"
                : "bg-gray-300 text-gray-600"
            } w-[80px] h-9 rounded-full  flex justify-center items-center font-sans font-bold outline-none`}
          >
            Orders
          </button>
        </Link>
      </div>
    </section>
  );
}
