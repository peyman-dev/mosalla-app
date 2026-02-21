"use client";

import { Button, InputNumber, message, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Pencil } from "lucide-react";
import { toast } from "react-toastify";
import { useState, useMemo, useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { setCapacities } from "@/app/actions";

ModuleRegistry.registerModules([AllCommunityModule]);

type CapacityItem = {
  value: number;
  label: string;
  hasCapacity: boolean;
  capacity: number;
  leftCapacity: number;
};

interface Props {
  data: CapacityItem[];
  refetch: () => void;
}

const CapacitiesTable: React.FC<Props> = ({ data, refetch }) => {
  const [editingDay, setEditingDay] = useState<number | null>(null);
  const [newCapacity, setNewCapacity] = useState<number | null>(null);
  const [saving, setSaving] = useState<number | null>(null);

  const gridRef = useRef<any>(null);

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

      if (result?.ok) {
        toast.success(`ظرفیت روز ${day} با موفقیت به‌روزرسانی شد`);
        refetch();
        setEditingDay(null);
        setNewCapacity(null);
      } else {
        toast.error(result?.error?.error || "خطا در ذخیره ظرفیت");
      }
    } catch (err: any) {
      toast.error("خطا در ارتباط با سرور");
    } finally {
      setSaving(null);
    }
  };

  const columnDefs = useMemo(() => [
    {
      headerName: "ردیف",
      valueGetter: "node.rowIndex + 1",
      flex: 0.5,
      minWidth: 70,
      pinned: "right",
      suppressMovable: true,
      cellClass: "font-yekanbakh!"
    },
    {
      headerName: "روز رمضان",
      field: "label",
      flex: 1.4,
      minWidth: 160,
      cellClass: "font-yekanbakh!"
    },
    {
      headerName: "ظرفیت کل",
      field: "capacity",
      flex: 1.1,
      minWidth: 140,
      cellClass: "font-yekanbakh!",
      cellRenderer: (params: any) => {
        const record = params.data;
        if (editingDay === record.value) {
          return (
            <InputNumber
              min={0}
              value={newCapacity ?? undefined}
              onChange={(val) => setNewCapacity(val ?? null)}
              disabled={saving !== null}
              className="w-full font-yekanbakh!"
              controls={false}
            />
          );
        }
        return params.value.toLocaleString("fa-IR");
      },
    },
    {
      headerName: "ظرفیت باقی‌مانده",
      field: "leftCapacity",
      flex: 1.2,
      minWidth: 160,
      cellClass: "font-yekanbakh!",
      valueFormatter: (params: any) => params.value.toLocaleString("fa-IR"),
    },
    {
      headerName: "عملیات",
      flex: 0.9,
      minWidth: 130,
      pinned: "left",
      cellRenderer: (params: any) => {
        const record = params.data;
        if (editingDay === record.value) {
          return (
            <div className="flex items-center justify-center gap-3 h-full">
              <Button
                type="primary"
                size="small"
                onClick={() => handleSave(record.value)}
                loading={saving === record.value}
                disabled={saving !== null && saving !== record.value}
                className="font-yekanbakh!"
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
                className="font-yekanbakh!"
              >
                انصراف
              </Button>
            </div>
          );
        }

        return (
          <Tooltip title="ویرایش ظرفیت" className="font-yekanbakh!">
            <Button
              type="text"
              icon={<Pencil size={18} />}
              onClick={() => {
                setEditingDay(record.value);
                setNewCapacity(record.capacity);
              }}
              disabled={saving !== null}
              className="text-blue-600 hover:text-blue-800 font-yekanbakh!"
            />
          </Tooltip>
        );
      },
    },
  ], [editingDay, newCapacity, saving, handleSave]);

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
          minWidth: 80,
        }}
        onGridReady={onGridReady}
        onGridSizeChanged={onGridSizeChanged}
        overlayNoRowsTemplate='<span class="font-yekanbakh!">داده‌ای برای نمایش وجود ندارد</span>'
      />
    </div>
  );
};

export default CapacitiesTable;