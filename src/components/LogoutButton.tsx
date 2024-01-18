"use client";

import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <div>
      <button onClick={() => signOut({ callbackUrl: "http://localhost:3000/" })}>Logout</button>
    </div>
  );
};

export default LogoutButton;
