"use client"

import React, { useTransition } from "react";
import { Button, Input } from "antd";
import ResendOTP from "./resend-otp";
import { useRegisterStore } from "@/core/stores/register.store";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { verifyOTP, getMe } from "@/app/actions";
import { toast } from "react-toastify";

const schema = z.object({
    otp: z.string().length(6, "کد تایید باید ۴ رقم باشد")
});

type FormData = z.infer<typeof schema>;

const OTPStep = () => {
    const { goNextStep, phoneNumber } = useRegisterStore();
    const [loading, startAction] = useTransition()

    const {
        control,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            otp: ""
        }
    });

    const onSubmit = (data: FormData) => {
        // goNextStep()
        startAction(async () => {
            try {
                const response = await verifyOTP({
                    phone: phoneNumber,
                    otp: data?.otp
                })
                console.log(response);


                if (response?.ok) {
                    goNextStep()
                } else {
                    toast.error(response?.error?.error || "تایید کد با خطا مواجه شد, دوباره تلاش کنید!")
                }
            } catch (error: any) {
                toast.error(error?.message || "تایید کد با خطا مواجه شد, دوباره تلاش کنید!")
            }
        })
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full h-dvh lg:h-[70dvh] items-center flex flex-col justify-between lg:min-h-[70dvh] lg:py-20">
            <h1 className="flex justify-center font-IranNastaliq text-5xl font-bold text-white">
                ثبت نام
            </h1>

            <div className="space-y-[84px] text-center">
                <p className="text-white">کد تایید ارسال شده را وارد کنید</p>
                <div className="space-y-7!">
                    <Controller
                        name="otp"
                        control={control}
                        render={({ field }) => (
                            <Input.OTP
                                {...field}
                                className="mx-auto! flex justify-center!"
                                classNames={{
                                    input: "text-white! font-yekanbakh! text-xl! font-medium! rounded-[20px]! bg-[#FFF3E266]! size-[64px]!"
                                }}
                                length={6}
                                type="number"
                                dir="ltr"
                            />
                        )}
                    />
                    {errors.otp && (
                        <p className="text-red-400 text-sm font-yekanbakh">{errors.otp.message}</p>
                    )}
                    <ResendOTP />
                </div>
            </div>

            <div className="pb-10 lg:pb-0">
                <Button
                    htmlType="submit"
                    loading={loading}
                    className="bg-milky! text-2xl! font-bold! text-[#1C514C]! border-none! h-[67px]! lg:w-[335px]! w-[300px]! rounded-[20px]! font-yekanbakh!"
                >
                    تایید
                </Button>
            </div>
        </form>
    );
};

export default OTPStep;