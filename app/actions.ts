"use server";

import { encryptSession, getSession } from "@/core/auth/session";
import { request } from "@/core/lib/axios";
import { access } from "fs";
import { cookies } from "next/headers";

export const logInMobile = async (phoneNumber: string) => {
  try {
    const response = await request.post("/auth/request-otp/", {
      phone: phoneNumber,
    });
    const result = await response.data;
    return result;
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      error,
    };
  }
};

export const verifyOTP = async (payload: { phone: string; otp: string }) => {
  try {
    const response = await request.post("/auth/verify-otp/", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.data;
    const cookieStore = await cookies();
    if (data?.ok) {
      cookieStore.set("access_token", data.token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        sameSite: "lax",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
    }
    return data;
  } catch (error) {
    return {
      ok: false,
      error,
    };
  }
};

export const getMe = async (accessToken: string) => {
  try {
    const response = await request.get("/user/me/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.data;
    return data;
  } catch (error) {
    return {
      ok: false,
      error,
    };
  }
};
export const completeLogin = async (payload: {
  phone: string;
  otp: string;
}) => {
  try {
    const response = await verifyOTP(payload);
    if (response?.ok) {
      const user_response = await getMe(response?.token);
      const session = await encryptSession({
        token: response?.token,
        tokenExpiresAt: response?.token_expires_at,
        user: user_response?.user,
      });
      if (!!session.length) {
        (await cookies()).set({
          name: "accessToken",
          value: session,
          httpOnly: true,
          secure: true,
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 30,
        });
        return {
          ok: true,
          encypted_session: session,
        };
      } else {
        throw Error("خطا", {
          cause: session,
        });
      }
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error,
    };
  }
};

export const addFamilyMembers = async (payload: {
  full_name: string;
  national_code: string;
  attends_quran_ceremony: boolean;
  ramadan_day: number;
  family_national_codes: string;
}) => {
  const accessToken = (await cookies())?.get("access_token")?.value;
  const response = await request.post("/user/family-members/", payload, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.data;
  return data;
};
