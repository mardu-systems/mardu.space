"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

/* ---------- Constants & Schema (außerhalb der Komponente) ---------- */

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

const FormSchema = z.object({
    email: z.email("Bitte eine gültige E-Mail angeben"),
    role: z.enum(ROLE_OPTIONS, {message: "Bitte eine Kategorie wählen"}),
});

type FormValues = z.infer<typeof FormSchema>;

/* ------------------------------ Component ------------------------------ */

export default function SiteFooter() {
    const form = useForm<FormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues: {email: "", role: "makerspace"},
        mode: "onSubmit",
    });

    const [status, setStatus] = React.useState<"idle" | "success" | "error">(
        "idle",
    );
    const [submitting, setSubmitting] = React.useState(false);

    const onSubmit = async (values: FormValues) => {
        try {
            setSubmitting(true);
            setStatus("idle");
            // TODO: API-Aufruf / Server Action
            await new Promise((r) => setTimeout(r, 700));
            setStatus("success");
            form.reset({email: "", role: "makerspace"});
        } catch (e) {
            console.error(e);
            setStatus("error");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <footer
            className="w-full text-neutral-50 bg-[radial-gradient(ellipse_at_5%_50%,hsl(240,5%,10%)_0%,hsl(240,5%,10%)_70%,#37093F_100%)]"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <div className="flex items-center justify-start py-10 md:py-12">
                    <Image
                        src="/marduspace_logo_bg_black.svg"
                        alt="MARDU SPACE"
                        width={240}
                        height={45}
                        sizes="(max-width: 640px) 40vw, (max-width: 1024px) 22vw, 240px"
                        className="h-auto w-[clamp(120px,22vw,240px)]"
                        priority
                    />
                </div>

                {/* Hauptbereich */}
                <div className="grid grid-cols-1 gap-8 border-t border-neutral-800/70 py-12 md:grid-cols-2">
                    {/* Links: Headline */}
                    <div>
                        <h2 className="text-balance font-bold text-4xl tracking-tight sm:text-5xl">
                            Bleib auf dem Laufenden
                        </h2>
                        <p className="mt-3 text-sm/6 text-neutral-400">
                            Abonniere unseren Newsletter.
                        </p>
                    </div>

                    {/* Rechts: Formular */}
                    <div className="justify-self-end">
                        <Form {...form}>
                            <form
                                noValidate
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="max-w-md md:ms-auto"
                            >
                                {/* E-Mail (oben) */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel htmlFor="email" className="mb-2 block text-sm">
                                                E-Mail-Adresse
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    inputMode="email"
                                                    autoComplete="email"
                                                    placeholder="E-Mail-Adresse eingeben"
                                                    className="h-11"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                {/* Rolle + Button (darunter; ab sm nebeneinander) */}
                                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
                                    <FormField
                                        control={form.control}
                                        name="role"
                                        render={({field}) => (
                                            <FormItem className="flex-1">
                                                <FormLabel id="role-label" className="mb-2 block text-sm">
                                                    Wer bist du?
                                                </FormLabel>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger
                                                            aria-labelledby="role-label"
                                                            className="h-11 min-w-xs justify-between"
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
                                                                value="community-projekt">Community-Projekt</SelectItem>
                                                            <SelectItem value="agentur-studio">Agentur /
                                                                Studio</SelectItem>
                                                            <SelectItem value="unternehmen">Unternehmen</SelectItem>
                                                            <SelectItem value="medien">Medien</SelectItem>
                                                            <SelectItem value="privatperson">Privatperson</SelectItem>
                                                            <SelectItem value="sonstiges">Sonstiges</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <Button
                                        type="submit"
                                        className="px-6 bg-gradient-to-r from-[#A618C3] to-[#8B14A7] font-semibold text-white shadow-lg hover:from-[#8B14A7] hover:to-[#7A1296] focus:ring-2 focus:ring-[#A618C3] focus:ring-offset-2 sm:self-end"
                                        disabled={submitting}
                                        aria-disabled={submitting}
                                        aria-busy={submitting}
                                    >
                                        {submitting ? "Sende…" : "Anmelden"}
                                    </Button>
                                </div>

                                {/* Status */}
                                {status !== "idle" && (
                                    <Alert
                                        className="mt-4"
                                        variant={status === "success" ? "default" : "destructive"}
                                        role="status"
                                        aria-live="polite"
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

                {/* Bottom links */}
                <div className="pt-6">
                    <div
                        aria-hidden
                        className="h-px w-full bg-gradient-to-r from-[#A618C3] to-gray-500/70"
                    />
                    <div className="flex flex-col gap-6 py-6 md:flex-row md:items-center md:justify-between">
                        <nav
                            aria-label="Footer-Navigation"
                            className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-neutral-300"
                        >
                            <Link href="/faq" className="hover:text-white">
                                FAQ
                            </Link>
                            <Link href="/brand" className="hover:text-white">
                                Brand Assets
                            </Link>
                            <Link href="/fotos" className="hover:text-white">
                                Fotos
                            </Link>
                        </nav>
                        <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-300">
                            <Link href="/impressum" className="hover:text-white">
                                Impressum
                            </Link>
                            <Link href="/datenschutz" className="hover:text-white">
                                Datenschutz
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}