"use client";

import signOutFromSession from "@/utils/signOutFromSession";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoMenu } from "react-icons/io5";

const Navbar = () => {
  const session = useSession();
  const user = session?.data?.user;

  let Links = [
    { name: "HOME", link: "/" },
    { name: "CREATE", link: "/create-blog" },
    { name: "PROFILE", link: "/profile" },
  ];
  let [open, setOpen] = useState(false);

  return (
    <nav className="shadow-md w-full fixed top-0 left-0 bg-zinc-800 text-white">
      <div className="md:flex items-center justify-between bg-slate_gray-100 py-4 md:px-10 px-7">
        <div className="font-bold text-2xl cursor-pointer flex items-centertext-gray-800">
          <h1 className="text-3xl text-french_gray-800 mr-1 pt-1">NT</h1>
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden text-french_gray-800"
        >
          {open ? <IoMdClose /> : <IoMenu />}
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-slate_gray-100
          md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 bg-zinc-800 transition-all duration-200 ease-in ${
            open ? " " : "top-[-490px]"
          }`}
        >
          {Links.map((navLink) => (
            <li key={navLink.name} className="md:ml-8 text-xl md:my-0 my-7">
              <Link
                href={navLink.link}
                className="text-french_gray-700 hover:text-slate_gray-700 duration-100"
              >
                {navLink.name}
              </Link>
            </li>
          ))}
          {user ? (
            <li className="bg-orange-500 hover:bg-orange-400 rounded-md p-2 md:ml-8 text-xl md:my-0 my-7">
              <button className="text-black" onClick={() => signOutFromSession()}>
                LOGOUT
              </button>
            </li>
          ) : (
            <li className="bg-orange-500 hover:bg-orange-400 rounded-md p-2 md:ml-8 text-xl md:my-0 my-7">
              <button className="text-black">SIGN IN</button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
