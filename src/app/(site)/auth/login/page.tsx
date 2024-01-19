"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const session = useSession();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitting(true);

    await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: `${window.location.origin}`,
    })
      .then((res) => {
        if (res?.error) setError(res.error);
        else window.location.replace("/");
      })
      .catch((err) => setError(err))
      .finally(() => setSubmitting(false));
  };

  if (session) {
    redirect("/");
  }

  return (
    <>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Login</h1>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4
                disabled:cursor-not-allowed"
                value={data.email}
                disabled={submitting}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                placeholder="Email"
              />
              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                value={data.password}
                disabled={submitting}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                placeholder="Password"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full text-center py-3 rounded bg-slate text-white
                bg-slate-900 hover:bg-slate-700 transition duration-100 focus:outline-none my-1"
              >
                Login
              </button>
            </form>
            {error && <p>{error}</p>}
          </div>

          <div className="text-grey-dark mt-6">
            New user?{" "}
            <Link
              className="no-underline border-b border-blue-600 text-blue-600"
              href={"/auth/register"}
            >
              Create account.
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
