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
import {Loader2} from "lucide-react";

// ---------- Role Options ----------
const ROLE_OPTIONS = [
    {value: "fablab", label: "FabLab", group: "Facilities"},
    {value: "makerspace", label: "Makerspace", group: "Facilities"},
    {value: "schule", label: "School", group: "Education"},
    {value: "hochschule", label: "University / College", group: "Education"},
    {value: "oeffentliche-einrichtung", label: "Public Institution", group: "Facilities"},
    {value: "bibliothek", label: "Library", group: "Facilities"},
    {value: "museum", label: "Museum", group: "Facilities"},
    {value: "kulturzentrum", label: "Cultural Center", group: "Facilities"},
    {value: "coworking", label: "Coworking Space", group: "Organizations"},
    {value: "werkstatt", label: "Workshop", group: "Organizations"},
    {value: "jugendzentrum", label: "Youth Center", group: "Facilities"},
    {value: "forschungslabor", label: "Research Lab", group: "Education"},
    {value: "community-projekt", label: "Community Project", group: "Organizations"},
    {value: "agentur-studio", label: "Agency / Studio", group: "Organizations"},
    {value: "unternehmen", label: "Company", group: "Organizations"},
    {value: "medien", label: "Media", group: "Organizations"},
    {value: "privatperson", label: "Private Person", group: "Other"},
    {value: "sonstiges", label: "Other", group: "Other"},
] as const;

const ROLE_VALUES = ROLE_OPTIONS.map((r) => r.value) as [string, ...string[]];

// Precompute groups once
const ROLE_GROUPS = ROLE_OPTIONS.reduce<Record<string, typeof ROLE_OPTIONS>>(
    (acc, option) => {
        acc[option.group] = acc[option.group] || [];
        acc[option.group].push(option);
        return acc;
    },
    {}
);

// ---------- Schema ----------
const FormSchema = z.object({
    email: z.string().email("Bitte eine gültige E-Mail angeben"),
    role: z.enum(ROLE_VALUES, {message: "Bitte eine Kategorie wählen"}),
});
type FormValues = z.infer<typeof FormSchema>;

// ---------- Success Component ----------
const SuccessMessage = React.memo(function SuccessMessage({onClose}: { onClose: () => void }) {
    React.useEffect(() => {
        const t = setTimeout(onClose, 4000);
        return () => clearTimeout(t);
    }, [onClose]);

    return (
        <Alert className="mt-4 animate-fade-in" variant="default" role="status" aria-live="polite">
            <AlertDescription>Danke! Bitte prüfe dein Postfach.</AlertDescription>
        </Alert>
    );
});

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

    const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");
    const [submitting, setSubmitting] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

    const onSubmit = async (values: FormValues) => {
        try {
            setSubmitting(true);
            setStatus("idle");
            setErrorMessage(null);
            // TODO: real API call
            await new Promise((r) => setTimeout(r, 1000));
            setStatus("success");
            form.resetField("email"); // nur Email zurücksetzen
        } catch (e: any) {
            setStatus("error");
            setErrorMessage(e?.message ?? null);
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
                        loading="lazy"
                    />
                </div>

                {/* Main */}
                <div className="grid grid-cols-1 gap-8 border-t border-neutral-800/70 py-12 md:grid-cols-2">
                    <div>
                        <h2 className="text-balance font-bold text-4xl tracking-tight sm:text-5xl">
                            Bleib auf dem Laufenden
                        </h2>
                        <p className="mt-3 text-sm/6 text-neutral-400">
                            Abonniere unseren Newsletter.
                        </p>
                    </div>

                    <div className="w-full sm:w-auto">
                        <Form {...form}>
                            <form
                                noValidate
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="max-w-md md:ms-auto"
                            >
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
                                                            className="h-11 w-full sm:w-auto justify-between"
                                                        >
                                                            <SelectValue placeholder="Choose category..."/>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="max-h-64 overflow-auto">
                                                        {Object.entries(ROLE_GROUPS).map(([group, items]) => (
                                                            <SelectGroup key={group}>
                                                                <SelectLabel>{group}</SelectLabel>
                                                                {items.map((opt) => (
                                                                    <SelectItem key={opt.value} value={opt.value}>
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
                                        className="px-6 bg-gradient-to-r from-brand to-brand-dark font-semibold text-white shadow-lg hover:from-brand-dark hover:to-brand-darker focus:ring-2 focus:ring-brand focus:ring-offset-2 sm:w-auto w-full flex items-center justify-center gap-2"
                                        disabled={submitting}
                                        aria-disabled={submitting}
                                        aria-busy={submitting}
                                    >
                                        {submitting && <Loader2 className="h-4 w-4 animate-spin"/>}
                                        {submitting ? "Sende…" : "Anmelden"}
                                    </Button>
                                </div>

                                {status === "success" && <SuccessMessage onClose={() => setStatus("idle")}/>}
                                {status === "error" && (
                                    <Alert
                                        className="mt-4 animate-fade-in"
                                        variant="destructive"
                                        role="alert"
                                        aria-live="assertive"
                                    >
                                        <AlertDescription>
                                            {errorMessage ?? "Etwas ist schiefgelaufen. Versuch es nochmal."}
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </form>
                        </Form>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-6">
                    <div aria-hidden className="h-px w-full bg-gradient-to-r from-brand to-gray-500/70"/>
                    <div className="flex flex-col gap-6 py-6 md:flex-row md:items-center md:justify-between">
                        <nav
                            aria-label="Footer Navigation"
                            className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-neutral-300"
                        >
                            {navLinks.map((link) => (
                                <Link key={link.href} href={link.href} className="hover:text-white">
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                        <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-300">
                            {metaLinks.map((link) => (
                                <Link key={link.href} href={link.href} className="hover:text-white">
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