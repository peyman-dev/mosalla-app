"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/app/actions";
import UsersTable from "@/components/features/panel/features/users-table";
import { Input, Select, Space, Button, Spin } from "antd";

const { Search } = Input;
const { Option } = Select;

export default function UsersPage() {
  const [nationalCode, setNationalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [ramadanDay, setRamadanDay] = useState<string>("");

  // مقادیر نهایی که برای جستجو استفاده می‌شوند
  const [searchNationalCode, setSearchNationalCode] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [searchRamadanDay, setSearchRamadanDay] = useState<string>("");

  const { data, isLoading } = useQuery({
    queryKey: ["users", searchNationalCode, searchPhone, searchRamadanDay],
    queryFn: () =>
      getUsers({
        national_code: searchNationalCode,
        phone: searchPhone,
        ramadan_day: searchRamadanDay ? Number(searchRamadanDay) : undefined,
      }),
    enabled: true, // همیشه فعال است
  });


  console.log(data);
  
  const handleSearch = () => {
    setSearchNationalCode(nationalCode.trim());
    setSearchPhone(phone.trim());
    setSearchRamadanDay(ramadanDay);
  };

  const handleReset = () => {
    setNationalCode("");
    setPhone("");
    setRamadanDay("");
    setSearchNationalCode("");
    setSearchPhone("");
    setSearchRamadanDay("");
  };

  const users = data?.ok ? data.data || [] : [];

  

  return (
    <div className="p-6 space-y-6" dir="rtl">
      <h1 className="text-2xl font-bold">کاربران</h1>

      <Space wrap className="gap-4">
        <Search
          placeholder="جستجو در کد ملی..."
          value={nationalCode}
          onChange={(e) => setNationalCode(e.target.value)}
          onSearch={handleSearch}
          enterButton="جستجو"
          allowClear
          style={{ width: 260 }}
        />

        <Search
          placeholder="جستجو در شماره همراه..."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onSearch={handleSearch}
          enterButton="جستجو"
          allowClear
          style={{ width: 260 }}
        />

        <Select
          placeholder="روز رمضان"
          value={ramadanDay || undefined}
          onChange={(val) => setRamadanDay(val ?? "")}
          allowClear
          style={{ width: 160 }}
          onClear={handleSearch}
        >
          {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
            <Option key={d} value={d.toString()}>
              روز {d}
            </Option>
          ))}
        </Select>

        <Button type="primary" onClick={handleSearch}>
          اعمال فیلتر
        </Button>

        <Button onClick={handleReset}>پاک کردن</Button>
      </Space>

      {isLoading ? (
        <div className="py-12 flex justify-center">
          <Spin size="large" />
        </div>
      ) : (
        <UsersTable data={users} />
      )}
    </div>
  );
}