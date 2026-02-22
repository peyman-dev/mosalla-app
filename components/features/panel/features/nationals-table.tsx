"use client";

import React, { useState } from "react";
import { Table, Button, Input, Form, message, Modal, Spin } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Plus } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getNationalCoedes, updateNationalCodes } from "@/app/actions";
import { toast } from "react-toastify";

interface NationalCodeRecord {
  nationalCode: string;
  note: string;
  createdBy: string;
  createdAt: string;
}

const NationalsTable = () => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: response, isLoading } = useQuery({
    queryKey: ["national-codes"],
    queryFn: getNationalCoedes,
    select: (res) => (res?.ok ? res.data : []),
  });
  
  

  const nationalCodes: NationalCodeRecord[] = response || [];

  const mutation = useMutation({
    mutationFn: updateNationalCodes,
    onSuccess: (response) => {
      console.log(response);

      toast.success("با موفقیت ذخیره شد");
      queryClient.invalidateQueries({ queryKey: ["national-codes"] });
      setIsModalOpen(false);
      form.resetFields();
    },
    onError: (err: any) => {
      console.log(response);
      toast.error(err?.message || "خطا در ذخیره کد ملی");
    },
  });

  const handleAddSingle = (values: { nationalCode: string; note: string }) => {
    const code = values.nationalCode.trim();
    if (!/^\d{10}$/.test(code)) {
      form.setFields([
        { name: "nationalCode", errors: ["کد ملی باید دقیقاً ۱۰ رقم باشد"] },
      ]);
      return;
    }
    mutation.mutate({ national_code: code, note: values.note.trim() || undefined });
  };

  const handleAddMultiple = (values: { nationalCodes: string; note: string }) => {
    const raw = values.nationalCodes.trim();
    if (!raw) {
      message.warning("هیچ کدی وارد نشده است");
      return;
    }

    const codes = raw
      .split(/[\n,]+/)
      .map((c) => c.trim())
      .filter((c) => /^\d{10}$/.test(c));

    if (codes.length === 0) {
      message.error("هیچ کد ملی معتبر (۱۰ رقمی) پیدا نشد");
      return;
    }

    mutation.mutate({ national_codes: codes, note: values.note.trim() || undefined });
  };

  const onFinish = (values: any) => {
    if (values.nationalCode?.trim()) {
      handleAddSingle(values);
    } else if (values.nationalCodes?.trim()) {
      handleAddMultiple(values);
    } else {
      message.warning("حداقل یک کد ملی وارد کنید");
    }
  };

  const columns: ColumnsType<NationalCodeRecord> = [
    {
      title: "ردیف",
      key: "index",
      width: 80,
      align: "center",
      fixed: "left",
      render: (_, __, idx) => idx + 1,
    },
    {
      title: "کد ملی",
      dataIndex: "nationalCode",
      key: "nationalCode",
      width: 160,
    },
    {
      title: "یادداشت",
      dataIndex: "note",
      key: "note",
      ellipsis: true,
    },
    {
      title: "ایجاد شده توسط",
      dataIndex: "createdBy",
      key: "createdBy",
      width: 140,
    },
    {
      title: "تاریخ ایجاد",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 170,
      render: (text?: string) =>
        text ? new Date(text).toLocaleString("fa-IR") : "—",
    },
  ];

  return (
    <div dir="rtl" className="w-full overflow-x-auto">
      <div className="flex justify-end mb-6">
        <Button
          type="primary"
          icon={<Plus size={18} />}
          onClick={() => setIsModalOpen(true)}
        >
          افزودن کد ملی
        </Button>
      </div>

      <Modal
        title="افزودن کد ملی"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        footer={null}
        width={620}
        centered
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ note: "" }}
        >
          <Form.Item
            label="کدهای ملی (هر خط یک کد یا با کاما جدا کنید)"
            name="nationalCodes"
            rules={[{ required: false }]}
          >
            <Input.TextArea
              placeholder="0012345678\n0098765432\nیا: 0012345678,0098765432"
              rows={5}
              autoSize={{ minRows: 3, maxRows: 8 }}
            />
          </Form.Item>

          <Form.Item
            label="یا یک کد ملی"
            name="nationalCode"
            rules={[
              { required: false },
              { pattern: /^\d{10}$/, message: "کد ملی باید دقیقاً ۱۰ رقم باشد" },
            ]}
          >
            <Input placeholder="مثال: 0012345678" maxLength={10} />
          </Form.Item>

          <Form.Item label="یادداشت " name="note">
            <Input.TextArea placeholder="دلیل افزودن، منبع، یا توضیحات..." rows={2} />
          </Form.Item>

          <div className="flex justify-end gap-3 mt-6">
            <Button onClick={() => setIsModalOpen(false)}>انصراف</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={mutation.isPending}
              disabled={mutation.isPending}
            >
              ذخیره
            </Button>
          </div>
        </Form>
      </Modal>

      {isLoading ? (
        <div className="py-12 flex justify-center">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={nationalCodes}
          rowKey="nationalCode"
          pagination={{
            pageSize: 50,
            showSizeChanger: false,
            showTotal: (total) => `مجموع: ${total} کد`,
            locale: { items_per_page: "ردیف در صفحه" },
          }}
          scroll={{ x: 1200 }}
          size="middle"
          bordered
          className="ant-table-rtl min-w-[1100px]"
          locale={{
            emptyText: "هیچ کد ملی ثبت نشده است",
          }}
        />
      )}
    </div>
  );
};

export default NationalsTable;