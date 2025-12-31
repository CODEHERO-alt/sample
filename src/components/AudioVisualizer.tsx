import { motion } from 'framer-motion';

interface AudioVisualizerProps {
  isPlaying: boolean;
}

export function AudioVisualizer({ isPlaying }: AudioVisualizerProps) {
  return (
    <div className="flex items-center justify-center gap-1 h-8">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-primary"
          animate={{
            height: isPlaying ? [8, 24, 8] : 4,
            opacity: isPlaying ? 1 : 0.3
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.1,
            ease: "easeInOut"
          }}
          style={{
            borderRadius: 2
          }}
        />
      ))}
    </div>
  );
}
