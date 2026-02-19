// app/api/auth/login/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Session } from "@/core/lib/types";
import { encryptSession } from "@/core/auth/session";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Session;

    // if (!session.accessToken) {
    //   return NextResponse.json(
    //     { ok: false, message: "اطلاعات ورود ناقص است" },
    //     { status: 400 },
    //   );
    // }

    const token = await encryptSession(body);

    (await cookies()).set({
      name: "accessToken",
      value: token,
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return NextResponse.json({
      ok: true,
      message: "اطلاعات کاربر باموفقیت ذخیره گردید",
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: "خطا در ورود" },
      { status: 500 },
    );
  }
}
