import { Story } from '../backend';
import { useGetUserProfiles } from '../hooks/useUserProfiles';
import { Clock, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { getPrincipalDisplayName } from '../utils/principalDisplay';

interface StoryListProps {
  stories: Story[];
}

export default function StoryList({ stories }: StoryListProps) {
  const authorPrincipals = stories.map((s) => s.author);
  const { data: profiles } = useGetUserProfiles(authorPrincipals);

  if (stories.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-muted/30 p-12 text-center">
        <p className="text-muted-foreground">No stories yet. Be the first to share one!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {stories.map((story, index) => {
        const authorProfile = profiles?.[story.author.toString()];
        const authorName = authorProfile?.name || getPrincipalDisplayName(story.author);
        const timestamp = new Date(Number(story.timestamp) / 1_000_000);
        const timeAgo = formatDistanceToNow(timestamp, { addSuffix: true });

        return (
          <article
            key={index}
            className="animate-fade-in rounded-lg border border-border bg-card p-6 shadow-xs transition-shadow hover:shadow-soft"
          >
            <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                <span className="font-medium text-foreground">{authorName}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{timeAgo}</span>
              </div>
            </div>
            <p className="whitespace-pre-wrap text-base leading-relaxed">{story.content}</p>
          </article>
        );
      })}
    </div>
  );
}
