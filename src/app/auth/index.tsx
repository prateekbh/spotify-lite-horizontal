"use client";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

type AuthProviderProps = {
  children: React.ReactNode;
  session: Session;
};

export async function AuthProvider({ children, session }: AuthProviderProps) {
  return (
    <>
      <SessionProvider session={session}>{children}</SessionProvider>
    </>
  );
}
