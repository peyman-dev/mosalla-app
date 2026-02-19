"use client"

import React, { useTransition } from "react";
import { useRegisterStore } from "@/core/stores/register.store";
import { Button, Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { logInMobile } from "@/app/actions";

const schema = z.object({
    phoneNumber: z
        .string()
        .nonempty("شماره همراه الزامی است")
        .regex(/^09\d{9}$/, "شماره همراه معتبر نیست (۱۱ رقم با ۰۹)")
});

type FormData = z.infer<typeof schema>;

const PhoneNumberStep = () => {
    const { goNextStep, phoneNumber, setPhoneNumber } = useRegisterStore();
    const [isPending, startTransition] = useTransition()

    const {
        control,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            phoneNumber: phoneNumber || ""
        }
    });

    const onSubmit = (data: FormData) => {
        setPhoneNumber(data.phoneNumber);


        try {
            startTransition(async () => {
                const response = await logInMobile(data?.phoneNumber)
                console.log(response);

                if (response?.ok) {
                    goNextStep()
                } else {
                    setError("phoneNumber", {
                        message: "ورود ناموفق بود, دوباره تلاش کنید!",
                    }, {
                        shouldFocus: true
                    })
                }
            })
        } catch (error) {
            console.log(error);
            setError("phoneNumber", {
                message: "ورود ناموفق بود, دوباره تلاش کنید!",
            }, {
                shouldFocus: true
            })

        }
        // goNextStep();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full h-dvh lg:h-[70dvh] items-center flex flex-col justify-between lg:min-h-[70dvh] lg:justify-around">
            <h1 className="flex justify-center font-IranNastaliq text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                ثبت نام
            </h1>

            <div className="space-y-8 lg:space-y-11 text-center flex flex-col items-center">
                <p className="text-base lg:text-xl text-white">برای ثبت نام ابتدا شماره همراه خود را وارد کنید</p>
                <div className="w-full flex flex-col items-center gap-2">
                    <Controller
                        name="phoneNumber"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                maxLength={11}
                                inputMode="numeric"
                                className="bg-[#FFF3E266]! border-milky! outline-none! rounded-[20px]! h-[64px]! lg:w-[440px] w-[300px]! text-white! font-yekanbakh!"
                                placeholder="شماره همراه"
                                classNames={{
                                    input: "placeholder:text-white! placeholder:text-end! text-white!"
                                }}
                                dir="ltr"
                            />
                        )}
                    />
                    {errors.phoneNumber && (
                        <p className="text-red-400 text-sm font-yekanbakh">{errors.phoneNumber.message}</p>
                    )}
                </div>
            </div>

            <div className="pb-10 lg:pb-0">
                <Button
                    htmlType="submit"
                    loading={isPending}
                    disabled={isPending}
                    className="bg-milky! text-2xl! font-bold! text-[#1C514C]! border-none! h-[67px]! lg:w-[335px]! rounded-[20px]! w-[300px]! font-yekanbakh!"
                >
                    تایید
                </Button>
            </div>
        </form>
    );


};

export default PhoneNumberStep;