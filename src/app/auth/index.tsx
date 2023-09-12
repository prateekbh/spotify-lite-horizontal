"use client";
import { getServerSession } from "next-auth/next";
import { SessionProvider } from "next-auth/react";
import { authOptions } from "../../../pages/api/[...nextauth]";

type AuthProviderProps = {
  children: React.ReactNode;
};

export async function AuthProvider({ children }: AuthProviderProps) {
  const session = await getServerSession(authOptions);
  return (
    <>
      <SessionProvider session={session}>{children}</SessionProvider>
    </>
  );
}
