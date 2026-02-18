"use server";

import { request } from "@/core/lib/axios";

export const logInMobile = async (phoneNumber: string) => {
  try {
    const response = await request.post("/example", {
      phone: phoneNumber,
    });
    const result = await response.data;
    return result;
  } catch (error) {
    return {
      ok: false,
      error,
    };
  }
};

export const verifyOTP = async (otp: number) => {
  try {
    const response = await request.post("/verifyOTP", otp);
    const data = await response.data
    return data
  } catch (error) {
    return {
      ok: false,
      error
    }
  }
};
