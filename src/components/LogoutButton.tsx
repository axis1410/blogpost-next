"use client";

import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <div>
      <button onClick={() => signOut({ callbackUrl: process.env.HOME_URL })}>Logout</button>
    </div>
  );
};

export default LogoutButton;
