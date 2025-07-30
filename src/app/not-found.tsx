import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DotPattern } from "@/components/magicui/dot-pattern"
import { cn } from "@/lib/utils"
import PageWrapper from "@/components/Wrappers/PageWrapper"

export default function NotFound() {
    return (
        <PageWrapper className="flex flex-col items-center justify-center px-4 text-center space-y-6">
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
            <DotPattern
                glow={true}
                className={cn(
                    "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
                )}
            />
        </PageWrapper>
    )
}
