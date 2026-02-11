import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useCurrentUserProfile';
import { LogOut, User } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

export default function AuthStatus() {
  const { identity, clear, isLoggingIn } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;

  const handleSignOut = async () => {
    await clear();
    queryClient.clear();
  };

  if (!isAuthenticated) {
    return null;
  }

  const displayName = userProfile?.name || 'User';

  return (
    <div className="flex items-center gap-2">
      <div className="hidden items-center gap-2 rounded-md bg-secondary px-3 py-1.5 text-sm sm:flex">
        <User className="h-4 w-4 text-primary" />
        <span className="font-medium">{displayName}</span>
      </div>
      <button
        onClick={handleSignOut}
        disabled={isLoggingIn}
        className="flex items-center gap-1.5 rounded-md bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80 disabled:opacity-50"
        title="Sign out"
      >
        <LogOut className="h-4 w-4" />
        <span className="hidden sm:inline">Sign out</span>
      </button>
    </div>
  );
}
