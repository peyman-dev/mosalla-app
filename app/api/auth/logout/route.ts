// app/api/auth/logout/route.ts
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
  (await cookies()).delete("accessToken");

    return NextResponse.json(
      { success: true, message: "با موفقیت خارج شدید" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { success: false, message: "خطا در خروج" },
      { status: 500 },
    );
  }
}
