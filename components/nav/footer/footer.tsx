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

/* ---------- Rollen-Optionen ---------- */
const ROLE_OPTIONS = [
    {value: "fablab", label: "FabLab", group: "Einrichtungen"},
    {value: "makerspace", label: "Makerspace", group: "Einrichtungen"},
    {value: "schule", label: "Schule", group: "Bildung"},
    {value: "hochschule", label: "Universität / Hochschule", group: "Bildung"},
    {value: "oeffentliche-einrichtung", label: "Öffentliche Einrichtung", group: "Einrichtungen"},
    {value: "bibliothek", label: "Bibliothek", group: "Einrichtungen"},
    {value: "museum", label: "Museum", group: "Einrichtungen"},
    {value: "kulturzentrum", label: "Kulturzentrum", group: "Einrichtungen"},
    {value: "coworking", label: "Coworking Space", group: "Organisationen"},
    {value: "werkstatt", label: "Werkstatt", group: "Organisationen"},
    {value: "jugendzentrum", label: "Jugendzentrum", group: "Einrichtungen"},
    {value: "forschungslabor", label: "Forschungslabor", group: "Bildung"},
    {value: "community-projekt", label: "Community-Projekt", group: "Organisationen"},
    {value: "agentur-studio", label: "Agentur / Studio", group: "Organisationen"},
    {value: "unternehmen", label: "Unternehmen", group: "Organisationen"},
    {value: "medien", label: "Medien", group: "Organisationen"},
    {value: "privatperson", label: "Privatperson", group: "Sonstiges"},
    {value: "sonstiges", label: "Sonstiges", group: "Sonstiges"},
] as const;

const ROLE_VALUES = ROLE_OPTIONS.map((r) => r.value) as [string, ...string[]];

/* ---------- Schema ---------- */
const FormSchema = z.object({
    email: z.string().email("Bitte eine gültige E-Mail angeben"),
    role: z.enum(ROLE_VALUES, {message: "Bitte eine Kategorie wählen"}),
});
type FormValues = z.infer<typeof FormSchema>;

/* ---------- Success-Komponente ---------- */
function SuccessMessage({onClose}: { onClose: () => void }) {
    React.useEffect(() => {
        const t = setTimeout(onClose, 4000);
        return () => clearTimeout(t);
    }, [onClose]);

    return (
        <Alert className="mt-4" variant="default" role="status" aria-live="polite">
            <AlertDescription>
                Danke! Bitte prüfe dein Postfach.
            </AlertDescription>
        </Alert>
    );
}

/* ---------- Footer Props ---------- */
export type FooterLink = { href: string; label: string };

type SiteFooterProps = {
    navLinks?: FooterLink[];
    metaLinks?: FooterLink[];
};

/* ------------------------------ Component ------------------------------ */
export default function SiteFooter({
                                       navLinks = [],
                                       metaLinks = [],
                                   }: SiteFooterProps) {
    const form = useForm<FormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues: {email: "", role: "makerspace"},
        mode: "onSubmit",
    });

    const [status, setStatus] = React.useState<"idle" | "success" | "error">(
        "idle"
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
            className="w-full text-neutral-50 bg-[radial-gradient(ellipse_at_5%_50%,hsl(240,5%,10%)_0%,hsl(240,5%,10%)_70%,#37093F_100%)]">
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
                    <div className="justify-self-end w-full sm:w-auto">
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
                                            <FormLabel
                                                htmlFor="email"
                                                className="mb-2 block text-sm"
                                            >
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

                                {/* Rolle + Button */}
                                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
                                    <FormField
                                        control={form.control}
                                        name="role"
                                        render={({field}) => (
                                            <FormItem className="flex-1">
                                                <FormLabel
                                                    id="role-label"
                                                    className="mb-2 block text-sm"
                                                >
                                                    Wer bist du?
                                                </FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger
                                                            aria-labelledby="role-label"
                                                            className="h-11 min-w-xs justify-between"
                                                        >
                                                            <SelectValue placeholder="Kategorie wählen …"/>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="max-h-64 overflow-auto">
                                                        {Array.from(
                                                            new Set(ROLE_OPTIONS.map((r) => r.group))
                                                        ).map((group) => (
                                                            <SelectGroup key={group}>
                                                                <SelectLabel>{group}</SelectLabel>
                                                                {ROLE_OPTIONS.filter(
                                                                    (r) => r.group === group
                                                                ).map((opt) => (
                                                                    <SelectItem
                                                                        key={opt.value}
                                                                        value={opt.value}
                                                                    >
                                                                        {opt.label}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectGroup>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <Button
                                        type="submit"
                                        className="px-6 bg-gradient-to-r from-brand to-brand-dark font-semibold text-white shadow-lg hover:from-brand-dark hover:to-brand-darker focus:ring-2 focus:ring-brand focus:ring-offset-2 sm:self-end"
                                        disabled={submitting}
                                        aria-disabled={submitting}
                                        aria-busy={submitting}
                                    >
                                        {submitting ? "Sende…" : "Anmelden"}
                                    </Button>
                                </div>

                                {/* Status */}
                                {status === "success" && (
                                    <SuccessMessage onClose={() => setStatus("idle")}/>
                                )}
                                {status === "error" && (
                                    <Alert
                                        className="mt-4"
                                        variant="destructive"
                                        role="alert"
                                        aria-live="assertive"
                                    >
                                        <AlertDescription>
                                            Etwas ist schiefgelaufen. Versuch es nochmal.
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
                        className="h-px w-full bg-gradient-to-r from-brand to-gray-500/70"
                    />
                    <div className="flex flex-col gap-6 py-6 md:flex-row md:items-center md:justify-between">
                        <nav
                            aria-label="Footer-Navigation"
                            className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-neutral-300"
                        >
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="hover:text-white"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                        <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-300">
                            {metaLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="hover:text-white"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}