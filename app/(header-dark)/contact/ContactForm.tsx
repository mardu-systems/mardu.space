"use client";

import * as React from "react";
import {useState} from "react";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {useRecaptcha} from "@/lib/recaptcha";
import {toast} from "sonner";

export default function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const executeRecaptcha = useRecaptcha();

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        try {
            const token = await executeRecaptcha("contact");
            if (!token) throw new Error("reCAPTCHA failed");
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({name, email, company, message, token}),
            });
            if (!res.ok) throw new Error("Request failed");
            toast.success("Danke! Nachricht gesendet.");
            setName("");
            setEmail("");
            setCompany("");
            setMessage("");
        } catch (err) {
            console.error(err);
            toast.error("Etwas ist schiefgelaufen. Versuch es erneut.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
                <Input placeholder="Name*" value={name} onChange={(e) => setName(e.target.value)}/>
                <Input
                    type="email"
                    placeholder="E‑Mail*"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    className="sm:col-span-2"
                    placeholder="Firma (optional)"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />
                <Textarea
                    className="sm:col-span-2"
                    rows={3}
                    placeholder="Nachricht (optional)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </div>
            <Button type="submit" disabled={loading}>
                Senden
            </Button>
        </form>
    );
}
