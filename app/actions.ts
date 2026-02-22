"use server";

import { encryptSession, getSession } from "@/core/auth/session";
import { request } from "@/core/lib/axios";
import { cookies } from "next/headers";

const parseThis = (str: any) => {
  try {
    return JSON.parse(JSON.stringify(str));
  } catch (error) {
    console.log("Error parsing string:", error);
    return null;
  }
};

const getToken = async () => (await cookies())?.get("access_token")?.value;

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
  try {
    const accessToken = await getToken();
    const response = await request.post("/user/family-members/", payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.data;

    return data;
  } catch (error) {
    return {
      ok: false,
      error: JSON.parse(JSON.stringify(error)),
    };
  }
};

export const getCapacityDays = async () => {
  try {
    const response = await request.get("/capacity/ramadan-days/");
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      error: JSON.parse(JSON.stringify(error)),
    };
  }
};

// app/actions.ts یا فایل مربوطه
export const getUsers = async ({
  national_code = "",
  phone = "",
  ramadan_day,
}: {
  national_code?: string;
  phone?: string;
  ramadan_day?: number;
} = {}) => {
  try {
    const accessToken = await getToken();

    const response = await request.get("/admin/users/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        national_code: national_code?.trim() || undefined,
        phone: phone?.trim() || undefined,
        ramadan_day: ramadan_day ?? undefined, // ?? بهتر از || برای عدد 0
      },
    });

    const data = response.data;
    return data;
  } catch (error) {
    return {
      ok: false,
      error: JSON.parse(JSON.stringify(error)),
    };
  }
};
export const getNationalCoedes = async () => {
  try {
    const token = await getToken();
    const response = await request.get("/admin/national-codes/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.data;
    return data;
  } catch (error) {
    return {
      ok: false,
      error: JSON.parse(JSON.stringify(error)),
    };
  }
};

export const makeUserAdmin = async (payload: any) => {
  try {
    const token = await getToken();
    const response = await request.post("/admin/promote-phone/", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.data;
    return data;
  } catch (err) {
    return {
      ok: false,
      error: JSON.parse(JSON.stringify(err)),
    };
  }
};

export const getCapacities = async () => {
  try {
    const token = await getToken();
    const response = await request.get("/admin/capacities/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.data;
    return data;
  } catch (error) {
    return {
      ok: false,
      error: JSON.parse(JSON.stringify(error)),
    };
  }
};

export const setCapacities = async (payload: any) => {
  try {
    const token = await getToken();
    const response = await request.post("/admin/capacities/set/", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.data;
    return data;
  } catch (error) {
    return {
      ok: false,
      error: JSON.parse(JSON.stringify(error)),
    };
  }
};

export const updateNationalCodes = async (payload: {
  national_code?: string;
  national_codes?: string[];
  note?: string;
}) => {
  try {
    const token = await getToken();
    const response = await request.post(
      "/admin/national-codes/save/",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    const data = await response.data;
    return data;
  } catch (error: any) {
    return parseThis(error);
  }
};

export const enquireNationalCode = async (national_code: string) => {
  try {
    const response = await request.get("/inquiry/", {
      params: {
        national_code,
      },
    });
    const data = await response.data;
    return data;
  } catch (error: any) {
    return parseThis(error);
  }
};

export const updateAttendeesCount = async (payload: {
  user_id: number;
  attendees_count: number;
}) => {
  try {
    const token = await getToken();
    const response = await request.post(
      "/admin/users/attendees-count/set/",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.data;
    return data;
  } catch (error) {
    return error;
  }
};

export const cancelRegisteration = async (phone: string) => {
  try {
    const response = await request.post(
      "/user/cancel-registration/",
      JSON.stringify({
        mobile: phone,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);

    return parseThis(error);
  }
};
