"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import CapacitiesTable from "@/components/features/panel/features/capacities-table";
import { getCapacities } from "@/app/actions";   // فرض می‌کنیم این action درست کار می‌کند

const CapacitiesPage = () => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["admin-capacities"],
        queryFn: getCapacities,
        staleTime: 2 * 60 * 1000, // ۲ دقیقه
    });

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">ظرفیت روزهای رمضان</h1>
                <button
                    onClick={() => refetch()}
                    className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
                    disabled={isLoading}
                >
                    {isLoading ? "در حال بارگذاری..." : "به‌روزرسانی"}
                </button>
            </div>

            {isLoading && (
                <div className="text-center py-10 text-gray-500">در حال بارگذاری ظرفیت‌ها...</div>
            )}

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
                    خطا در دریافت اطلاعات ظرفیت‌ها
                </div>
            )}

            {!isLoading && !error && data?.ok && (
                <CapacitiesTable data={data.data} refetch={refetch} />
            )}

            {!isLoading && !error && (!data || !data.ok) && (
                <div className="text-center py-10 text-gray-600">
                    اطلاعاتی یافت نشد
                </div>
            )}
        </div>
    );
};

export default CapacitiesPage;