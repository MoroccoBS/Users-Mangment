"use client";
import dynamic from "next/dynamic";
import { Button } from "./ui/button";
import Link from "next/link";
import { signOut } from "next-auth/react";
const ThemeToggle = dynamic(() => import("./ThemeToggle"), {
  ssr: false,
  loading: () => <></>,
});
import { useSession } from "next-auth/react";

import { usePathname, useRouter } from "next/navigation";

export default function ThemeToggleProvider() {
  const session = useSession();
  const pathName = usePathname();
  const router = useRouter();
  return (
    <div className="w-full h-20 p-4 flex justify-between items-center">
      <Link href={"/"}>
        <svg
          id="logo-72"
          width="52"
          height="44"
          viewBox="0 0 53 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.2997 0L52.0461 28.6301V44H38.6311V34.1553L17.7522 13.3607L13.415 13.3607L13.415 44H0L0 0L23.2997 0ZM38.6311 15.2694V0L52.0461 0V15.2694L38.6311 15.2694Z"
            fill="#212326"
            className="fill-white mix-blend-exclusion"
          ></path>
        </svg>
      </Link>

      <div className="ml-auto flex items-center gap-4">
        <ThemeToggle />
        {session.status === "authenticated" && (
          <Button className="text-base" onClick={() => signOut()}>
            Logout
          </Button>
        )}
        {session.status === "unauthenticated" && pathName === "/users" ? (
          <Button className="text-base" onClick={() => router.push("/")}>
            SingIn
          </Button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
