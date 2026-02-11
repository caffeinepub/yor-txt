import { useState } from 'react';
import { useAddStory } from '../hooks/useStories';
import { Loader2, Send } from 'lucide-react';

export default function StorySubmissionForm() {
  const [content, setContent] = useState('');
  const addStory = useAddStory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await addStory.mutateAsync(content.trim());
      setContent('');
    } catch (error) {
      console.error('Failed to submit story:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="story-content" className="mb-2 block text-sm font-medium">
          Share Your Story
        </label>
        <textarea
          id="story-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your story here... Share your thoughts, experiences, or creative tales."
          rows={6}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          required
          minLength={10}
          maxLength={5000}
        />
        <p className="mt-1.5 text-xs text-muted-foreground">
          {content.length} / 5000 characters
        </p>
      </div>
      <button
        type="submit"
        disabled={!content.trim() || addStory.isPending}
        className="flex items-center gap-2 rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
      >
        {addStory.isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Posting...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Post Story
          </>
        )}
      </button>
    </form>
  );
}
