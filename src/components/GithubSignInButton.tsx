'use client';
// Filename: components/GithubSignInButton.tsx

import React from 'react';
import { useSignIn } from '@clerk/nextjs';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import type { ClerkAPIError, OAuthStrategy } from '@clerk/types';
import { Button } from './ui/button';

type Props = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>
  & {
    preferPopup?: boolean; // try popup, fallback to redirect if blocked
    onError?: (message: string) => void;
    signInLabel?: string;
  };

/**
 * Custom "Sign in with GitHub" button using Clerk's OAuth flow.
 * Defaults to popup but falls back to redirect if that fails.
 */
export function GithubSignInButton({
  preferPopup = true,
  onError,
  signInLabel = 'Continue with GitHub',
  className,
  ...restProps
}: Props) {
  const { isLoaded, signIn } = useSignIn();
  const [loadingStrategy, setLoadingStrategy] = React.useState<OAuthStrategy | null>(null);

  const afterSignIn = process.env.NEXT_PUBLIC_AFTER_SIGN_IN_URL
    ?? process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL
    ?? '/';
  const callbackUrl = process.env.NEXT_PUBLIC_OAUTH_CALLBACK_URL ?? '/sso-callback';

  const clickHandler = async () => {
    if (!isLoaded) {
      console.warn('Clerk is not yet loaded');
      return;
    }
    setLoadingStrategy('oauth_github');

    try {
      await signIn.authenticateWithRedirect({
        strategy: 'oauth_github',
        redirectUrl: callbackUrl,
        redirectUrlComplete: afterSignIn,
        /** 'redirect' is default, so popup only if explicitly requested */
        ...(preferPopup ? { oauthFlow: 'popup' } : {}),
      });
      // No further action needed; in popup flow, redirectUrlComplete page will finalize the flow.
    } catch (err: unknown) {
      console.warn('signIn.authenticateWithRedirect failed:', err);

      // If popup was blocked or forced redirect, retry with redirect fallback
      if (preferPopup) {
        try {
          await signIn.authenticateWithRedirect({
            strategy: 'oauth_github',
            redirectUrl: callbackUrl,
            redirectUrlComplete: afterSignIn,
            // oauthFlow: 'redirect',
          });
          return;
        } catch (fallbackErr) {
          console.error('Redirect fallback failed:', fallbackErr);
          err = fallbackErr;
        }
      }

      let msg = 'Authentication error';
      if (isClerkAPIResponseError(err)) {
        const errors = err.errors as ClerkAPIError[];
        msg = errors.map(e => e.longMessage ?? e.message).join(' · ');
      }
      if (onError) onError(msg);
    } finally {
      setLoadingStrategy(null);
    }
  };

  return (
    <Button
      type="button"
      onClick={clickHandler}
      disabled={!isLoaded || loadingStrategy !== null}
      className={className}
      {...restProps}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='!h-5 !w-5'>                                <path
        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
        fill="currentColor"
      />
      </svg>
      {loadingStrategy === 'oauth_github' ? 'Processing…' : signInLabel}
    </Button>
  );
}
