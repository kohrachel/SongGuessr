"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import AudioPlayer from "./components/AudioPlayer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image"; // Import the Image component
import confetti from "canvas-confetti";

export default function Home() {
  const song = "Wildest Dreams"; // Replace with the actual correct answer
  const artist = "Taylor Swift"; // Replace with the actual correct answer
  const image = "/assets/TaylorSwift_WildestDreams.jpeg"; // Replace with image path
  const [userGuess, setUserGuess] = useState(""); // State to hold the user's guess
  const [isCorrect, setIsCorrect] = useState(false); // State to hold correctness of user's guess
  const [message, setMessage] = useState<string | null>(null);

  const verifyGuess = useCallback(async () => {
    if (userGuess.trim().toLowerCase() === song.toLowerCase()) {
      setMessageFunc(true);
      fireConfetti();
    } else {
      setMessageFunc(false);
    }
  }, [userGuess, song]);

  function fireConfetti() {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 100,
    };
    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }
    // Fire multiple bursts of confetti
    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }

  const setMessageFunc = (correct: boolean) => {
    const resCorrectAns = [
      "🏆 ok geography whiz 🏆",
      "🏆 did you study for this instead of your test? 🏆",
      "🏆 ding ding ding 🏆",
      "🏆 okay you googled that didn't you 🏆",
      "🏆 einstein would be jealous of you 🏆",
    ];

    const resWrongAns = [
      "❌ no lol ❌",
      "❌ your american is showing ❌",
      "❌ ...wrong ❌",
      "❌ really? ❌",
      "❌ no, you can't get partial credit ❌",
      "❌ it's okay, we all have bad days ❌",
    ];

    if (correct) {
      setIsCorrect(true);
      const correct =
        resCorrectAns[Math.floor(Math.random() * resCorrectAns.length)];
      setMessage(correct); // Set the message for a correct guess
      fireConfetti();
    } else {
      setIsCorrect(false);
      const incorrect =
        resWrongAns[Math.floor(Math.random() * resWrongAns.length)];
      setMessage(incorrect); // Set the message for an incorrect guess
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black text-white">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* Conditionally render the image if the guess is correct */}
        {isCorrect && (
          <div className="mt-4 items-center flex flex-col">
            <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] mb-4">
              Correct! The song was {song} by {artist}.
            </ol>
            <Image
              src={image} // Replace with the actual image path
              alt="Correct Guess"
              width={300} // Set the desired width
              height={300} // Set the desired height
            />
          </div>
        )}

        {!isCorrect && (
          <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            Can you guess which song this audio clip is from?
          </ol>
        )}
        {message && (
          <div>
            {/* TODO: fix this to auto-play the sound instead of making it an audio player. then repeat for the correct answer. then done with the page and duplicate for all pages. */}
            <AudioPlayer audioSrc="/audio/wrongAnswer.mp3" />
            <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] mb-4 flex justify-center w-full">
              {message}
            </ol>
          </div>
        )}
        <div className="flex justify-center w-full">
          <AudioPlayer audioSrc="/audio/clip1.mp3" />
        </div>
        <div className="flex justify-center w-full">
          <form
            className="flex w-full max-w-sm items-center space-x-2"
            onSubmit={(e) => {
              e.preventDefault(); // Prevent default form submission
              verifyGuess(); // Call the verifyGuess function
            }}
          >
            <Input
              type="text"
              placeholder="Your Guess Here"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)} // Update userGuess state
            />
            <Button type="submit">Guess</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
