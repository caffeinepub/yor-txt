import { useState } from 'react';
import { useSaveCallerUserProfile } from '../hooks/useCurrentUserProfile';
import { Loader2 } from 'lucide-react';

interface ProfileSetupDialogProps {
  onComplete: () => void;
}

export default function ProfileSetupDialog({ onComplete }: ProfileSetupDialogProps) {
  const [name, setName] = useState('');
  const saveProfile = useSaveCallerUserProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await saveProfile.mutateAsync({ name: name.trim() });
      onComplete();
    } catch (error) {
      console.error('Failed to save profile:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-md animate-fade-in rounded-lg border border-border bg-card p-6 shadow-lg">
        <h2 className="mb-2 text-2xl font-semibold">Welcome!</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Please enter your name to get started. This will be displayed with your stories.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              autoFocus
              required
              minLength={1}
              maxLength={50}
            />
          </div>
          <button
            type="submit"
            disabled={!name.trim() || saveProfile.isPending}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {saveProfile.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
