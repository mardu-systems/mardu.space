"use client";

import * as React from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {useRecaptcha} from "@/lib/recaptcha";
import {Loader2} from "lucide-react";
import {Card, CardContent} from "@/components/ui/card";

export const contactSchema = z.object({
    name: z.string().min(1, "Bitte Name angeben"),
    email: z.email("Bitte eine gültige E-Mail angeben"),
    company: z.string().optional(),
    phone: z.string().optional(),
    message: z.string().optional(),
    consent: z.boolean().optional(),
});

export type ContactValues = z.infer<typeof contactSchema>;

type Props = {
    initialValues?: Partial<ContactValues>;
    onChange?: (values: Partial<ContactValues>) => void;
    // Submit mode: if true, shows submit button and handles POST
    submit?: boolean;
    action?: string; // default "/api/contact"
    extra?: Record<string, unknown>; // merged into POST body
    submitLabel?: string; // default "Senden"
    successMessage?: string; // default "Danke! Nachricht gesendet."
    recaptchaAction?: string; // default "contact"
    // UI
    layout?: "plain" | "card";
};

export function ContactForm({
    initialValues,
    onChange,
    submit = false,
    action = "/api/contact",
    extra,
    submitLabel = "Senden",
    successMessage = "Danke! Nachricht gesendet.",
    recaptchaAction = "contact",
    layout = "plain",
}: Props) {
    const form = useForm<ContactValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: initialValues?.name ?? "",
            email: initialValues?.email ?? "",
            company: initialValues?.company ?? "",
            phone: initialValues?.phone ?? "",
            message: initialValues?.message ?? "",
            consent: initialValues?.consent ?? false,
        },
        mode: submit ? "onSubmit" : "onChange",
    });

    React.useEffect(() => {
        if (!initialValues) return;
        form.reset({
            name: initialValues.name ?? form.getValues("name"),
            email: initialValues.email ?? form.getValues("email"),
            company: initialValues.company ?? form.getValues("company"),
            phone: initialValues.phone ?? form.getValues("phone"),
            message: initialValues.message ?? form.getValues("message"),
            consent: initialValues.consent ?? form.getValues("consent"),
        });
    }, [initialValues, form]);

    React.useEffect(() => {
        if (submit || !onChange) return;
        const sub = form.watch((values) => onChange(values));
        return () => sub.unsubscribe();
    }, [form, onChange, submit]);

    const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");
    const [submitting, setSubmitting] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
    const executeRecaptcha = useRecaptcha();

    async function handleSubmit(values: ContactValues) {
        if (!submit) return;
        try {
            setSubmitting(true);
            setStatus("idle");
            setErrorMessage(null);
            if (values.consent !== true) {
                form.setError("consent", {type: "required", message: "Bitte Zustimmung erteilen"});
                throw new Error("validation");
            }
            const token = await executeRecaptcha(recaptchaAction);
            if (!token) throw new Error("reCAPTCHA failed");
            const res = await fetch(action, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    ...values,
                    ...(extra || {}),
                    token,
                }),
            });
            if (!res.ok) throw new Error("Request failed");
            setStatus("success");
            form.reset({name: "", email: "", company: "", message: ""});
        } catch (e: unknown) {
            console.error(e);
            setStatus("error");
            setErrorMessage(e instanceof Error ? e.message : null);
        } finally {
            setSubmitting(false);
        }
    }

    const gap = "gap-4";
    const content = (
        <Form {...form}>
            <form
                noValidate
                onSubmit={submit ? form.handleSubmit(handleSubmit) : undefined}
                className={`grid sm:grid-cols-2 ${gap}`}
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Name*" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input type="email" placeholder="E‑Mail*" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="company"
                    render={({field}) => (
                        <FormItem className="sm:col-span-2">
                            <FormControl>
                                <Input placeholder="Firma (optional)" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input type="tel" placeholder="Telefon (optional)" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="message"
                    render={({field}) => (
                        <FormItem className="sm:col-span-2">
                            <FormControl>
                                <Textarea rows={3} placeholder="Nachricht (optional)" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                {submit && (
                    <FormField
                        control={form.control}
                        name="consent"
                        render={({field}) => (
                            <FormItem className="sm:col-span-2">
                                <label className="flex items-start gap-3 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={!!field.value}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                        className="mt-1 size-4 rounded border border-input bg-background text-primary focus-visible:ring-ring"
                                    />
                                    <span>
                                        Ich stimme zu, dass meine Angaben zur Beantwortung meiner Anfrage verarbeitet werden.
                                    </span>
                                </label>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                )}

                {submit && (
                    <div className="sm:col-span-2">
                        <Button
                            type="submit"
                            disabled={submitting}
                            aria-disabled={submitting}
                            aria-busy={submitting}
                        >
                            {submitting && <Loader2 className="h-4 w-4 animate-spin"/>}
                            {submitting ? "Sende…" : submitLabel}
                        </Button>
                    </div>
                )}
            </form>
            {submit && status === "success" && (
                <Alert className="mt-4 animate-fade-in" variant="default" role="status" aria-live="polite">
                    <AlertDescription>{successMessage}</AlertDescription>
                </Alert>
            )}
            {submit && status === "error" && (
                <Alert className="mt-4 animate-fade-in" variant="destructive" role="alert" aria-live="assertive">
                    <AlertDescription>
                        {errorMessage ?? "Etwas ist schiefgelaufen. Versuch es erneut."}
                    </AlertDescription>
                </Alert>
            )}
        </Form>
    );

    if (layout === "card") {
        return (
            <Card className="rounded-2xl">
                <CardContent className="p-6">{content}</CardContent>
            </Card>
        );
    }
    return content;
}

export default ContactForm;
