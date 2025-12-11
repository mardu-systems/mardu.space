'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';
import CircleNumber from '@/components/circle-number';
import DashedConnector from '@/components/dashed-connector';
import HeroSection from '@/components/utilities/hero-section';
import CTASection from '@/components/utilities/cta-section';
import FeatureSection from '@/components/utilities/feature-section';
import ThreeArguments from '@/components/utilities/three-arguments';
import Foerderung from '@/components/utilities/foerderung';
import Link from 'next/link';

/* ===================== Seite ===================== */

export default function HomePage() {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <main className="relative min-h-screen bg-[#F5F6F7] flex flex-col justify-center md:justify-start">
      {/* Hero Header Section */}
      <HeroSection
        title="Zugriffskontrollsysteme für Makerspaces, FabLabs und Schülerlabore"
        description={
          <>
            <p className="mb-4">
              Makerspaces brauchen klare Verantwortung – besonders beim Zugang für Minderjährige.
            </p>
            <p>
              mardu.space stellt mit eigener Hard- und Software sowie einer europaweit anerkannten 
              Kompetenzdatenbank sicher, dass nur geschulte Personen Zugang zu Maschinen erhalten – 
              standortübergreifend und zuverlässig.
            </p>
          </>
        }
        buttonText='Jetzt Demo vereinbaren'
        imageSrc="/_A7_9072_quer.jpg"
        imageAlt="Zugriffskontrollsysteme im Makerspace"
      />

      <FeatureSection
        title="Sicherheit & Verantwortung in Makerspaces"
        description={
          <>
            <p>
              Makerspaces und FabLabs eröffnen kreative Möglichkeiten, bringen aber auch Risiken
              durch leistungsstarke Maschinen mit sich. Besonders beim Zugang für Minderjährige
              ist klare Verantwortung gefragt.
            </p>
            <p className="mt-4">
              Das mardu.space System sorgt mit eigener Hard- und Software sowie einer europaweit
              anerkannten Kenntnisdatenbank (Open Education Badges) für sichere Zutritts- und
              Zugriffskontrollen. So werden nur geschulte Nutzer freigeschaltet – und ihre
              Qualifikationen lassen sich standortübergreifend einsetzen.
            </p>
          </>
        }
        imageSrc="/landing/warning.svg"
        imageAlt="Warnsymbol Verletzungsgefahr"
        buttonText="Mehr erfahren"
        buttonHref="#info"
        className="mb-20"
      />

      <div ref={timelineRef} className="relative mt-9">
        <DashedConnector rootRef={timelineRef} offsetBeforePoint={50} strokeWidth={5} />
        <section className="w-full py-8 md:py-10 z-20">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-12 gap-6 md:gap-10 items-center">
              <div className="col-span-2 flex justify-center md:justify-start">
                <Image
                  src="/landing/person.svg"
                  alt="Person"
                  width={192}
                  height={192}
                  className="w-24 h-24 md:w-32 md:h-32 object-contain"
                  loading="lazy"
                />
              </div>

              <div className="col-span-7 md:col-span-4">
                <div className="text-accent text-sm sm:text-base leading-snug tracking-[0.005em]">
                  <p>
                    Jochen macht bei Harald einen Schweißkurs. Dieser findet in seinem heimischen
                    Makerspace statt.
                  </p>
                  <p className="mt-4">
                    Harald ist ein im Ruhestand befindlicher professioneller Schweißer, der sein
                    Wissen und seine Erfahrung als Ausbilder im Makerspace gerne weitergibt.
                  </p>
                </div>
              </div>

              <div className="col-span-3 md:col-span-2 flex justify-top">
                <CircleNumber number={1} className="mt-1" anchor />
              </div>

              <div className="col-span-12 md:col-span-4 md:col-start-9 md:translate-y-[-40%] text-right">
                <h2 className="text-primary whitespace-pre-line uppercase text-3xl sm:text-4xl md:text-6xl text-right">
                  {`WIE KANN
                                    MARDU.SPACE
                                    DIR HELFEN?`}
                </h2>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-10 md:py-14 z-20">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-12 gap-6 md:gap-10 items-center">
              <div className="col-span-2 flex justify-center md:justify-start">
                <Image
                  src="/landing/person_happy.svg"
                  alt="Person freut sich"
                  width={192}
                  height={192}
                  className="w-24 h-24 md:w-32 md:h-32 object-contain"
                  loading="lazy"
                />
              </div>

              <div className="col-span-10 md:col-span-3">
                <div className="text-accent text-sm sm:text-base leading-snug tracking-[0.005em]">
                  <p>
                    Jochen hat erfolgreich an dem Schweißkurs teilgenommen und weiß nun, welche
                    Gefahren von einem Schweißgerät ausgehen und wie man dieses fachgerecht
                    verwendet.
                  </p>
                  <p className="mt-4">
                    Harald hat ihm dafür das Open-Educational-Badge „Kenntnisse im Schweißen"
                    digital verliehen.
                  </p>
                </div>
              </div>

              <div className="col-span-12 md:col-span-2 flex justify-center md:justify-start">
                <CircleNumber number={2} className="mt-1" anchor />
              </div>

              <div className="col-span-12 md:col-span-4">
                <div className="space-y-2">
                  <Image
                    src="/landing/HaraldundJochen.jpg"
                    alt="Harald zeigt Jochen das Schweißen"
                    width={1200}
                    height={1200}
                    className="w-full h-auto drop-shadow-2xl"
                    loading="lazy"
                  />
                  <p className="mt-3 text-center md:text-left text-xl leading-snug">
                    Wissensweitergabe durch Kurse
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full pt-6 md:pt-8 z-20">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-12 gap-6 md:gap-10 items-start">
              <div className="col-span-12 md:col-span-6 flex flex-col items-center md:items-start">
                <div className="w-full max-w-[720px] rounded-xl border border-primary/30 shadow-[0_10px_40px_color-mix(in_oklch,var(--primary)_15%,transparent)] overflow-hidden">
                  <Image
                    src="/landing/open_badge.png"
                    alt="Badge erstellen – Webplattform Open Educational Badges"
                    width={1440}
                    height={890}
                    className="w-full h-auto object-contain"
                    loading="lazy"
                  />
                </div>

                <p className="mt-3 text-center md:text-left text-xl leading-snug">
                  <span className="block">Webplattform Open Educational Badges</span>
                  <span className="block text-zinc-600">Zur Ausstellung der Berechtigungen</span>
                </p>
              </div>

              <div className="col-span-12 md:col-span-6 grid grid-rows-[auto_auto_1fr]">
                <div className="flex items-start gap-4">
                  <CircleNumber number={3} className="mt-1 shrink-0" anchor />
                  <div className="mt-4 max-w-[40ch] text-accent text-sm sm:text-base leading-snug tracking-[0.005em]">
                    <p>Jochen möchte nun ein Gestell für einen Wohnzimmertisch schweißen.</p>
                    <p className="mt-4">
                      Hierzu authentifiziert er sich an dem{' '}
                      <span className="whitespace-nowrap">mardu.space</span> Gerät, welches dem
                      Schweißgerät vorgeschaltet ist.
                    </p>
                  </div>
                </div>

                <div className="relative mt-6 md:-mt-20 md:mb-[-16px] flex items-end justify-end">
                  <Image
                    src="/landing/person_schweiss_nfc.svg"
                    alt="Illustration einer Person, die sich per NFC am Gerät authentifiziert"
                    width={1100}
                    height={900}
                    className="w-[88%] md:w-[84%] h-auto object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full z-20 md:-mt-12">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="w-full md:w-4/6">
              <div className="grid grid-cols-12 gap-4 md:gap-6 items-center">
                {/* LINKS: Icon/Illustration */}
                <div className="col-span-3 md:col-span-2 flex justify-center md:justify-start">
                  <Image
                    src="/landing/mesh.png"
                    alt="Illustration eines Funknetzwerks"
                    width={220}
                    height={220}
                    className="w-24 h-24 md:w-32 md:h-32 object-contain"
                    loading="lazy"
                  />
                </div>

                {/* MITTE: Text */}
                <div className="col-span-7 md:col-span-7">
                  <p className="text-accent text-sm sm:text-base leading-snug tracking-[0.005em]">
                    Alle Geräte von <span className="whitespace-nowrap">mardu.space</span> in einem
                    Gebäude sind untereinander funkvernetzt, um höchste Ausfallsicherheit zu
                    gewährleisten. Dadurch erreicht jede Anfrage immer ihr Ziel.
                  </p>
                </div>

                {/* RECHTS: Nummer-Kreis */}
                <div className="col-span-2 flex justify-center md:justify-start">
                  <CircleNumber number={4} className="mt-1 shrink-0" anchor />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full z-20 -mt-8 md:-mt-12">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-12 gap-6 md:gap-10 items-start">
              <div className="col-span-11 md:col-span-6 relative">
                <Image
                  src="/landing/open_badge_mardu_cloud.svg"
                  alt="Open Educational Badges – Cloud / Gateway"
                  width={1200}
                  height={900}
                  className="w-full max-w-[600px] h-auto object-contain"
                  loading="lazy"
                />

                <div className="md:absolute relative text-accent text-sm sm:text-base leading-snug tracking-[0.005em] flex items-start gap-4 max-w-[280px] md:max-w-[340px] md:left-[45%] md:bottom-[7%] mt-6 md:mt-0 pointer-events-none">
                  <div className="flex-1">
                    <p>
                      Das Gateway von <span className="whitespace-nowrap">mardu.space</span>{' '}
                      empfängt die Daten und fragt bei Open Education Badges an, ob die
                      erforderlichen Kenntnisse vorliegen.
                    </p>
                    <p className="mt-4">
                      Ein Offline-Cache sorgt für einen Betrieb auch bei einem Internetausfall.
                    </p>
                  </div>
                  <CircleNumber
                    number={5}
                    className="shrink-0 translate-y-[100%] translate-x-[20%]"
                    anchor
                  />
                </div>
              </div>

              {/* RECHTS: Gerät-Kachel + Caption */}
              <figure className="col-span-12 md:col-span-5 flex flex-col items-center md:items-end md:self-end">
                <Image
                  src="/landing/blende.svg"
                  alt="mardu.space Gerät zur Freischaltung der Maschinen"
                  width={1200}
                  height={1200}
                  className="w-[82%] md:w-[88%] lg:w-[80%] h-auto object-contain rounded-2xl drop-shadow-xl"
                  loading="lazy"
                />
                <figcaption className="mt-3 text-center md:text-left text-xl leading-snug">
                  Gerät zur Freischaltung der Maschinen
                </figcaption>
              </figure>
            </div>
          </div>
        </section>
        <section className="w-full py-10 md:py-14 z-20">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-12 gap-6 md:gap-10 items-center">
              {/* LINKS: Illustration Person + Schweißgerät */}
              <div className="col-span-12 md:col-span-6 flex justify-center md:justify-start">
                <Image
                  src="/landing/person_schweiss.svg"
                  alt="Jochen schweißt mit freigeschaltetem Gerät"
                  width={1000}
                  height={800}
                  className="w-[90%] md:w-full max-w-[580px] h-auto object-contain z-20"
                  loading="lazy"
                />
              </div>

              {/* RECHTS: Kreisnummer + Text */}
              <div className="col-span-12 md:col-span-6 flex items-start gap-4">
                <CircleNumber number={6} className="mt-1 shrink-0 " anchor />
                <div className="text-accent text-sm sm:text-base leading-snug tracking-[0.005em] max-w-[56ch]">
                  <p>
                    Da die Berechtigung vorliegt, schaltet das{' '}
                    <span className="whitespace-nowrap">mardu.space</span> Gerät den Strom für das
                    Schweißgerät frei und Jochen kann seinen Wohnzimmertisch zusammenschweißen.
                    <sup>*</sup>
                  </p>
                  <p className="mt-4">
                    Dank des Kurses von Harald weiß er auch, wie man den Verzug beim Schweißen
                    gering hält.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <ThreeArguments
        className="mt-12"
        title={<span>3 gute Argumente für Mardu</span>}
        items={[
          {
            title: 'Gemeinsam Brücken bauen',
            description: (
              <>
                Mit Mardu ermöglichen Sie es Ihren Studierenden und Lernenden, sicher Kompetenzen zu erwerben und anzuwenden.
              </>
            ),
            icon: (
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21s-6-4.35-8-6.5C1.5 12.5 3 8 6 6c3-2 6 1 6 1s3-3 6-1c3 2.05 4.5 6.5 2 8.5C18 16.65 12 21 12 21z" stroke="#7CFFB2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
          },
          {
            title: 'Messbarer Fortschritt',
            description: (
              <>
                Wir stärken die Souveränität der Lernenden, indem wir ihnen Transparenz über ihre
                Kompetenzen geben.
              </>
            ),
            icon: (
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3v18" stroke="#7CFFB2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 12h-18" stroke="#7CFFB2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 7l3 3 7-7" stroke="#7CFFB2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ),
          },
          {
            title: 'Datenschutz & Sicherheit',
            description: (
              <>
                Gehostet in Deutschland oder On-Premise auf Ihren Systemen – für maximale Datensicherheit
                und rechtliche Sicherheit.
              </>
            ),
            icon: (
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2a7 7 0 00-7 7v3a7 7 0 007 7 7 7 0 007-7V9a7 7 0 00-7-7z" stroke="#7CFFB2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="9" y="11" width="6" height="4" rx="1" stroke="#7CFFB2" strokeWidth="1.5" />
              </svg>
            ),
          },
        ]}
      />

      <Foerderung
        items={[
          {
            href: 'https://www.bmwk.de/',
            src: '/logos/bmwk.svg',
            alt: 'Bundesministerium für Wirtschaft und Klimaschutz',
          },
          {
            href: 'https://www.esf.de/portal/DE/ESF-Plus-2021-2027/Liste-der-Vorhaben/inhalt.html',
            src: '/logos/eu_esf.svg',
            alt: 'Europäische Union – Europäischer Sozialfonds Plus (ESF Plus)',
          },
          {
            href: 'https://www.exist.de/',
            src: '/logos/exist.svg',
            alt: 'EXIST – Existenzgründungen aus der Wissenschaft',
          },
        ]}
        description={
          <>
            Die Europäische Union fördert zusammen mit dem Bundesministerium für Wirtschaft und
            Klimaschutz über den Europäischen Sozialfonds Plus (ESF Plus) das Programm{' '}
            <em>Existenzgründungen aus der Wissenschaft (EXIST)</em> in Deutschland.
          </>
        }
      />

      {/* CTA Section */}
      <CTASection
        title="Sichere Makerspaces beginnen mit klaren Standards."
        description="In unserem Whitepaper zeigen wir, wie verantwortungsvolle Zugangs- und Maschinenkontrollen in Makerspaces zuverlässig funktionieren. Laden Sie es jetzt herunter und erhalten Sie praxisnahe Empfehlungen für sichere, skalierbare Abläufe."
        primaryButtonText="Jetzt Whitepaper Downloaden"
        primaryButtonHref="/whitepaper"
        secondaryButtonText="Beratung Vereinbaren"
        secondaryButtonHref="/contact"
      />

      <small className="block mt-6 text-center text-xs text-muted-foreground">
        * Schweißen in Wohnräumen ist nicht empfohlen. Nutze eine geeignete Werkstatt mit
        ausreichender Belüftung.
      </small>
    </main>
  );
}
