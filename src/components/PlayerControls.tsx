import { Play, Pause, Square, Volume2 } from "lucide-react";
import { AudioVisualizer } from "./AudioVisualizer";
import { motion } from "framer-motion";

interface PlayerControlsProps {
  isPlaying: boolean;
  isPaused: boolean;
  progress: number;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  disabled?: boolean;
}

export function PlayerControls({ 
  isPlaying, 
  isPaused, 
  progress, 
  onPlay, 
  onPause, 
  onStop,
  disabled 
}: PlayerControlsProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 shadow-lg z-40 safe-area-bottom">
      <div className="max-w-3xl mx-auto flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-accent/10 p-2 rounded-full">
              <Volume2 className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="font-serif font-bold text-sm">Daily Briefing</p>
              <p className="font-mono text-xs text-muted-foreground">AI Generated Summary</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <AudioVisualizer isPlaying={isPlaying} />
            
            {isPlaying ? (
              <button 
                onClick={onPause}
                className="w-12 h-12 flex items-center justify-center bg-foreground text-white rounded-full hover:bg-foreground/90 transition-colors shadow-lg"
              >
                <Pause className="w-5 h-5" />
              </button>
            ) : (
              <button 
                onClick={onPlay}
                disabled={disabled}
                className="w-12 h-12 flex items-center justify-center bg-primary text-white rounded-full hover:bg-primary/90 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Play className="w-5 h-5 ml-1" />
              </button>
            )}

            {(isPlaying || isPaused) && (
              <button 
                onClick={onStop}
                className="w-10 h-10 flex items-center justify-center bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors"
              >
                <Square className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-secondary w-full rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>
      </div>
    </div>
  );
}
