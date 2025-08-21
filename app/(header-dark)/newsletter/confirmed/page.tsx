import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Newsletter bestätigt",
};

export default function NewsletterConfirmedPage() {
    return (
        <main className="min-h-screen pt-[calc(var(--app-header-height,64px)+env(safe-area-inset-top))] pb-10 flex items-center justify-center">
            <div className="max-w-xl mx-auto text-center space-y-4 px-4">
                <h1 className="text-2xl font-semibold">Danke!</h1>
                <p>Deine Newsletter-Anmeldung wurde bestätigt.</p>
            </div>
        </main>
    );
}
