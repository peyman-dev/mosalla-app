"use client";

import React from "react";
import { Table, Button, Tag, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { UserKey } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeUserAdmin } from "@/app/actions";
import { toast } from "react-toastify";

interface UserRecord {
  id: number;
  fullName: string;
  phone: string;
  nationalCode: string;
  ramadanDay: number;
  ramadanDayLabel: string;
  attendanceDateShamsi: string;
  trackingCode: string;
  submittedAt: string;
  familyNationalCodes: string[];
}

interface Props {
  data: UserRecord[];
}

const UsersTable: React.FC<Props> = ({ data }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: makeUserAdmin,
    onSuccess: (response) => {
        console.log(response);
        
      if (response.ok) {
        toast.success(`${response.data?.phone || "کاربر"} با موفقیت ادمین شد`);
        queryClient.invalidateQueries({ queryKey: ["users"] });
      } else {
        toast.error(response.error || "خطا در ارتقا به ادمین");
      }
    },
    onError: () => {
      toast.error("خطا در ارتباط با سرور");
    },
  });

  const columns: ColumnsType<UserRecord> = [
    {
      title: "ردیف",
      key: "index",
      width: 80,
      align: "center",
      fixed: "left",
      render: (_, __, idx) => idx + 1,
    },
    {
      title: "نام و نام خانوادگی",
      dataIndex: "fullName",
      key: "fullName",
      width: 220,
    },
    {
      title: "کد ملی",
      dataIndex: "nationalCode",
      key: "nationalCode",
      width: 140,
    },
    {
      title: "شماره همراه",
      dataIndex: "phone",
      key: "phone",
      width: 140,
    },
    {
      title: "روز رمضان",
      dataIndex: "ramadanDayLabel",
      key: "ramadanDayLabel",
      width: 110,
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "تاریخ حضور",
      dataIndex: "attendanceDateShamsi",
      key: "attendanceDateShamsi",
      width: 130,
    },
    {
      title: "کد رهگیری",
      dataIndex: "trackingCode",
      key: "trackingCode",
      width: 160,
    },
    {
      title: "کد ملی خانواده",
      dataIndex: "familyNationalCodes",
      key: "familyNationalCodes",
      width: 220,
      render: (codes: string[]) =>
        codes?.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {codes.map((code) => (
              <Tag key={code} color="purple" className="text-xs">
                {code}
              </Tag>
            ))}
          </div>
        ) : (
          <span className="text-gray-400 text-sm">—</span>
        ),
    },
    {
      title: "ثبت شده در",
      dataIndex: "submittedAt",
      key: "submittedAt",
      width: 170,
      render: (text: string) => new Date(text).toLocaleString("fa-IR"),
    },
    {
      title: "عملیات",
      key: "action",
      width: 100,
      fixed: "right",
      align: "center",
      render: (_, record) => (
        <Tooltip title="ارتقا به ادمین">
          <Button
            type="text"
            icon={<UserKey size={18} />}
            onClick={() => mutation.mutate(record.phone)}
            loading={mutation.isPending}
            disabled={mutation.isPending}
            className="text-blue-600 hover:text-blue-800"
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{
          pageSize: 50,
          showSizeChanger: false,
          showTotal: (total) => `مجموع: ${total} نفر`,
          locale: { items_per_page: "نفر در صفحه" },
        }}
        scroll={{ x: 1200 }}
        size="middle"
        bordered
        className="ant-table-rtl **:font-yekanbakh! min-w-[1100px]"
        locale={{
          emptyText: "داده‌ای برای نمایش وجود ندارد",
        }}
      />
    </div>
  );
};

export default UsersTable;