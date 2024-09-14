import React from 'react'
import Link from 'next/link';
export default function TabsForNotAdmin({path}) {
  return (
    <div className="flex justify-center gap-2">
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
  );
}
