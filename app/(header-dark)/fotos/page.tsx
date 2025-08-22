import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Fotos",
    description: "Einblicke in mardu.space.",
};

export default function FotosPage() {
    return (
        <main className="pt-[calc(var(--app-header-height,64px)+env(safe-area-inset-top))]">
            <section className="max-w-4xl mx-auto px-4 py-10">
                <h1 className="mb-8 text-center text-3xl font-bold">Fotos</h1>
                <p className="text-center">Hier findest du bald Fotos von mardu.space.</p>
            </section>
        </main>
    );
}
