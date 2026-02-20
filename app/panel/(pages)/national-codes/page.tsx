// app/admin/national-codes/page.tsx   یا هر مسیری که هست
"use client";

import React from "react";
import NationalsTable from "@/components/features/panel/features/nationals-table";

export default function NationalCodesPage() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">مدیریت کدهای ملی ادمین</h2>
      <NationalsTable />
    </div>
  );
}