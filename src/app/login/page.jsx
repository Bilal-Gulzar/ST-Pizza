"use client"
import React from 'react'
import { useState,useEffect } from 'react';
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Link from 'next/link';

export default function Login() {
  const router = useRouter() 
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [isLoading, setIsLoading] = useState(false);

 useEffect(() => {
   if (localStorage.getItem("token")) {
     router.push("/");
   }
 }, []);

   const handleSub = async (evt) => {
     evt.preventDefault();
      setIsLoading(true)
     let data = { email, password };
     let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(data),
     });

     let response = await res.json();
     setTimeout(() => {
       setEmail("");
       setPassword("");
       setIsLoading(false)
       if (response.success) {
         localStorage.setItem("token", response.token);
         toast.success("You are successfully logged in");
         setTimeout(() => {
           router.push(`${process.env.NEXT_PUBLIC_HOST}`, { redirect: true });
         }, 1000);
       } else {
         toast.error(response.error);
       }
     }, 1000);
   };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center  px-6 pb-36 sm:pb-40 pt-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-[#f8341e]">
          Login
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSub} className="space-y-6">
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
              {isLoading ? "Loging..." : "Login"}
            </button>
          </div>
          <Link href={'/register'}>
          <div className='sm:hidden'>
            <p className="text-gray-600 font-sans mt-5 font-medium text-sm text-center">
              {" "}
              or{" "}
              <span className="underline ">SignUp?</span>
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
