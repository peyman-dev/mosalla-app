"use client";

import React, { useState } from "react";
import { Table, Button, InputNumber, message, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Pencil } from "lucide-react";
import { toast } from "react-toastify";
import { setCapacities } from "@/app/actions";

type CapacityItem = {
  value: number;
  label: string;
  hasCapacity: boolean;
  capacity: number;
  leftCapacity: number;
};

type Props = {
  data: CapacityItem[];
  refetch: () => void;
};

const CapacitiesTable = ({ data, refetch }: Props) => {
  const [editingDay, setEditingDay] = useState<number | null>(null);
  const [newCapacity, setNewCapacity] = useState<number | null>(null);
  const [saving, setSaving] = useState<number | null>(null);

  const handleEdit = (item: CapacityItem) => {
    setEditingDay(item.value);
    setNewCapacity(item.capacity);
  };

  const handleSave = async (day: number) => {
    if (newCapacity === null || newCapacity < 0) {
      message.error("لطفاً یک عدد معتبر وارد کنید");
      return;
    }

    setSaving(day);

    try {
      const result = await setCapacities({
        ramadan_day: day,
        capacity: newCapacity,
      });

      console.log("پاسخ setCapacities:", result);

      if (result?.ok) {
        toast.success(`ظرفیت روز ${day} با موفقیت به‌روزرسانی شد`);
        refetch();
        setEditingDay(null);
        setNewCapacity(null);
      } else {
        toast.error(result?.error?.error || "خطا در ذخیره ظرفیت");
      }
    } catch (err: any) {
      console.error("خطا در setCapacities:", err);
      toast.error("خطا در ارتباط با سرور");
    } finally {
      setSaving(null);
    }
  };

  const columns: ColumnsType<CapacityItem> = [
    {
      title: "ردیف",
      key: "index",
      width: 80,
      align: "center",
      fixed: "left",
      render: (_, __, idx) => idx + 1,
    },
    {
      title: "روز رمضان",
      dataIndex: "label",
      key: "label",
      width: 180,
    },
    {
      title: "ظرفیت کل",
      key: "capacity",
      width: 160,
      align: "center",
      render: (_, record) =>
        editingDay === record.value ? (
          <InputNumber
            min={0}
            value={newCapacity ?? undefined}
            onChange={setNewCapacity}
            disabled={saving !== null}
            className="w-28"
            controls={false}
          />
        ) : (
          record.capacity.toLocaleString("fa-IR")
        ),
    },
    {
      title: "ظرفیت باقی‌مانده",
      dataIndex: "leftCapacity",
      key: "leftCapacity",
      width: 180,
      align: "center",
      render: (val) => val.toLocaleString("fa-IR"),
    },
    {
      title: "عملیات",
      key: "action",
      width: 140,
      align: "center",
      fixed: "right",
      render: (_, record) =>
        editingDay === record.value ? (
          <div className="flex items-center justify-center gap-3">
            <Button
              type="primary"
              size="small"
              onClick={() => handleSave(record.value)}
              loading={saving === record.value}
              disabled={saving !== null && saving !== record.value}
            >
              {saving === record.value ? "در حال ذخیره..." : "ذخیره"}
            </Button>

            <Button
              size="small"
              danger
              onClick={() => {
                setEditingDay(null);
                setNewCapacity(null);
              }}
              disabled={saving !== null}
            >
              انصراف
            </Button>
          </div>
        ) : (
          <Tooltip title="ویرایش ظرفیت">
            <Button
              type="text"
              icon={<Pencil size={18} />}
              onClick={() => handleEdit(record)}
              disabled={saving !== null}
              className="text-blue-600 hover:text-blue-800"
            />
          </Tooltip>
        ),
    },
  ];

  return (
    <div dir="rtl" className="w-full overflow-x-auto">
      <Table
        columns={columns}
        dataSource={data}
        rowKey="value"
        pagination={{
          pageSize: 50,
          total: data?.length,
          showTotal: (total) => `تعداد کل: ${total}`,
        }}
        scroll={{ x: 900 }}
        size="middle"
        bordered
        className="ant-table-rtl min-w-[900px] **:font-yekanbakh!"
        locale={{
          emptyText: "داده‌ای برای نمایش وجود ندارد",
        }}
      />
    </div>
  );
};

export default CapacitiesTable;