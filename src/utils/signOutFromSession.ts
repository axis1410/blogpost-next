import { signOut } from "next-auth/react";

export default function signOutFromSession() {
  signOut({ callbackUrl: process.env.HOME_URL });
}
