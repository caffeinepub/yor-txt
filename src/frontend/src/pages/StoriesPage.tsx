import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useCurrentUserProfile';
import { useGetAllStories } from '../hooks/useStories';
import { useNavigate } from '@tanstack/react-router';
import StoryList from '../components/StoryList';
import StorySubmissionForm from '../components/StorySubmissionForm';
import ProfileSetupDialog from '../components/ProfileSetupDialog';
import { AlertCircle, Loader2, LogIn } from 'lucide-react';

export default function StoriesPage() {
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const { data: stories, isLoading: storiesLoading, error: storiesError } = useGetAllStories();
  const navigate = useNavigate();

  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  if (showProfileSetup) {
    return <ProfileSetupDialog onComplete={() => {}} />;
  }

  return (
    <div className="container-custom py-8 sm:py-12">
      <div className="mx-auto max-w-3xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Stories</h1>
          <p className="text-muted-foreground">
            Share your stories and read what others have written
          </p>
        </div>

        {/* Story Submission Section */}
        {isAuthenticated && userProfile ? (
          <div className="mb-12 rounded-lg border border-border bg-card p-6 shadow-xs">
            <StorySubmissionForm />
          </div>
        ) : (
          <div className="mb-12 rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center">
            <p className="mb-4 text-muted-foreground">
              Sign in to share your own stories with the community
            </p>
            <button
              onClick={() => navigate({ to: '/login' })}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </button>
          </div>
        )}

        {/* Stories List Section */}
        <div>
          <h2 className="mb-6 text-xl font-semibold">Recent Stories</h2>

          {storiesLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : storiesError ? (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6 text-center">
              <AlertCircle className="mx-auto mb-2 h-8 w-8 text-destructive" />
              <p className="font-medium text-destructive">Failed to load stories</p>
              <p className="mt-1 text-sm text-destructive/80">
                {storiesError instanceof Error ? storiesError.message : 'Please try again later'}
              </p>
            </div>
          ) : (
            <StoryList stories={stories || []} />
          )}
        </div>
      </div>
    </div>
  );
}
