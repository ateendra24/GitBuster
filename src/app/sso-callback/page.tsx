import PageWrapper from '@/components/Wrappers/PageWrapper'
import { AuthenticateWithRedirectCallback } from '@clerk/nextjs'
import { Loader2 } from 'lucide-react'

export default function Page() {
    // Handle the redirect flow by calling the Clerk.handleRedirectCallback() method
    // or rendering the prebuilt <AuthenticateWithRedirectCallback/> component.
    // This is the final step in the custom OAuth flow.
    return <PageWrapper>
        <AuthenticateWithRedirectCallback />

        <Loader2 className="animate-spin h-8 w-8" />

    </PageWrapper>
}