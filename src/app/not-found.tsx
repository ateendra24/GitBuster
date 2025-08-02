import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center space-y-6 relative">
            <h1 className="text-6xl font-bold">404</h1>
            <h2 className="text-2xl font-semibold">Page Not Found</h2>
            <p className="text-muted-foreground max-w-lg">
                Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <Button variant="default" asChild>
                <Link href="/">
                    Home
                </Link>
            </Button>
        </div>
    )
}
