import { AudioLines, BookOpen, Sparkles, Volume2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function VoicePreviewPlaceholder() {
  return (
    <div className="hidden h-full flex-1 flex-col items-center justify-center gap-6 border-t lg:flex">
      <div className="flex flex-col items-center gap-3">
        <div className="relative flex w-32 items-center justify-center">
          <div className="bg-muted absolute left-0 -rotate-30 rounded-full p-4">
            <Volume2 className="text-muted-foreground size-5" />
          </div>

          <div className="bg-foreground relative z-10 rounded-full p-4">
            <Sparkles className="text-background size-5" />
          </div>

          <div className="bg-muted absolute right-0 rotate-30 rounded-full p-4">
            <AudioLines className="text-muted-foreground size-5" />
          </div>
        </div>

        <p className="text-foreground text-lg font-semibold tracking-tight">
          Preview will appear here
        </p>
        <p className="text-muted-foreground max-w-64 text-center text-sm">
          Once you generate, your audio result will appear here. Sit back and
          relax.
        </p>
      </div>
      <Button asChild variant="outline" size="sm">
        <Link href="mailto:nikomvp03@gmail.com">
          <BookOpen /> Don&apos;t know how?
        </Link>
      </Button>
    </div>
  );
}
