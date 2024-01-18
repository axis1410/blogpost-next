"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/auth/register", data);

      console.log(res.data);
      router.push("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Sign up</h1>
            <form onSubmit={handleRegister}>
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                placeholder="Full Name"
              />
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })}
                placeholder="Userame"
              />
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                placeholder="Email"
              />

              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                placeholder="Password"
              />
              <button
                type="submit"
                className="w-full text-center py-3 rounded text-white
                bg-green-500 hover:bg-green-400 focus:outline-none my-1"
              >
                Create Account
              </button>
            </form>
          </div>

          <div className="text-grey-dark mt-6">
            Already have an account?
            <Link className="no-underline border-b border-blue-600 text-blue-600" href={"/login"}>
              {" "}
              Log in
            </Link>
            .
          </div>
        </div>
      </div>
    </>
  );
}
