"use client";

import * as React from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Card, CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import type {State} from "../page";

export const ContactSchema = z.object({
    name: z.string().min(1, "Bitte Name angeben"),
    email: z.string().email("Bitte eine gültige E-Mail angeben"),
    company: z.string().optional(),
    message: z.string().optional(),
});

type ContactValues = z.infer<typeof ContactSchema>;

export default function ContactStep({
    name,
    email,
    company,
    message,
    onChange,
}: {
    name: string;
    email: string;
    company?: string;
    message?: string;
    onChange: (patch: Partial<State["contact"]>) => void;
}) {
    const form = useForm<ContactValues>({
        resolver: zodResolver(ContactSchema),
        defaultValues: {name, email, company, message},
        mode: "onChange",
    });

    React.useEffect(() => {
        form.reset({name, email, company, message});
    }, [name, email, company, message, form]);

    React.useEffect(() => {
        const subscription = form.watch((values) => onChange(values));
        return () => subscription.unsubscribe();
    }, [form, onChange]);

    return (
        <Form {...form}>
            <Card className="rounded-2xl border border-ink-100 bg-white/60">
                <CardContent className="p-6">
                    <form className="grid sm:grid-cols-2 gap-4" noValidate>
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
                    </form>
                </CardContent>
            </Card>
        </Form>
    );
}

