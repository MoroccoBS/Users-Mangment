"use client";
import { SessionProvider } from "next-auth/react";

interface SessionContextProviderProps {
  children: React.ReactNode;
}

export default function SessionContextProvider({
  children,
}: SessionContextProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
