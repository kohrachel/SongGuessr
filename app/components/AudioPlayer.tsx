"use client";
import React, { useEffect, useRef } from "react";

function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // // Play audio on component mount
    // audio?.play();

    return () => {
      // Cleanup on unmount
      audio.pause();
    };
  }, []);

  return (
    <div>
      <audio
        ref={audioRef}
        controls
        style={{ margin: "0 auto", display: "block" }}
      >
        <source src="/audio/clip1.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default AudioPlayer;
