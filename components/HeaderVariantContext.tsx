"use client";

import {createContext, useContext, useState} from "react";

interface HeaderVariantContextType {
    variant: "dark" | "light";
    setVariant: (v: "dark" | "light") => void;
}

const HeaderVariantContext = createContext<HeaderVariantContextType | null>(null);

export function HeaderVariantProvider({children}: { children: React.ReactNode }) {
    const [variant, setVariant] = useState<"dark" | "light">("dark");

    const handleSetVariant = (v: "dark" | "light") => {
        setVariant(v);
    };

    return (
        <HeaderVariantContext.Provider value={{variant, setVariant: handleSetVariant}}>
            {children}
        </HeaderVariantContext.Provider>
    );
}

export function useHeaderVariant() {
    const context = useContext(HeaderVariantContext);
    if (!context) {
        throw new Error('useHeaderVariant muss innerhalb eines HeaderVariantProvider verwendet werden');
    }
    return context;
}