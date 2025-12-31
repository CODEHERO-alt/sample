import { useBriefing } from "@/hooks/use-briefing";
import { useSpeech } from "@/hooks/use-speech";
import { Header } from "@/components/Header";
import { NewsCard } from "@/components/NewsCard";
import { PlayerControls } from "@/components/PlayerControls";
import { Loader2, AlertCircle, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { data: briefing, isLoading, error } = useBriefing();
  const { isPlaying, isPaused, progress, play, pause, stop } = useSpeech(briefing?.fullAudioText);

  // Hero Section Logic
  const topStory = briefing?.sections[0]?.items[0];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="font-mono text-sm text-muted-foreground animate-pulse">
          CRAWLING GLOBAL SOURCES...
        </p>
      </div>
    );
  }

  if (error || !briefing) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
        <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-6">
          <AlertCircle className="w-8 h-8 text-destructive" />
        </div>
        <h1 className="font-serif text-2xl font-bold mb-2">Briefing Unavailable</h1>
        <p className="text-muted-foreground max-w-md mb-8">
          We couldn't generate your daily briefing. Please try again later.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-foreground text-background font-mono text-sm font-medium hover:bg-primary transition-colors"
        >
          RETRY CONNECTION
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Welcome / Hero Section */}
        <section className="mb-16 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-serif text-4xl md:text-6xl font-black text-foreground mb-6 leading-tight">
              Your World in <span className="text-primary">10 Minutes</span>.
            </h1>
            <p className="text-xl text-muted-foreground font-light mb-8 max-w-2xl mx-auto leading-relaxed">
              AI-curated intelligence from global sources on Politics, Business, Tech, and Culture.
            </p>
            
            <button
              onClick={play}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full hover:bg-primary transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 overflow-hidden"
            >
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <PlayCircle className="w-6 h-6 relative z-10" />
              <span className="font-mono font-bold text-sm tracking-wider relative z-10">START BRIEFING</span>
            </button>
          </motion.div>
        </section>

        {/* Content Grid */}
        <div className="space-y-16">
          {briefing.sections.map((section, sectionIndex) => (
            <section key={section.category}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-8"
              >
                <div className="h-px bg-border flex-1" />
                <h2 className="font-mono text-sm font-bold uppercase tracking-widest text-muted-foreground">
                  {section.category}
                </h2>
                <div className="h-px bg-border flex-1" />
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {section.items.map((item, index) => (
                  <NewsCard 
                    key={index}
                    item={item} 
                    category={section.category}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <PlayerControls 
        isPlaying={isPlaying}
        isPaused={isPaused}
        progress={progress}
        onPlay={play}
        onPause={pause}
        onStop={stop}
      />
    </div>
  );
}
