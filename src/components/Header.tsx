import { Link } from "wouter";
import { Radio } from "lucide-react";

export function Header() {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <header className="border-b border-border bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-foreground text-background p-2 rounded-sm group-hover:bg-primary transition-colors">
              <Radio className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg md:text-xl tracking-tight leading-none">
                Brief.AI
              </span>
              <span className="font-mono text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest leading-none mt-1">
                Global Intelligence
              </span>
            </div>
          </Link>

          <div className="font-mono text-xs md:text-sm text-foreground/70 hidden sm:block">
            {today}
          </div>
        </div>
      </div>
    </header>
  );
}
