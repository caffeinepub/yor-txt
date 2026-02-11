import { useNavigate } from '@tanstack/react-router';
import { BookOpen, LogIn, PenLine, Users } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="container-custom py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-3xl">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-primary/10 p-4">
              <PenLine className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Share Your Stories
          </h1>
          <p className="text-lg text-muted-foreground sm:text-xl">
            A simple, beautiful place to write and discover short stories from people around the world.
          </p>
        </div>

        {/* Features */}
        <div className="mb-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-6 text-center shadow-xs">
            <div className="mb-3 flex justify-center">
              <div className="rounded-full bg-primary/10 p-3">
                <PenLine className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="mb-2 font-semibold">Write Stories</h3>
            <p className="text-sm text-muted-foreground">
              Share your thoughts, experiences, and creative tales with the community.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 text-center shadow-xs">
            <div className="mb-3 flex justify-center">
              <div className="rounded-full bg-primary/10 p-3">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="mb-2 font-semibold">Read & Discover</h3>
            <p className="text-sm text-muted-foreground">
              Explore stories from others and get inspired by diverse perspectives.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 text-center shadow-xs">
            <div className="mb-3 flex justify-center">
              <div className="rounded-full bg-primary/10 p-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="mb-2 font-semibold">Join Community</h3>
            <p className="text-sm text-muted-foreground">
              Connect with storytellers and readers in a welcoming space.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={() => navigate({ to: '/stories' })}
            className="flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <BookOpen className="h-5 w-5" />
            Browse Stories
          </button>
          <button
            onClick={() => navigate({ to: '/login' })}
            className="flex items-center justify-center gap-2 rounded-md border border-border bg-background px-8 py-3 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <LogIn className="h-5 w-5" />
            Sign In to Post
          </button>
        </div>

        {/* Info Section */}
        <div className="mt-16 rounded-lg border border-border bg-muted/30 p-8">
          <h2 className="mb-4 text-2xl font-semibold">How It Works</h2>
          <ol className="space-y-3 text-muted-foreground">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                1
              </span>
              <span>
                <strong className="text-foreground">Sign in</strong> using Internet Identity for secure, private authentication.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                2
              </span>
              <span>
                <strong className="text-foreground">Write your story</strong> – share anything from personal experiences to creative fiction.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                3
              </span>
              <span>
                <strong className="text-foreground">Read and discover</strong> stories from others in the community.
              </span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
