"use client";

import { Button, Tag, Tooltip, Modal, Input, Flex } from "antd";
import { UserKey } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAttendeesCount } from "@/app/actions";
import { toast } from "react-toastify";
import { useToggle } from "@/core/hooks/toggle.hook";
import { useState, useMemo, useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

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
  const [attendeesCount, setAttendeesCount] = useState({
    user_id: 0,
    count: 0
  });
  const [o, t] = useToggle();

  const gridRef = useRef<any>(null);

  const mutation = useMutation({
    mutationFn: ({ id, count }: { id: number; count: number }) => updateAttendeesCount({
      user_id: id,
      attendees_count: count
    }),
    onSuccess: (response) => {
      console.log(response);
      
      if (response.ok) {
        toast.success(`تعداد نفرات کاربر ${response.data?.phone || "کاربر"} با موفقیت بروزرسانی شد`);
        queryClient.invalidateQueries({ queryKey: ["users"] });
      } else {
        toast.error(response.error || "خطا در بروزرسانی تعداد نفرات");
      }
    },
    onError: () => {
      toast.error("خطا در ارتباط با سرور");
    },
  });

  const onGridReady = useCallback((params: any) => {
    gridRef.current = params;
    if (params.api) {
      params.api.sizeColumnsToFit();
    }
  }, []);

  const onGridSizeChanged = useCallback(() => {
    if (gridRef.current?.api) {
      gridRef.current.api.sizeColumnsToFit();
    }
  }, []);

  const columnDefs = useMemo(() => [
    {
      headerName: "ردیف",
      
      valueGetter: "node.rowIndex + 1",
      flex: 0.5,
      minWidth: 60,
      pinned: "right",
      suppressMovable: true,
      cellClass: "font-yekanbakh!"
    },
    {
      headerName: "نام و نام خانوادگی",
      
      field: "fullName",
      flex: 2,
      minWidth: 180,
      cellClass: "font-yekanbakh!"
    },
    {
      headerName: "کد ملی",
      
      field: "nationalCode",
      flex: 1.2,
      minWidth: 120,
      cellClass: "font-yekanbakh!"
    },
    {
      headerName: "شماره همراه",
      
      field: "phone",
      flex: 1.3,
      minWidth: 130,
      cellClass: "font-yekanbakh!"
    },
    {
      headerName: "روز رمضان",
      
      field: "ramadanDayLabel",
      flex: 0.9,
      minWidth: 100,
      cellRenderer: (params: any) => <Tag color="blue" className="font-yekanbakh!">{params.value}</Tag>,
    },
    {
      headerName: "تاریخ حضور",
      
      field: "attendanceDateShamsi",
      flex: 1.1,
      minWidth: 110,
      cellClass: "font-yekanbakh!"
    },
    {
      headerName: "کد رهگیری",
      
      field: "trackingCode",
      flex: 1,
      minWidth: 110,
      cellClass: "font-yekanbakh!"
    },
    {
      headerName: "کد ملی خانواده",
      
      field: "familyNationalCodes",
      flex: 1.4,
      minWidth: 160,
      cellRenderer: (params: any) => {
        const codes = params.value;
        return codes?.length > 0 ? (
          <div className="flex flex-wrap gap-1 items-center h-full font-yekanbakh!">
            {codes.map((code: string) => (
              <Tag key={code} color="purple" className="text-xs font-yekanbakh!">
                {code}
              </Tag>
            ))}
          </div>
        ) : (
          <span className="text-gray-400 text-sm font-yekanbakh!">—</span>
        );
      },
    },
    {
      headerName: "ثبت شده در",
      
      field: "submittedAt",
      flex: 1.3,
      minWidth: 140,
      cellClass: "font-yekanbakh!",
      valueFormatter: (params: any) => new Date(params.value).toLocaleString("fa-IR"),
    },
    {
      headerName: "عملیات",
      
      flex: 0.7,
      minWidth: 80,
      pinned: "left",
      cellRenderer: (params: any) => (
        <Tooltip title="تعداد نفرات حاضر" className="font-yekanbakh!">
          <Button
            type="text"
            icon={<UserKey size={18} />}
            onClick={() => {
              t();
              setAttendeesCount({
                user_id: params.data.id,
                count: (params.data.familyNationalCodes?.length || 0) + 1
              });
            }}
            loading={mutation.isPending}
            disabled={mutation.isPending}
            className="text-blue-600 hover:text-blue-800 font-yekanbakh!"
          />
        </Tooltip>
      ),
    },
  ], [mutation.isPending, t]);

  return (
    <div 
      className="w-full font-yekanbakh ag-theme-quartz" 
      style={{ width: "100%", height: "600px" }}
    >
      <AgGridReact
        ref={gridRef}
        rowData={data}
        columnDefs={columnDefs as any}
        enableRtl={true}
        pagination={true}
        paginationPageSize={50}
        defaultColDef={{
          resizable: true,
          sortable: true,
          filter: true,
          autoHeight: true,
          headerClass: "font-yekanbakh!",
          minWidth: 80,           // حداقل عرض کلی برای همه ستون‌ها
        }}
        onGridReady={onGridReady}
        onGridSizeChanged={onGridSizeChanged}
        overlayNoRowsTemplate='<span class="font-yekanbakh!">داده‌ای برای نمایش وجود ندارد</span>'
      />

      <Modal
        open={o}
        onCancel={t}
        title="تغییر تعداد نفرات حاضر"
        className="font-yekanbakh!"
        footer={
          <Flex justify="end" gap={8} className="font-yekanbakh!">
            <Button onClick={t} className="font-yekanbakh!">انصراف</Button>
            <Button
              type="primary"
              onClick={() => {
                mutation.mutate({ id: attendeesCount.user_id, count: attendeesCount.count });
                t();
              }}
              loading={mutation.isPending}
              disabled={attendeesCount?.count < 0 || attendeesCount?.count > 10 || mutation.isPending}
              className="font-yekanbakh!"
            >
              ثبت
            </Button>
          </Flex>
        }
        centered
      >
        <div className="my-10 flex justify-center font-yekanbakh!">
          <Input
            placeholder="مثال: 4"
            className="h-12! font-yekanbakh!"
            type="number"
            max={10}
            min={0}
            value={attendeesCount.count}
            onChange={(e) => {
              const value = e.target.value;
              setAttendeesCount(prev => ({
                ...prev,
                count: parseInt(value) || 0
              }));
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default UsersTable;