"use client"
import { useState } from 'react';

export function useToggle(initialState = false) {
    const [opened, setOpened] = useState(initialState);
    const toggle = () => setOpened(v => !v);

    return [opened, toggle] as const;
}