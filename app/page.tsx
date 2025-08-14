  import Image from "next/image";

export default function Home() {
    return (
        <main className="min-h-screen flex items-center justify-center p-4 bg-black relative">
            <Image
                src="_A7_9072_quer.jpg"
                alt="Hero Image"
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-black/50"/>

        </main>
    )
}