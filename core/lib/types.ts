// lib/types.ts
export type User = {
  id: number;
  username: string;           // معمولاً همان شماره موبایل
  phone: string;
  full_name: string | null;
  national_code: string | null;
  attends_quran_ceremony: boolean;
  ramadan_day: number | null;
  attendance_timestamp: string | null;
  tracking_code: string | null;
  submitted_at: string | null;
  family_national_codes: string[];
};

export type Session = {
  token: string;
  tokenExpiresAt: string | null;   // ISO string
  user: User;
  // اگر بعداً نقش یا permission اضافه شد اینجا می‌تونی بذاری
};