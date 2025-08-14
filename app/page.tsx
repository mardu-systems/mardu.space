import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <main className="min-h-screen flex items-center justify-center p-4">
            <Card className="max-w-md w-full text-center">
                <CardHeader>
                    <CardTitle>Coming Soon</CardTitle>
                    <CardDescription>Our website is under construction.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Stay tuned! In the meantime, feel free to reach out.</p>
                </CardContent>
                <CardFooter className="justify-center">
                    <Link href="/contact">
                        <Button>Kontakt</Button>
                    </Link>
                </CardFooter>
            </Card>
        </main>
    )
}
