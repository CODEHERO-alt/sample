import { useState, useEffect, useRef } from 'react';

export function useSpeech(text: string | undefined) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // Cancel any ongoing speech when component unmounts or text changes
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const play = () => {
    if (!text) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    // Get available voices
    const voices = window.speechSynthesis.getVoices();
    // Try to find a premium English voice
    const preferredVoice = voices.find(v => 
      (v.name.includes('Google') || v.name.includes('Premium')) && v.lang.startsWith('en')
    );
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(100);
    };

    utterance.onboundary = (event) => {
      // Estimate progress based on character index
      if (event.name === 'word') {
        const charIndex = event.charIndex;
        const textLength = text.length;
        const currentProgress = (charIndex / textLength) * 100;
        setProgress(currentProgress);
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const pause = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
  };

  return { isPlaying, isPaused, progress, play, pause, stop };
}
