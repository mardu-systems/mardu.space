'use client';

import * as React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// Use native input elements instead of the shadcn `Input` component
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

export const contactSchema = z.object({
  name: z.string().min(1, 'Bitte Name angeben'),
  email: z.email('Bitte eine gültige E-Mail angeben'),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().optional(),
  consent: z.boolean().optional(),
});

export type ContactValues = z.infer<typeof contactSchema>;

type Props = {
  initialValues?: Partial<ContactValues>;
  onChange?: (values: Partial<ContactValues>) => void;
  submit?: boolean;
  action?: string;
  extra?: Record<string, unknown>;
  submitLabel?: string;
  successMessage?: string;
  layout?: 'plain' | 'card';
};

export function ContactForm({
  initialValues,
  onChange,
  submit = false,
  action = '/api/contact',
  extra,
  submitLabel = 'Senden',
  successMessage = 'Danke! Nachricht gesendet',
  layout = 'plain',
}: Props) {
  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: initialValues?.name ?? '',
      email: initialValues?.email ?? '',
      company: initialValues?.company ?? '',
      phone: initialValues?.phone ?? '',
      message: initialValues?.message ?? '',
      consent: initialValues?.consent ?? false,
    },
    mode: submit ? 'onSubmit' : 'onChange',
  });

  React.useEffect(() => {
    if (!initialValues) return;
    form.reset({
      name: initialValues.name ?? form.getValues('name'),
      email: initialValues.email ?? form.getValues('email'),
      company: initialValues.company ?? form.getValues('company'),
      phone: initialValues.phone ?? form.getValues('phone'),
      message: initialValues.message ?? form.getValues('message'),
      consent: initialValues.consent ?? form.getValues('consent'),
    });
  }, [initialValues, form]);

  React.useEffect(() => {
    if (submit || !onChange) return;
    const sub = form.watch((values) => onChange(values));
    return () => sub.unsubscribe();
  }, [form, onChange, submit]);

  const [status, setStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [submitting, setSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  async function handleSubmit(values: ContactValues) {
    if (!submit) return;
    try {
      setSubmitting(true);
      setStatus('idle');
      setErrorMessage(null);
      if (values.consent !== true) {
        form.setError('consent', { type: 'required', message: 'Bitte Zustimmung erteilen' });
        throw new Error('validation');
      }
      const res = await fetch(action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          ...(extra || {}),
        }),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      form.reset({ name: '', email: '', company: '', message: '' });
    } catch (e: unknown) {
      console.error(e);
      setStatus('error');
      setErrorMessage(e instanceof Error ? e.message : null);
    } finally {
      setSubmitting(false);
    }
  }

  const gap = 'gap-4';
  const content = (
    <div className="w-full">
      <Form {...form}>
        <form
          noValidate
          onSubmit={submit ? form.handleSubmit(handleSubmit) : undefined}
          className={`grid sm:grid-cols-2 ${gap}`}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Name</FormLabel>
                <FormControl>
                  <input
                    placeholder="Name*"
                    className="rounded-none border-0 border-b border-neutral-800/70 bg-transparent px-0 py-2 focus-visible:ring-0 focus-visible:border-b focus-visible:border-neutral-800/70"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">E-Mail</FormLabel>
                <FormControl>
                  <input
                    type="email"
                    placeholder="E‑Mail*"
                    className="rounded-none border-0 border-b border-neutral-800/70 bg-transparent px-0 py-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel className="sr-only">Firma</FormLabel>
                <FormControl>
                  <input
                    placeholder="Firma (optional)"
                    className="rounded-none border-0 border-b border-neutral-800/70 bg-transparent px-0 py-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Telefon</FormLabel>
                <FormControl>
                  <input
                    type="tel"
                    placeholder="+49 123 456789"
                    className="rounded-none border-0 border-b border-neutral-800/70 bg-transparent px-0 py-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Nachricht</FormLabel>
                <FormControl>
                  <Textarea
                    rows={3}
                    placeholder="Ihre Nachricht..."
                    className="rounded-none border-0 border-b border-neutral-800/70 bg-transparent px-0 py-2"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Beschreiben Sie kurz Ihr Anliegen (optional, max. 500 Zeichen)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="consent"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <div className="flex items-start gap-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-0.5"
                    />
                  </FormControl>
                  <div className="flex-1">
                    <FormLabel className="text-sm leading-5 cursor-pointer">
                      Ich stimme zu, dass meine Angaben zur Beantwortung meiner Anfrage verarbeitet
                      werden.
                    </FormLabel>
                    <FormDescription className="text-xs text-muted-foreground mt-1">
                      Ihre Daten werden gemäß DSGVO verarbeitet und nicht an Dritte weitergegeben.
                    </FormDescription>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {submit && (
            <div className="sm:col-span-2">
              <Button
                type="submit"
                disabled={submitting}
                aria-disabled={submitting}
                aria-busy={submitting}
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {submitting ? 'Sende…' : submitLabel}
              </Button>
            </div>
          )}
        </form>
        {submit && status === 'success' && (
          <Alert
            className="mt-4 animate-fade-in"
            variant="default"
            role="status"
            aria-live="polite"
          >
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}
        {submit && status === 'error' && (
          <Alert
            className="mt-4 animate-fade-in"
            variant="destructive"
            role="alert"
            aria-live="assertive"
          >
            <AlertDescription>
              {errorMessage ?? 'Etwas ist schiefgelaufen. Versuch es erneut.'}
            </AlertDescription>
          </Alert>
        )}
      </Form>
    </div>
  );

  if (layout === 'card') {
    return (
      <Card className="rounded-2xl border-0 shadow-none bg-transparent">
        <CardContent>{content}</CardContent>
      </Card>
    );
  }
  return content;
}

export default ContactForm;
