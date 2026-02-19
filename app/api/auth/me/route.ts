"use server";

import { decryptSession } from "@/core/auth/session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const cookieStore = await cookies();
    const sessionCookie = await cookieStore.get(
      process.env.TOKEN_COOKIE_NAME as string,
    )?.value;

    const session = await decryptSession(sessionCookie as string);    
    return NextResponse.json(session);
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
};
