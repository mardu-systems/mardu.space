"use client";

import React from "react";
import { HelpCircle, Search, UserRound } from "lucide-react";
import Link from "next/link";

export const TOPBAR_HEIGHT = 36; // px, corresponds to Tailwind h-9

interface TopbarProps {
    showSearch?: boolean;
    showAccount?: boolean;
    showHelp?: boolean;
    salesPhone?: string;
}

export default function Topbar({
    showSearch = true,
    showAccount = true,
    showHelp = true,
    salesPhone = "+49 176 200 00 00",
}: TopbarProps) {
    return (
        <div
            className="bg-neutral-800 text-neutral-200 border-b border-black/20"
            style={{ height: TOPBAR_HEIGHT }}
        >
            <div className="mx-auto flex h-full max-w-7xl items-center justify-end gap-4 px-4 sm:px-6">
                {salesPhone && (
                    <span className="hidden md:inline text-xs">Sales: {salesPhone}</span>
                )}
                <div className="flex items-center gap-3">
                    {showHelp && (
                        <Link aria-label="Help" className="hover:text-white" href="/help">
                            <HelpCircle size={16} />
                        </Link>
                    )}
                    {showSearch && (
                        <Link aria-label="Search" className="hover:text-white" href="/search">
                            <Search size={16} />
                        </Link>
                    )}
                    {showAccount && (
                        <Link aria-label="Account" className="hover:text-white" href="/account">
                            <UserRound size={16} />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
