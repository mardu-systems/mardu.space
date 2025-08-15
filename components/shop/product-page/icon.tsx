"use client";

import type { LucideIcon } from "lucide-react";
import {
  RadioTower,
  ShieldCheck,
  Shuffle,
  Server,
  Wrench,
  Check,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  RadioTower,
  ShieldCheck,
  Shuffle,
  Server,
  Wrench,
  Check,
};

export function Icon({ name, className }: { name?: string; className?: string }) {
  const Cmp = name ? ICONS[name] : undefined;
  if (!Cmp) return null;
  return <Cmp className={className} aria-hidden />;
}
