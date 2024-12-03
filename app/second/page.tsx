"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import AudioPlayer from "../components/AudioPlayer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image"; // Import the Image component
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";

export default function Home() {
  const song = "The Best Day"; // Replace with the actual correct answer
  const artist = "Taylor Swift"; // Replace with the actual correct answer
  const image = "/assets/TaylorSwift_TheBestDay.jpeg"; // Replace with image path
  const [userGuess, setUserGuess] = useState(""); // State to hold the user's guess
  const [isCorrect, setIsCorrect] = useState(false); // State to hold correctness of user's guess
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const verifyGuess = useCallback(async () => {
    if (userGuess.trim().toLowerCase() === song.toLowerCase()) {
      setMessageFunc(true);
      fireConfetti();
      const correctAudio = new Audio("/audio/correctAnswer.mp3");
      correctAudio.play(); // Play the audio
    } else {
      setMessageFunc(false);
      // Play the correct answer audio
      const correctAudio = new Audio("/audio/wrongAnswer.mp3");
      correctAudio.play(); // Play the audio
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
      "You got it! Good guess!",
      "Did you study for this instead of your test?",
      "Okay, Swiftie, I see you",
      "Okay you Googled that admit it",
      "If you used Shazam, that's cheating",
      "Can we be friends?",
      "May the confetti break your fall",
      "\"It's not a phase, mom\" but it actually wasn't",
      "Correct! Someone really knows their Taylor Swift",
    ];

    const resWrongAns = [
      "❌ no lol ❌",
      "❌ ...wrong ❌",
      "❌ Really? ❌",
      "❌ How could you not know this? ❌",
      "❌ Now go sit in the corner and think about what you did ❌",
      '❌ Like Taylor said, "Study, it\'s good" ❌',
      "❌ I'm trying so hard not to be mean to you right now ❌",
      "❌ Wrong, but nice try. ❌",
      "❌ If at first you don't succeed... you try again ❌",
      "❌ And you call yourself a Swiftie? ❌",
      "❌ No, you can't get partial credit ❌",
      "❌ It's okay, we all have bad days ❌",
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
        {isCorrect && (
          <div className="mt-4 items-center flex flex-col">
            <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] mb-4">
              {message}
            </ol>
            <Image
              src={image}
              alt="The image describing the song"
              width={300}
              height={300}
            />
            <div className="mt-4 items-center flex justify-center w-full flex-col">
              <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] mb-4 flex justify-center w-full">
                🏆 Correct! The song was {song} by {artist}. 🏆
              </ol>
            </div>
          </div>
        )}

        {!isCorrect && (
          <div className="mt-4 items-center flex flex-col">
            <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] mb-4">
              Guess the song from this picture! You may refer to the audio clip
              as a hint.
            </ol>
            <Image
              src={image}
              alt="The image describing the song"
              width={300}
              height={300}
            />
            {message && (
              <div className="mt-4 items-center flex justify-center w-full flex-col">
                <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] mb-4 flex justify-center w-full">
                  {message}
                </ol>
              </div>
            )}
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
        <div className="flex justify-between w-full mt-4">
          <Button onClick={() => router.push("/")}>Previous</Button>
          <Button onClick={() => router.push("/second")}>Next</Button>
        </div>
      </main>
    </div>
  );
}
