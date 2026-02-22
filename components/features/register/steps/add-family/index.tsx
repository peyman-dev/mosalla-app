"use client"

import React from "react";
import { useRegisterStore } from "@/core/stores/register.store";
import { Button, Input, ConfigProvider, Select } from "antd";
import fa_IR from "antd/lib/locale/fa_IR";
import { Plus, Trash2 } from "lucide-react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import clsx from "clsx";
import { addFamilyMembers, getCapacityDays } from "@/app/actions";
import { toast } from "react-toastify";

const nationalCodeSchema = z
    .string()
    .trim()
    .pipe(
        z.union([
            z.literal(""),
            z.string().regex(/^\d{10}$/, "کد ملی باید دقیقاً ۱۰ رقم عددی باشد"),
        ])
    );

const schema = z.object({
    fullName: z.string().min(3, "نام و نام خانوادگی الزامی است"),
    nationalCode: nationalCodeSchema,
    attendanceDay: z.number().min(1, "لطفاً روز را انتخاب کنید").max(30),
    familyMembers: z
        .array(
            z.object({
                code: nationalCodeSchema,
            })
        )
        .optional(),
});

type FormData = z.infer<typeof schema>;

type CapacityDay = {
    value: number;
    label: string;
    hasCapacity: boolean;
    capacity: number;
    leftCapacity: number;
    timestamp?: number;
};

