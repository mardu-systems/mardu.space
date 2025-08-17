"use client";

import Image from "next/image";
import {Button} from "@/components/ui/button";

/* ------ Kreisnummer (dein Component, minimal getuned) ------ */
export function CircleNumber({
                                 number,
                                 size = "w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20",
                                 borderWidth = "border-[3px] sm:border-[4px] lg:border-[6px]",
                                 textSize = "text-xl sm:text-3xl lg:text-4xl",
                                 color = "border-[#CA452A] text-[#CA452A]",
                                 className = "",
                             }: {
    number: string | number;
    size?: string;
    borderWidth?: string;
    textSize?: string;
    color?: string;
    className?: string;
}) {
    return (
        <div className={`${size} ${borderWidth} rounded-full ${color} flex items-center justify-center ${className}`}>
            <span className={`${textSize} font-black leading-none tracking-tight`}>{number}</span>
        </div>
    );
}

/* ------ Gemeinsamer, stabiler Step-Wrapper ------ */
function StepRow({
                     number,
                     orient = "left",
                     media,
                     children,
                     className = "",
                 }: {
    number: number;
    orient?: "left" | "right";
    media: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}) {
    const left = orient === "left";
    return (
        <section className={`py-16 md:py-24 ${className}`}>
            <div className="mx-auto w-full max-w-6xl px-6">
                <div className="grid grid-cols-12 gap-x-10 gap-y-10 items-start">
                    {/* Rail für die Nummer (1 Spalte) */}
                    <div
                        className={`${left ? "col-span-1 order-1" : "col-span-1 order-3"} hidden md:flex justify-center`}>
                        <CircleNumber number={number} className="mt-1"/>
                    </div>

                    {/* Media (5 Spalten) */}
                    <div
                        className={`${left ? "col-span-12 md:col-span-5 order-2" : "col-span-12 md:col-span-5 md:order-2 order-1"} flex justify-center md:justify-start`}>
                        {media}
                    </div>

                    {/* Text (6 Spalten) */}
                    <div
                        className={`${left ? "col-span-12 md:col-span-6 order-3" : "col-span-12 md:col-span-6 order-3"}`}>
                        {/* Nummer mobil oben vor dem Text */}
                        <div className="md:hidden mb-4">
                            <CircleNumber number={number}/>
                        </div>
                        <div
                            className="text-[#CA452A] leading-7 tracking-[0.005em] text-[clamp(16px,1.05vw,19px)] max-w-[56ch] text-pretty">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ===================== Einzelschritte ===================== */

export function Step1_Intro() {
    return (
        <StepRow
            number={1}
            orient="left"
            media={
                <Image
                    src="/landing/person.svg"
                    alt="Person"
                    width={192}
                    height={192}
                    className="w-24 h-24 md:w-32 md:h-32 object-contain"
                />
            }
        >
            <p>
                Jochen macht bei Harald einen Schweißkurs. Dieser findet in seinem heimischen Makerspace statt.
            </p>
            <p className="mt-4">
                Harald ist ein im Ruhestand befindlicher professioneller Schweißer, der sein Wissen und seine Erfahrung
                als Ausbilder im Makerspace gerne weitergibt.
            </p>
        </StepRow>
    );
}

export function Step2_Badge() {
    return (
        <StepRow
            number={2}
            orient="left"
            media={
                <Image
                    src="/landing/person_happy.svg"
                    alt="Person freut sich"
                    width={192}
                    height={192}
                    className="w-24 h-24 md:w-32 md:h-32 object-contain"
                />
            }
        >
            <p>
                Jochen hat erfolgreich an dem Schweißkurs teilgenommen und weiß nun, welche Gefahren von einem
                Schweißgerät ausgehen und wie man dieses fachgerecht verwendet.
            </p>
            <p className="mt-4">
                Harald hat ihm dafür das Open-Educational-Badge „Kenntnisse im Schweißen” digital verliehen.
            </p>
        </StepRow>
    );
}

export function Step3_Auth() {
    return (
        <StepRow
            number={3}
            orient="right"
            media={
                <div className="relative w-full max-w-[580px]">
                    <Image
                        src="/landing/person_schweiss_nfc.svg"
                        alt="NFC-Authentifizierung am Gerät"
                        width={820}
                        height={820}
                        className="w-full h-auto object-contain"
                        priority
                    />
                    {/* Overlay nur im Bild – keine Dopplung im Seitentext */}
                    <p className="absolute left-[clamp(10px,2vw,28px)] top-[clamp(10px,2vw,28px)] max-w-[32ch] text-[#CA452A] text-[clamp(14px,2.1vw,22px)] leading-snug whitespace-pre-line pointer-events-none select-none">
                        {`Jochen möchte nun ein Gestell für einen Wohnzimmertisch schweißen.

Hierzu authentifiziert er sich an dem mardu.space Gerät, welches dem Schweißgerät vorgeschaltet ist.`}
                    </p>
                </div>
            }
        >
            <p>
                Authentifizierung direkt am <span className="underline">mardu.space</span> Gerät – sicher und
                nachvollziehbar.
            </p>
        </StepRow>
    );
}

export function Step5_GatewayOEB() {
    return (
        <StepRow
            number={5}
            orient="left"
            media={
                <div className="relative w-full max-w-[580px]">
                    <Image
                        src="/landing/open_badge_mardu_cloud.svg"
                        alt="Open Educational Badges Cloud"
                        width={820}
                        height={820}
                        className="w-full h-auto object-contain"
                    />
                    <div
                        className="absolute right-[clamp(10px,2vw,28px)] bottom-[clamp(10px,3vw,36px)] max-w-[30ch] text-[#CA452A] text-[clamp(14px,2.1vw,22px)] leading-snug select-none">
                        <p>
                            Das Gateway von{" "}
                            <a href="https://mardu.space" target="_blank" rel="noopener noreferrer"
                               className="underline pointer-events-auto">
                                mardu.space
                            </a>{" "}
                            empfängt die Daten und fragt bei Open Education Badges an, ob die erforderlichen Kenntnisse
                            vorliegen.
                        </p>
                        <p className="mt-5">
                            Ein Offline-Cache sorgt für einen Betrieb auch bei einem <span
                            className="underline">Internetausfall</span>.
                        </p>
                    </div>
                </div>
            }
        >
            <p>Zuverlässige Prüfung der Berechtigungen – auch bei temporären Verbindungsproblemen dank
                Offline-Cache.</p>
        </StepRow>
    );
}

/* ===================== Seite ===================== */

export default function HomePage() {
    return (
        <main className="relative min-h-screen">
            {/* Hero */}
            <section className="relative w-full h-[calc(100vh-5rem)]">
                <Image src="/_A7_9072_quer.jpg" alt="Hero Image" fill priority sizes="100vw" className="object-cover"/>
                <div className="absolute inset-0 bg-black/50"/>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center text-white">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">Zugriffskontrollsysteme</h1>
                        <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed">für Makerspaces, FabLabs
                            und Schülerlabore</p>
                        <Button size="lg" className="px-8 bg-[#CA452A] hover:bg-[#B23A21]">Was braucht dein
                            Space?</Button>
                    </div>
                </div>
            </section>

            <section className="relative w-full">
                <div className="flex items-end justify-center">
                    <div className="text-center">
                        <strong className="uppercase text-[clamp(20px,4vw,80px)] leading-[0.9]">
                            Warum brauchst du Mardu.space?
                        </strong>
                    </div>
                </div>
            </section>

            <section className="relative w-full min-h-screen px-6 sm:px-12 lg:px-20 py-16">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* Linke Seite: Großes Warnsymbol */}
                    <div className="flex items-center justify-center">
                        <Image
                            src="/landing/warning.svg"
                            alt="Warnsymbol Verletzungsgefahr"
                            width={1200}
                            height={1200}
                            className="w-full h-auto max-w-2xl"
                        />
                    </div>

                    {/* Rechte Seite: Text */}
                    <div className="flex flex-col space-y-8">

                        {/* Wortwolke */}
                        {/* Wortwolke */}
                        <div className="flex justify-center">
                            <Image
                                src="/landing/words.svg"
                                alt="Wortwolke"
                                width={900}
                                height={900}
                                className="w-full h-auto"
                            />
                        </div>

                        {/* Fließtext */}
                        <div className="space-y-4 leading-relaxed text-lg">
                            <p>
                                Makerspaces und FabLabs eröffnen kreative Möglichkeiten, bringen
                                aber auch Risiken durch leistungsstarke Maschinen mit sich.
                                Besonders beim Zugang für Minderjährige ist klare Verantwortung
                                gefragt.
                            </p>
                            <p>
                                Das mardu.space System sorgt mit eigener Hard- und Software sowie
                                einer europaweit anerkannten Kenntnisdatenbank (Open Education
                                Badges) für sichere Zutritts- und Zugriffskontrollen. So werden nur
                                geschulte Nutzer freigeschaltet – und ihre Qualifikationen lassen
                                sich standortübergreifend einsetzen.
                            </p>
                        </div>

                    </div>
                </div>
            </section>


            {/* Steps */}
            <Step1_Intro/>
            <Step2_Badge/>
            <Step3_Auth/>
            <Step5_GatewayOEB/>
        </main>
    );
}