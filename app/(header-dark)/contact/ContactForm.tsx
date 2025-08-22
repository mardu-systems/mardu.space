"use client";

import * as React from "react";
import {z} from "zod";
import {Loader2} from "lucide-react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {useRecaptcha} from "@/lib/recaptcha";

const FormSchema = z.object({
    name: z.string().min(1, "Bitte Name angeben"),
    email: z.string().email("Bitte eine gültige E-Mail angeben"),
    company: z.string().optional(),
    message: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

export default function ContactForm() {
    const form = useForm<FormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues: {name: "", email: "", company: "", message: ""},
        mode: "onSubmit",
    });

    const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");
    const [submitting, setSubmitting] = React.useState(false);
    const executeRecaptcha = useRecaptcha();

    const onSubmit = async (values: FormValues) => {
        try {
            setSubmitting(true);
            setStatus("idle");
            const token = await executeRecaptcha("contact");
            if (!token) throw new Error("reCAPTCHA failed");
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({...values, token}),
            });
            if (!res.ok) throw new Error("Request failed");
            setStatus("success");
            form.reset();
        } catch (e) {
            console.error(e);
            setStatus("error");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Name*" {...field} />
                                </FormControl>
                                <FormMessage />
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
                                <FormMessage />
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
                                <FormMessage />
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
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button
                    type="submit"
                    disabled={submitting}
                    aria-disabled={submitting}
                    aria-busy={submitting}
                >
                    {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                    {submitting ? "Sende…" : "Senden"}
                </Button>
                {status === "success" && (
                    <Alert className="animate-fade-in" variant="default" role="status" aria-live="polite">
                        <AlertDescription>Danke! Nachricht gesendet.</AlertDescription>
                    </Alert>
                )}
                {status === "error" && (
                    <Alert className="animate-fade-in" variant="destructive" role="alert" aria-live="assertive">
                        <AlertDescription>
                            Etwas ist schiefgelaufen. Versuch es erneut.
                        </AlertDescription>
                    </Alert>
                )}
            </form>
        </Form>
    );
}