const AddFamilyStep = () => {
    const { goNextStep, fullName, nationalCode, setRegistrationResult, familyMembers, setUserInfo, setFamilyMembers } = useRegisterStore();

    const isAlreadyRegistered = Boolean(nationalCode && nationalCode.trim().length === 10);

    const [days, setDays] = React.useState<CapacityDay[]>([]);
    const [loadingDays, setLoadingDays] = React.useState(true);

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
        setValue,
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            fullName: fullName || "",
            nationalCode: nationalCode || "",
            attendanceDay: 0,
            familyMembers: familyMembers?.length > 0 ? familyMembers.map((m) => ({ code: m })) : [],
        },
    });

    const selectedDay = watch("attendanceDay");

    React.useEffect(() => {
        let ignore = false;

        const fetchDays = async () => {
            setLoadingDays(true);
            try {
                const res = await getCapacityDays();
                console.log(res);


                if (ignore) return;

                if (res?.ok && Array.isArray(res.data)) {
                    const serverDays: CapacityDay[] = res.data;

                    const todayStart = new Date().setHours(0, 0, 0, 0);

                    const processedDays = serverDays.map((day) => ({
                        ...day,
                        disabled: day.timestamp ? day.timestamp < todayStart : false,
                    }));

                    setDays(processedDays);

                    if (!selectedDay) {
                        const firstAvailable = processedDays.find((d) => d.hasCapacity && !d.disabled);
                        if (firstAvailable) {
                            setValue("attendanceDay", firstAvailable.value);
                        }
                    }
                } else {
                    setDays(generateFallbackDays());
                }
            } catch {
                setDays(generateFallbackDays());
            } finally {
                if (!ignore) setLoadingDays(false);
            }
        };

        fetchDays();
        return () => {
            ignore = true;
        };
    }, [selectedDay, setValue]);

    const generateFallbackDays = (): CapacityDay[] => {
        return Array.from({ length: 30 }, (_, i) => {
            const day = i + 1;
            return {
                value: day,
                label: `روز ${day === 1 ? "اول" : day === 2 ? "دوم" : day === 3 ? "سوم" : `${day}م`}`,
                hasCapacity: true,
                capacity: 2000,
                leftCapacity: 999,
            };
        });
    };

    React.useEffect(() => {
        reset({
            fullName: fullName || "",
            nationalCode: nationalCode || "",
            attendanceDay: selectedDay || 0,
            familyMembers: familyMembers?.length > 0 ? familyMembers.map((m) => ({ code: m })) : [],
        });
    }, [fullName, nationalCode, familyMembers, reset, selectedDay]);

    const { fields, append, remove } = useFieldArray({
        control,
        name: "familyMembers",
    });

    const onSubmit = async (data: FormData) => {
        const selected = days.find((d) => d.value === data.attendanceDay);
        if (!selected || !selected.hasCapacity || (selected.timestamp && selected.timestamp < new Date().setHours(0, 0, 0, 0))) {
            toast.error("روز انتخاب‌شده معتبر نیست یا ظرفیت ندارد");
            return;
        }

        const mainNationalCode = isAlreadyRegistered ? "" : data.nationalCode.trim();

        const familyCodes = (data.familyMembers || [])
            .map((m) => m.code?.trim())
            .filter((code): code is string => !!code && code.length === 10);

        const payload = {
            attends_quran_ceremony: true,
            ramadan_day: data.attendanceDay,
            family_national_codes: familyCodes.join(",") || "",
            full_name: data.fullName.trim(),
            national_code: mainNationalCode,
        };

        const response = await addFamilyMembers(payload);
        console.log(response);


        if (response?.ok) {
            toast.success("ثبت‌نام با موفقیت انجام شد");
            setRegistrationResult(response.confirmation);
            setUserInfo(data.fullName.trim(), data.nationalCode.trim());
            setFamilyMembers(familyCodes);
            goNextStep();
        } else {
            toast.error(response?.error?.error || "خطا در ثبت اطلاعات");
        }
    };

    const commonInputStyles = "bg-[#FFF3E236]! border-milky! border-solid! border-[1px]! h-[64px]! rounded-[20px]! text-white! font-yekanbakh! w-full";

    const dayOptions = days.map((d) => ({
        value: d.value,
        label: `${d.label} (${d.leftCapacity} نفر باقی‌مانده)`,
        disabled: !d.hasCapacity || (d.timestamp ? d.timestamp < new Date().setHours(0, 0, 0, 0) : false),
    }));

    const selectedDayInfo = days.find((d) => d.value === selectedDay);

    return (
        <ConfigProvider locale={fa_IR} direction="rtl">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <style>{`
          input::-webkit-outer-spin-button,
          input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          input[type=number] {
            -moz-appearance: textfield;
          }
          .ant-input {
            background-color: transparent !important;
            color: white !important;
          }
          .ant-input::placeholder {
            color: rgba(255, 255, 255, 0.7) !important;
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #FFF3E266;
            border-radius: 10px;
          }
          .ant-select-selector {
            background-color: #FFF3E236 !important;
            border: 1px solid #FFF3E2 !important;
            border-radius: 20px !important;
            height: 64px !important;
            color: white !important;
            font-family: 'yekanbakh', sans-serif !important;
            padding: 0 16px !important;
          }
          .ant-select-selection-item {
            color: white !important;
            line-height: 62px !important;
          }
          .ant-select-arrow {
            color: #FFF3E2 !important;
          }
          .ant-select-dropdown {
            background: #1C514C !important;
          }
          .ant-select-item-option-content {
            color: white !important;
          }
          .ant-select-item-option-disabled .ant-select-item-option-content {
            color: rgba(255,255,255,0.4) !important;
          }
        `}</style>

                <h1 className="flex justify-center font-IranNastaliq text-4xl md:text-5xl font-bold py-6 text-white">
                    ثبت نام
                </h1>

                <div className="mt-8 md:mt-15 py-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[72px]">
                    <div className="order-1">
                        <p className="text-2xl md:text-3xl font-IranNastaliq! text-white">
                            اطلاعات شخص ثبت نام کننده
                        </p>
                        <div className="mt-8 md:mt-12 space-y-6">
                            <div className="flex flex-col gap-3">
                                <label className="select-none text-lg text-[#FFF3E2]">
                                    نام و نام خانوادگی
                                </label>
                                <Controller
                                    name="fullName"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            variant="borderless"
                                            className={commonInputStyles}
                                            placeholder="نام و نام خانوادگی خود را وارد کنید"
                                            dir="rtl"
                                        />
                                    )}
                                />
                                {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName.message}</p>}
                            </div>

                            <div className="flex flex-col gap-3">
                                <label className="select-none text-lg text-[#FFF3E2]">
                                    کد ملی
                                </label>
                                <Controller
                                    name="nationalCode"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            variant="borderless"
                                            maxLength={10}
                                            inputMode="numeric"
                                            className={clsx(commonInputStyles, "text-left")}
                                            placeholder={isAlreadyRegistered ? "کد ملی ثبت شده" : "کد ملی خود را وارد کنید"}
                                            disabled={isAlreadyRegistered}
                                            dir="ltr"
                                            onWheel={(e) => e.currentTarget.blur()}
                                        />
                                    )}
                                />
                                {errors.nationalCode && !isAlreadyRegistered && (
                                    <p className="text-red-400 text-sm mt-1">{errors.nationalCode.message}</p>
                                )}
                            </div>

                            <div className="flex flex-col gap-3">
                                <label className="select-none text-lg text-[#FFF3E2]">
                                    روز حضور
                                </label>
                                {loadingDays ? (
                                    <div className="h-[64px] bg-[#FFF3E236] rounded-[20px] animate-pulse" />
                                ) : (
                                    <Controller
                                        name="attendanceDay"
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                onChange={(value) => field.onChange(value)}
                                                options={dayOptions}
                                                placeholder="انتخاب روز حضور"
                                                className="w-full bg-primary-green! **:font-yekanbakh! *:text-white! text-white! h-12!"
                                                disabled={isSubmitting || days.length === 0}
                                                dropdownClassName="**:font-yekanbakh!"
                                                notFoundContent="هیچ روزی یافت نشد"
                                            />
                                        )}
                                    />
                                )}
                                {selectedDay > 0 &&
                                    selectedDayInfo &&
                                    (!selectedDayInfo.hasCapacity ||
                                        (selectedDayInfo.timestamp && selectedDayInfo.timestamp < new Date().setHours(0, 0, 0, 0))) && (
                                        <p className="text-red-400 text-sm mt-1">این روز قابل انتخاب نیست</p>
                                    )}
                                {errors.attendanceDay && <p className="text-red-400 text-sm mt-1">{errors.attendanceDay.message}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="order-2">
                        <div className="space-y-4">
                            <p className="text-2xl md:text-3xl font-IranNastaliq! text-white">اطلاعات همراهان</p>
                            <p className="text-lg md:text-xl font-bold text-white">
                                کد ملی اعضای همراه خود را وارد کنید
                            </p>
                            <Button
                                htmlType="button"
                                onClick={() => append({ code: "" })}
                                icon={<Plus size={16} />}
                                className="bg-transparent! rounded-[20px]! font-yekanbakh! h-[50px]! border-milky! text-white! flex items-center justify-center hover:bg-white/10!"
                            >
                                افزودن شخص جدید
                            </Button>
                        </div>

                        <div className="space-y-6 max-h-[400px] overflow-y-auto mt-8 pr-2 custom-scrollbar">
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex flex-col gap-3 animate-in fade-in duration-300">
                                    <div className="flex justify-between  items-center">
                                        <label className="select-none text-lg text-[#FFF3E2]">کد ملی همراه {index + 1}</label>
                                        <Trash2
                                            size={20}
                                            className="text-red-400 cursor-pointer hover:scale-110 transition-transform"
                                            onClick={() => remove(index)}
                                        />
                                    </div>
                                    <Controller
                                        name={`familyMembers.${index}.code`}
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                variant="borderless"
                                                maxLength={10}
                                                inputMode="numeric"
                                                className={clsx(commonInputStyles, "text-left")}
                                                placeholder="کد ملی همراه را وارد کنید"
                                                onWheel={(e) => e.currentTarget.blur()}
                                                dir="ltr"
                                            />
                                        )}
                                    />
                                    {errors.familyMembers?.[index]?.code && (
                                        <p className="text-red-400 text-sm mt-1">{errors.familyMembers[index]?.code?.message}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-12 md:mt-20 flex justify-center pb-10">
                    <Button
                        htmlType="submit"
                        loading={isSubmitting}
                        className="bg-milky! text-xl h-16! md:text-2xl! font-yekanbakh! font-bold! text-[#1C514C]! border-none! h-[60px] md:h-[67px]! w-full max-w-[335px]! rounded-[20px]! shadow-lg hover:opacity-90! transition-all"
                    >
                        ثبت نام در افطاری
                    </Button>
                </div>
            </form>
        </ConfigProvider>
    );
};

export default AddFamilyStep;