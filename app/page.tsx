"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import AudioPlayer from "./components/AudioPlayer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image"; // Import the Image component

export default function Home() {
  const correctAnswer = "Wildest Dreams"; // Replace with the actual correct answer
  const [userGuess, setUserGuess] = useState(""); // State to hold the user's guess
  const [isCorrect, setIsCorrect] = useState(false); // State to hold correctness of user's guess

  const verifyGuess = useCallback(async () => {
    if (userGuess.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setIsCorrect(true);
      alert("Correct!"); // Notify the user of a correct guess
    } else {
      alert("Incorrect, try again!"); // Notify the user of an incorrect guess
    }
  }, [userGuess, correctAnswer]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-black text-white">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* Conditionally render the image if the guess is correct */}
        {isCorrect && (
          <div className="mt-4 items-center flex flex-col">
            <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
              Congratulations! The song was Wildest Dreams by Taylor Swift.
            </ol>
            <Image
              src="/assets/TaylorSwift_WildestDreams.jpeg" // Replace with the actual image path
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
        <AudioPlayer></AudioPlayer>

        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="Your Guess Here"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)} // Update userGuess state
          />
          <Button type="submit" onClick={verifyGuess}>
            Guess
          </Button>
        </div>
      </main>
    </div>
  );
}
