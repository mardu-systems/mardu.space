"use client";

import {z} from "zod";
import * as React from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
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
import {useRecaptcha} from "@/lib/recaptcha";

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
const ROLE_GROUPS: Record<string, typeof ROLE_OPTIONS[number][]> = ROLE_OPTIONS.reduce(
    (acc, option) => {
        (acc[option.group] = acc[option.group] || []).push(option);
        return acc;
    },
    {} as Record<string, typeof ROLE_OPTIONS[number][]>,
);

// ---------- Schema ----------
const FormSchema = z.object({
    email: z.email("Bitte eine gültige E-Mail angeben"),
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

export default function NewsletterForm() {
    const form = useForm<FormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues: {email: "", role: "makerspace"},
        mode: "onSubmit",
    });

    const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");
    const [submitting, setSubmitting] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
    const executeRecaptcha = useRecaptcha();

    const onSubmit = async (values: FormValues) => {
        try {
            setSubmitting(true);
            setStatus("idle");
            setErrorMessage(null);

            const token = await executeRecaptcha("newsletter");
            if (!token) throw new Error("reCAPTCHA failed");
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({...values, token}),
            });
            if (!res.ok) throw new Error("Request failed");

            setStatus("success");
            form.resetField("email");
        } catch (e: unknown) {
            setStatus("error");
            setErrorMessage(e instanceof Error ? e.message : null);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="max-w-md md:ms-auto">
                {/* E-Mail */}
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

                {/* Rolle + Button */}
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
                                            <SelectValue placeholder="Kategorie wählen…"/>
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
                    <Alert className="mt-4 animate-fade-in" variant="destructive" role="alert" aria-live="assertive">
                        <AlertDescription>
                            {errorMessage ?? "Etwas ist schiefgelaufen. Versuch es nochmal."}
                        </AlertDescription>
                    </Alert>
                )}
            </form>
        </Form>
    );
}