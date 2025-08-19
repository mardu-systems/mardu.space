import type { Metadata } from "next"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the mardu.space team."
}

export default function ContactPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4 text-center">
      <h1 className="text-3xl font-bold">Contact</h1>
      <a href="mailto:info@example.com" className={buttonVariants()}>
        Email Us
      </a>
      <Link href="/" className={buttonVariants({ variant: "outline" })}>
        Back Home
      </Link>
    </div>
  )
}
