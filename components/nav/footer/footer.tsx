"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";


export const ROLE_OPTIONS = [
    "fablab",
    "makerspace",
    "schule",
    "hochschule",
    "verein",
    "ngo",
    "oeffentliche-einrichtung",
    "bibliothek",
    "museum",
    "kulturzentrum",
    "coworking",
    "werkstatt",
    "jugendzentrum",
    "forschungslabor",
    "community-projekt",
    "agentur-studio",
    "unternehmen",
    "medien",
    "privatperson",
    "sonstiges",
] as const;

type Role = (typeof ROLE_OPTIONS)[number];

/**
 * Slush-like footer with newsletter form
 * Tech: Next.js 15 (App Router), Tailwind v4, shadcn/ui, framer-motion
 *
 * Notes
 * - Replace the <Image> src with your logo asset (SVG/PNG recommended; Next/Image does not support EPS).
 * - The submit handler is a stub – connect it to your API or an action.
 * - Respects `prefers-reduced-motion`.
 *
 * TODO:
 * - Add email validation
 * - Integrate with newsletter API
 * - Add loading state UI
 * - Add success/error animations
 * - Add analytics tracking
 * - Test form submission
 * - Add i18n support
 * - Implement GDPR consent
 * - Add accessibility improvements
 * - Add rate limiting
 */
export default function SiteFooter() {
    const [role, setRole] = React.useState<string | undefined>("startup");
    const [email, setEmail] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [ok, setOk] = React.useState<null | boolean>(null);

    const FormSchema = z.object({
        email: z.email("Bitte eine gültige E‑Mail angeben"),
        role: z.enum(ROLE_OPTIONS, {message: "Bitte eine Kategorie wählen"}),
    });

    type FormValues = z.infer<typeof FormSchema>;

    const form = useForm<FormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues: {email: "", role: "makerspace"},
        mode: "onSubmit",
    });

    const [status, setStatus] = React.useState<"idle" | "success" | "error">(
        "idle",
    );

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
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
        <div className="dark" data-theme="dark" style={{colorScheme: "dark"}}>
            <footer className="w-full bg-radial-[at_5%_50%] from-zinc-900 from-70% to-[#37093F] to-99% text-neutral-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Top row: logo */}
                    <div className="flex items-center justify-start py-8">
                        {/* Replace with your real logo */}
                        <div className="flex items-center gap-3">
                            <Image
                                src="/marduspace_logo_bg_black.svg"
                                alt="Mardu"
                                width={240}
                                height={45}
                                sizes="(max-width: 640px) 40vw, (max-width: 1024px) 22vw, 240px"
                                className="h-auto w-[clamp(120px,22vw,240px)]"
                            />
                            <span className="sr-only">Mardu</span>
                        </div>
                    </div>

                    {/* Main area */}
                    <div className="grid grid-cols-1 gap-5 border-neutral-800/80 py-12 md:grid-cols-2">
                        {/* Left: Headline */}
                        <div>
                            <h2 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
                                Stay Connected
                            </h2>
                            <p className="mt-3 text-sm/6 text-neutral-400">
                                Sign up for our newsletter
                            </p>
                        </div>

                        {/* Right: Form – shadcn/ui only */}
                        <div>
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="max-w-md md:ms-auto"
                                >
                                    {/* Email */}
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel className="sr-only">Email address</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        inputMode="email"
                                                        autoComplete="email"
                                                        placeholder="Enter your email"
                                                        className="h-11 flex-1"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    {/* Role */}
                                    <FormField
                                        control={form.control}
                                        name="role"
                                        render={({field}) => (
                                            <FormItem className="mt-5">
                                                <FormLabel className="mb-2 block text-sm">
                                                    Wer bist du?
                                                </FormLabel>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger
                                                            aria-labelledby="role-label"
                                                            className="w-fit max-w-xs sm:max-w-sm justify-between"
                                                        >
                                                            <SelectValue placeholder="Kategorie wählen …"/>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="max-h-64 overflow-auto">
                                                        <SelectGroup>
                                                            <SelectLabel>Einrichtungen</SelectLabel>
                                                            <SelectItem value="fablab">FabLab</SelectItem>
                                                            <SelectItem value="makerspace">Makerspace</SelectItem>
                                                            <SelectItem value="schule">Schule</SelectItem>
                                                            <SelectItem value="hochschule">Universität /
                                                                Hochschule</SelectItem>
                                                            <SelectItem value="oeffentliche-einrichtung">Öffentliche
                                                                Einrichtung</SelectItem>
                                                            <SelectItem value="bibliothek">Bibliothek</SelectItem>
                                                            <SelectItem value="museum">Museum</SelectItem>
                                                            <SelectItem value="kulturzentrum">Kulturzentrum</SelectItem>
                                                            <SelectItem value="coworking">Coworking Space</SelectItem>
                                                            <SelectItem value="werkstatt">Werkstatt</SelectItem>
                                                            <SelectItem value="jugendzentrum">Jugendzentrum</SelectItem>
                                                            <SelectItem
                                                                value="forschungslabor">Forschungslabor</SelectItem>
                                                            <SelectItem
                                                                value="community-projekt">Community‑Projekt</SelectItem>
                                                            <SelectItem value="agentur-studio">Agentur /
                                                                Studio</SelectItem>
                                                            <SelectItem value="unternehmen">Unternehmen</SelectItem>
                                                            <SelectItem value="medien">Medien</SelectItem>
                                                            <SelectItem value="privatperson">Privatperson</SelectItem>
                                                            <SelectItem value="sonstiges">Sonstiges</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                                <Button type="submit" variant="secondary"
                                                        className="mt-3 w-fit whitespace-nowrap" disabled={loading}>
                                                    Anmelden
                                                </Button>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    {/* Status message */}
                                    {status !== "idle" && (
                                        <Alert
                                            className="mt-3"
                                            variant={status === "success" ? "default" : "destructive"}
                                        >
                                            <AlertDescription>
                                                {status === "success"
                                                    ? "Danke! Bitte prüfe dein Postfach."
                                                    : "Etwas ist schiefgelaufen. Versuch es nochmal."}
                                            </AlertDescription>
                                        </Alert>
                                    )}
                                </form>
                            </Form>
                        </div>
                    </div>

                    {/* Bottom links row */}
                    <div className="pt-6">
                        <div
                            aria-hidden
                            className="h-[1px] w-full bg-linear-to-r from-[#A618C3] to-gray-500 to-40%"
                        />
                        <div className="flex flex-col gap-6 py-6 md:flex-row md:items-center md:justify-between">
                            <nav aria-label="Footer-Navigation"
                                 className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-neutral-300">
                                <Link href="#" className="hover:text-white">FAQ</Link>
                                <Link href="#" className="hover:text-white">Brand Assets</Link>
                                <Link href="#" className="hover:text-white">Fotos</Link>
                            </nav>
                            <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-300">
                                <Link href="#" className="hover:text-white">Impressum</Link>
                                <Link href="#" className="hover:text-white">Datenschutz</Link>
                            </div>
                        </div>
                    </div>

                </div>
            </footer>
        </div>
    );
}