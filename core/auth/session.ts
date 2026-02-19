"use server";
import { jwtVerify, SignJWT } from 'jose';
import { cookies } from "next/headers";
import { Session } from "../lib/types";

const SECRET_KEY = process.env.JWT_SECRET as string;
const ENCODED_KEY = new TextEncoder().encode(SECRET_KEY);

export async function encryptSession(session: Session) {
  return await new SignJWT(session)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(ENCODED_KEY);
}

export async function decryptSession(token: string) {
  const { payload } = await jwtVerify(token, ENCODED_KEY, {
    algorithms: ["HS256"],
  });

  return payload as Session;
}

export const getSession = async (): Promise<Session | null> => {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(
      "accessToken"
    )?.value;

    if (!sessionCookie) {
      return null;
    }

    return await decryptSession(sessionCookie);
  } catch (error) {
    return null;
  }
};
