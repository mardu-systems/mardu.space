"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function ContactPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4 text-center">
      <h1 className="text-3xl font-bold">Contact</h1>
      <a href="mailto:info@example.com" className={buttonVariants()}>
        Email Us
      </a>
      <Button onClick={() => router.push("/")}>Back Home</Button>
    </div>
  )
}
