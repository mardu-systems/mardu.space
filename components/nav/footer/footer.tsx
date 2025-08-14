"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {motion} from "framer-motion";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";

/**
 * Slush-like footer with newsletter form
 * Tech: Next.js 15 (App Router), Tailwind v4, shadcn/ui, framer-motion
 *
 * Notes
 * - Replace the <Image> src with your logo asset (SVG/PNG recommended; Next/Image does not support EPS).
 * - The submit handler is a stub – connect it to your API or an action.
 * - Respects `prefers-reduced-motion`.
 */
export default function SiteFooter() {
    const [role, setRole] = React.useState<string | undefined>("startup");
    const [email, setEmail] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [ok, setOk] = React.useState<null | boolean>(null);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setOk(null);
        try {
            // TODO: call your newsletter endpoint or Next.js server action
            await new Promise((r) => setTimeout(r, 700));
            setOk(true);
            setEmail("");
        } catch (err) {
            console.error(err);
            setOk(false);
        } finally {
            setLoading(false);
        }
    }

    return (
        <footer className="w-full bg-neutral-950 text-neutral-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Top row: logo */}
                <div className="flex items-center justify-start py-8">
                    {/* Replace with your real logo */}
                    <div className="flex items-center gap-3">
                        <Image
                            src="/logo-white.svg"
                            alt="Mardu"
                            width={112}
                            height={28}
                            className="h-7 w-auto"
                        />
                        <span className="sr-only">Mardu</span>
                    </div>
                </div>

                {/* Main area */}
                <div className="grid grid-cols-1 gap-10 border-t border-neutral-800/80 py-12 md:grid-cols-2">
                    {/* Left: Headline */}
                    <div>
                        <h2 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
                            Stay Connected
                        </h2>
                        <p className="mt-3 text-sm/6 text-neutral-400">
                            Sign up for our newsletter
                        </p>
                    </div>

                    {/* Right: Form */}
                    <div>
                        <form onSubmit={onSubmit} className="max-w-md md:ms-auto">
                            <Label htmlFor="email" className="sr-only">
                                Email address
                            </Label>
                            <div className="flex gap-3">
                                <Input
                                    id="email"
                                    type="email"
                                    inputMode="email"
                                    autoComplete="email"
                                    required
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.currentTarget.value)}
                                    className="h-11 flex-1 bg-neutral-900/60 text-base placeholder:text-neutral-500"
                                />
                                <motion.div
                                    whileHover={{scale: 1.02}}
                                    whileTap={{scale: 0.98}}
                                    className="[@media(prefers-reduced-motion:reduce)]:!scale-100"
                                >
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="h-11 px-6"
                                    >
                                        {loading ? "…" : "Sign up"}
                                    </Button>
                                </motion.div>
                            </div>

                            <div className="mt-5">
                                <Label
                                    id="audience-label"
                                    className="mb-2 block text-sm text-neutral-400"
                                >
                                    Who are you?
                                </Label>
                                <ToggleGroup
                                    type="single"
                                    value={role}
                                    onValueChange={(v) => setRole(v || undefined)}
                                    aria-labelledby="audience-label"
                                    className="flex flex-wrap gap-2"
                                >
                                    <ToggleGroupItem
                                        value="startup"
                                        className="rounded-full border-neutral-800 bg-neutral-900/60 px-4 py-2 text-sm data-[state=on]:border-neutral-200 data-[state=on]:bg-neutral-100 data-[state=on]:text-neutral-900"
                                    >
                                        Startup
                                    </ToggleGroupItem>
                                    <ToggleGroupItem
                                        value="investor"
                                        className="rounded-full border-neutral-800 bg-neutral-900/60 px-4 py-2 text-sm data-[state=on]:border-neutral-200 data-[state=on]:bg-neutral-100 data-[state=on]:text-neutral-900"
                                    >
                                        Investor
                                    </ToggleGroupItem>
                                    <ToggleGroupItem
                                        value="media"
                                        className="rounded-full border-neutral-800 bg-neutral-900/60 px-4 py-2 text-sm data-[state=on]:border-neutral-200 data-[state=on]:bg-neutral-100 data-[state=on]:text-neutral-900"
                                    >
                                        Media
                                    </ToggleGroupItem>
                                    <ToggleGroupItem
                                        value="other"
                                        className="rounded-full border-neutral-800 bg-neutral-900/60 px-4 py-2 text-sm data-[state=on]:border-neutral-200 data-[state=on]:bg-neutral-100 data-[state=on]:text-neutral-900"
                                    >
                                        Other
                                    </ToggleGroupItem>
                                </ToggleGroup>
                            </div>

                            {/* Status message */}
                            {ok !== null && (
                                <p
                                    className={
                                        "mt-3 text-sm " +
                                        (ok ? "text-emerald-400" : "text-red-400")
                                    }
                                >
                                    {ok ? "Thanks! Please check your inbox." : "Something went wrong. Try again."}
                                </p>
                            )}
                        </form>
                    </div>
                </div>

                {/* Bottom links row */}
                <div
                    className="flex flex-col gap-6 border-t border-neutral-800/80 py-6 md:flex-row md:items-center md:justify-between">
                    <nav aria-label="Footer navigation"
                         className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-neutral-300">
                        <Link href="#" className="hover:text-white">FAQ</Link>
                        <Link href="#" className="hover:text-white">Press kit</Link>
                        <Link href="#" className="hover:text-white">Photos</Link>
                        <Link href="#" className="hover:text-white">Code of conduct</Link>
                    </nav>
                    <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-400">
                        <Link href="#" className="hover:text-white">Terms & Conditions</Link>
                        <span className="block">Built by <a href="#" className="underline-offset-4 hover:underline">VASA WORKS</a></span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
