"use client"

import React from "react";
import { useRegisterStore } from "@/core/stores/register.store";
import { Button, Input, ConfigProvider } from "antd";
import fa_IR from "antd/lib/locale/fa_IR";
import dayjs from "dayjs";
import "jalaliday";
import { Plus, Trash2 } from "lucide-react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import clsx from "clsx";
import { addFamilyMembers } from "@/app/actions";
import { toast } from "react-toastify";

const nationalCodeSchema = z
    .string()
    .nonempty("کد ملی الزامی است")
    .regex(/^\d{10}$/, "کد ملی باید دقیقاً ۱۰ رقم عددی باشد");

const schema = z.object({
    fullName: z.string().min(3, "نام و نام خانوادگی الزامی است"),
    nationalCode: nationalCodeSchema,
    attendanceDay: z.number().min(1).max(30),
    familyMembers: z.array(
        z.object({
            code: nationalCodeSchema
        })
    )
});

type FormData = z.infer<typeof schema>;

const AddFamilyStep = () => {
    const { goNextStep, fullName, nationalCode, setRegistrationResult, familyMembers, setUserInfo, setFamilyMembers } = useRegisterStore();
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            fullName: fullName || "",
            nationalCode: nationalCode || "",
            attendanceDay: 7,
            familyMembers: (familyMembers && familyMembers.length > 0)
                ? familyMembers.map(m => ({ code: m }))
                : []
        }
    });

    React.useEffect(() => {
        reset({
            fullName: fullName || "",
            nationalCode: nationalCode || "",
            attendanceDay: 7,
            familyMembers: (familyMembers && familyMembers.length > 0)
                ? familyMembers.map(m => ({ code: m }))
                : []
        });
    }, [fullName, nationalCode, familyMembers, reset]);

    const { fields, append, remove } = useFieldArray({
        control,
        name: "familyMembers"
    });

    const onSubmit = async (data: FormData) => {
        const familyCodes = data.familyMembers
            .map(m => m.code.trim())
            .filter(code => code.length > 0); // حذف کدهای خالی احتمالی

        const payload = {
            attends_quran_ceremony: true,
            ramadan_day: data.attendanceDay,
            family_national_codes: familyCodes.join(",") || "", // اگر خالی بود → ""
            full_name: data.fullName.trim(),
            national_code: data.nationalCode.trim()
        };

        try {
            const response = await addFamilyMembers(payload);

            if (response?.ok) {
                toast.success("ثبت‌نام با موفقیت انجام شد");
                setRegistrationResult(response.confirmation);
                setUserInfo(payload.full_name, payload.national_code);
                setFamilyMembers(familyCodes);
                goNextStep();
            } else {
                toast.error(response?.error?.message || "خطا در ثبت اطلاعات");
            }
        } catch (error) {
            console.error("Error submitting family registration:", error);
            toast.error("خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.");
        }
    };

    const commonInputStyles = "bg-[#FFF3E236]! border-milky! border-solid! border-[1px]! h-[64px]! rounded-[20px]! text-white! font-yekanbakh! w-full";

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
                select {
                    background-color: #FFF3E236 !important;
                    border: 1px solid #FFF3E2 !important;
                    border-radius: 20px !important;
                    height: 64px !important;
                    width: 100% !important;
                    color: white !important;
                    font-family: 'yekanbakh', sans-serif !important;
                    padding-right: 16px !important;
                    appearance: none !important;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23FFF3E2' d='M6 9L1 4h10z'/%3E%3C/svg%3E") !important;
                    background-repeat: no-repeat !important;
                    background-position: left 16px center !important;
                }
                select option {
                    background: #1C514C;
                    color: white;
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
                                            className={clsx(commonInputStyles)}
                                            classNames={{
                                                input: "placeholder:text-end!"
                                            }}
                                            placeholder="کد ملی خود را وارد کنید"
                                            onWheel={(e) => e.currentTarget.blur()}
                                            dir="ltr"
                                        />
                                    )}
                                />
                                {errors.nationalCode && <p className="text-red-400 text-sm mt-1">{errors.nationalCode.message}</p>}
                            </div>
                            <div className="flex flex-col gap-3">
                                <label className="select-none text-lg text-[#FFF3E2]">
                                    روز حضور
                                </label>
                                <Controller
                                    name="attendanceDay"
                                    control={control}
                                    render={({ field }) => (
                                        <select
                                            {...field}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                            value={field.value}
                                        >
                                            {Array.from({ length: 30 }, (_, i) => i + 1).map(day => (
                                                <option key={day} value={day}>
                                                    روز {day === 1 ? "اول" : day === 2 ? "دوم" : day === 3 ? "سوم" : `${day}م`}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                />
                                {errors.attendanceDay && <p className="text-red-400 text-sm mt-1">لطفاً روز را انتخاب کنید</p>}
                            </div>
                        </div>
                    </div>
                    <div className="order-2">
                        <div className="space-y-4">
                            <p className="text-2xl md:text-3xl font-IranNastaliq! text-white">
                                اطلاعات همراهان
                            </p>
                            <p className="text-lg md:text-xl font-bold text-white">کد ملی اعضای همراه خود را وارد کنید (اختیاری)</p>
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
                                    <div className="flex justify-between items-center">
                                        <label className="select-none text-lg text-[#FFF3E2]">
                                            کد ملی همراه {index + 1}
                                        </label>
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
                                                className={clsx(commonInputStyles)}
                                                classNames={{
                                                    input: "placeholder:text-end!"
                                                }}
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