import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useCurrentUserProfile';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import ProfileSetupDialog from '../components/ProfileSetupDialog';
import { Loader2, LogIn, Shield } from 'lucide-react';

export default function LoginPage() {
  const { login, identity, isLoggingIn, isLoginError, loginError } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const navigate = useNavigate();

  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  useEffect(() => {
    if (isAuthenticated && userProfile) {
      navigate({ to: '/stories' });
    }
  }, [isAuthenticated, userProfile, navigate]);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      console.error('Login error:', error);
    }
  };

  const handleProfileComplete = () => {
    navigate({ to: '/stories' });
  };

  if (showProfileSetup) {
    return <ProfileSetupDialog onComplete={handleProfileComplete} />;
  }

  return (
    <div className="container-custom py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-md">
        <div className="rounded-lg border border-border bg-card p-8 shadow-soft">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-primary/10 p-4">
              <Shield className="h-10 w-10 text-primary" />
            </div>
          </div>

          <h1 className="mb-2 text-center text-2xl font-bold">Sign In</h1>
          <p className="mb-8 text-center text-sm text-muted-foreground">
            Sign in with Internet Identity to start sharing your stories
          </p>

          {isLoginError && (
            <div className="mb-6 rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
              <p className="font-medium">Login failed</p>
              <p className="mt-1 text-xs">{loginError?.message || 'Please try again'}</p>
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={isLoggingIn || isAuthenticated}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <LogIn className="h-5 w-5" />
                Sign in with Internet Identity
              </>
            )}
          </button>

          <div className="mt-8 rounded-md bg-muted/50 p-4">
            <h3 className="mb-2 text-sm font-semibold">What is Internet Identity?</h3>
            <p className="text-xs text-muted-foreground">
              Internet Identity is a secure, privacy-focused authentication system. You don't need
              passwords or personal information – just use your device's biometric authentication or
              security key.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
