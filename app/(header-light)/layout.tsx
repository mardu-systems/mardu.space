import SiteShell from "@/components/layout/SiteShell";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <SiteShell headerVariant="dark">{children}</SiteShell>;
}