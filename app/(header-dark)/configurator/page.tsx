import type { Metadata } from "next";
import ConfiguratorPageClient from "./ConfiguratorPageClient";

export type { State } from "./ConfiguratorPageClient";

export const metadata: Metadata = {
  title: "Konfigurator",
  description: "Stelle dein individuelles mardu.space System zusammen.",
};

export default function ConfiguratorPage() {
  return <ConfiguratorPageClient />;
}