"use client"
import { useState,useEffect } from "react";
import React from 'react'
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const router = useRouter()
     const [email, setEmail] = useState("");
     const [name, setName] = useState("");
     const [password, setPassword] = useState("");
     const [isLoading, setIsLoading] = useState(false);

      useEffect(() => {
        if (localStorage.getItem("token")) {
          router.push("/")
        }
      }, []);

       const handleSub = async (evt) => {
         evt.preventDefault();
         setIsLoading(true);
         if (password.length < 8)
           return (
             toast.error("Your Password must contain at least 8 characters "),
             setIsLoading(false)
           );
         let data = { name ,email, password };
         let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signUp`, {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify(data),
         });

         let response = await res.json();
         setTimeout(() => {
           setIsLoading(false);
           setEmail("");
           setPassword("");
           // console.log(response.token)
           if (response.success) {
             localStorage.setItem("token", response.token);
             toast.success("Your account has been created successfully");
             setTimeout(() => {
               router.push("/");
             }, 1000);
           } else {
             toast.error(response.error);
           }
         }, 1000);
       };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 pt-12 sm:pb-40 pb-36 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-[#f8341e]">
          Register
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSub} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-100 focus:bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#f8341e] sm:text-sm sm:leading-6 outline-none"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-100 focus:bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#f8341e] sm:text-sm sm:leading-6 outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-[#f8341e] sm:text-sm sm:leading-6 outline-none"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-[#f8341e] px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-[#f8341e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8341e]"
            >
              {isLoading ? "Signing..." : "Register"}
            </button>
          </div>
          <Link href={'/login'}>
          <div className="mt-7">
            <p className="text-gray-600 font-sans font-medium text-sm text-center">
              {" "}
              Existing account?{" "}
              <span className="underline">Login here &gt;</span>
            </p>
          </div>
          </Link>
        </form>
        <ToastContainer
          position="top-left"
          autoClose={1200}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </div>
    </div>
  );
}
