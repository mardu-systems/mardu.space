"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export default function NewsletterButton({
  primaryButtonText,
}: {
  primaryButtonText: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto h-12 px-6 rounded-lg bg-[#F5C842] hover:bg-[#FFB703] text-black font-medium text-sm tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C842] focus-visible:ring-offset-2">
          {primaryButtonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-150 max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle>Anmelden</DialogTitle>
          <DialogDescription>
            Unser kostenloser Newsletter informiert Sie regelmäßig über Produktneuheiten und
            Sonderaktionen.
          </DialogDescription>
        </DialogHeader>

        <form
          method="post"
          action="https://flow.cleverreach.com/fl/dc9cc0ca-817c-4e47-bad3-f00510d3efc3/confirm"
          target="_blank"
          className="space-y-6 pt-4 "
          onSubmit={() => setTimeout(() => setOpen(false), 2000)}
        >
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            name="email_confirm"
            aria-hidden
          />

          <div className="space-y-2">
            <Label htmlFor="global.vorname">Vorname</Label>
            <Input
              type="text"
              id="global.vorname"
              name="global.vorname"
              placeholder="Ihr Vorname"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="global.nachname">Nachname</Label>
            <Input
              type="text"
              id="global.nachname"
              name="global.nachname"
              placeholder="Ihr Nachname"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="global.firma">Firma</Label>
            <Input type="text" id="global.firma" name="global.firma" placeholder="Ihre Firma" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="after:content-['*'] after:ml-0.5 after:text-red-500">
              E-Mail
            </Label>
            <Input type="email" id="email" name="email" required placeholder="name@example.com" />
          </div>

          <div className="flex items-start space-x-3 pt-2">
            <Checkbox id="tags" name="tags[]" value="accept" required className="mt-1" />
            <Label htmlFor="tags" className="text-xs font-normal leading-relaxed">
              Ihre hier eingegebenen Daten werden lediglich zur Personalisierung des
              Newsletters verwendet und nicht an Dritte weitergegeben. Durch Absenden der
              von Ihnen eingegebenen Daten willigen Sie in die Datenverarbeitung ein und
              bestätigen unsere Datenschutzerklärung.
            </Label>
          </div>

          <Button
            type="submit"
            variant="ghost"
            className="w-full sm:w-auto h-12 px-6 rounded-lg bg-[#FFB703] hover:bg-[#FFB703] text-black font-medium text-sm tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C842] focus-visible:ring-offset-2"
          >
            Anmelden
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
