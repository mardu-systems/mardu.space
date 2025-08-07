import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card"

export default function Contact() {
    return (
        <main className="min-h-screen flex items-center justify-center p-4">
            <Card className="max-w-md w-full text-center">
                <CardHeader>
                    <CardTitle>Contact</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>
                        Reach us at
                        {" "}
                        <a href="mailto:contact@mardu.space" className="underline">
                            contact@mardu.space
                        </a>
                    </p>
                </CardContent>
            </Card>
        </main>
    )
}