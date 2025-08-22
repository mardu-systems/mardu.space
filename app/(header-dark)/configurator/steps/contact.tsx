"use client";

import * as React from "react";
import {Card, CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import type {State} from "../page";

export default function ContactStep({name, email, company, message, onChange}: {
    name: string;
    email: string;
    company?: string;
    message?: string;
    onChange: (patch: Partial<State["contact"]>) => void
}) {
    return (
        <Card className="rounded-2xl border border-ink-100 bg-white/60">
            <CardContent className="p-6">
                <div className="grid sm:grid-cols-2 gap-4">
                    <Input placeholder="Name*" value={name} onChange={(e) => onChange({name: e.target.value})}/>
                    <Input placeholder="E‑Mail*" type="email" value={email}
                           onChange={(e) => onChange({email: e.target.value})}/>
                    <Input className="sm:col-span-2" placeholder="Firma (optional)" value={company}
                           onChange={(e) => onChange({company: e.target.value})}/>
                    <Textarea className="sm:col-span-2" rows={3} placeholder="Nachricht (optional)" value={message}
                              onChange={(e) => onChange({message: e.target.value})}/>
                </div>
            </CardContent>
        </Card>
    );
}

