"use client"
import { useRegisterStore } from "@/core/stores/register.store";
import React, { useEffect } from "react";

const SyncApp = () => {
    const { goNextStep } = useRegisterStore()

    useEffect(() => {
        goNextStep("PHONE_NUMBER")
    }, [])

    return null
};

export default SyncApp;
