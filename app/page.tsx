import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4 text-center">
      <h1 className="text-4xl font-bold">Coming Soon</h1>
      <p className="text-muted-foreground">Our website is under construction.</p>
      <Link href="/contact" className={buttonVariants()}>
        Contact Us
      </Link>
    </div>
  )
}
