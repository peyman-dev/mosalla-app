"use client";

import { create } from "zustand";
import { Session } from "../lib/types";

const signOut = async () => {
  try {
    useSession.setState({ status: "loading" });
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    useSession.setState({ status: "unauthenticated", session: null });
  } catch {
    useSession.setState({ status: "unauthenticated", session: null });
  }
};

const revalidateSession = async () => {
  try {
    useSession.setState({ status: "loading" });

    const res = await fetch("/api/auth/me", {
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Session check failed");
    }

    const data = await res.json();
    console.log(data);
    

    if (!data || Object.keys(data).length === 0) {
      throw new Error("No valid session data");
    }

    useSession.setState({
      status: "authenticated",
      session: structuredClone(data),
    });
  } catch {
    useSession.setState({
      status: "unauthenticated",
      session: null,
    });
  }
};

type SessionState = {
  status: "loading" | "authenticated" | "unauthenticated";
  session: Session | null;
  revalidateSession: () => Promise<void>;
  signOut: () => Promise<void>;
};

export const useSession = create<SessionState>((set) => ({
  status: "loading",
  session: null,
  revalidateSession,
  signOut,
}));

if (typeof window !== "undefined") {
  revalidateSession();
}
