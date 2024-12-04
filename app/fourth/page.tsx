"use client";
import React, { useCallback, useState } from "react";
import AudioPlayer from "../components/AudioPlayer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";
import { AppSidebar } from "../components/app-sidebar";
import { MoveLeft, MoveRight } from "lucide-react";

export default function Home() {
  const song = "Everything Has Changed";
  const artist = "Taylor Swift";
  const image = "/assets/TaylorSwift_EverythingHasChanged.jpeg";
  const explanation = (
    <div>
      <h1 className="text-xl font-bold mb-1">Carbon Dioxide: {song}</h1>
      <p className="text-base mb-4">
        Carbon dioxide is the raw material transformed into glucose, much like
        the emotional transformation described in "Everything Has Changed."
        Plants “breathe in” carbon dioxide through stomata, tiny openings on the
        leaves.
      </p>
      <h2 className="text-lg font-semibold">Scientific Role:</h2>
      <ul className="list-disc list-outside pl-5">
        <li>
          <strong>Calvin Cycle:</strong> During the light-independent reactions
          (Calvin cycle), carbon dioxide combines with hydrogen (from water) to
          form glucose.
        </li>
        <li>
          <strong>Carbon Fixation:</strong> CO₂ is “fixed” into a stable
          molecule (3-phosphoglycerate) and later transformed into sugar
          molecules like glucose.
        </li>
        <li>
          <strong>Environmental Impact:</strong> Plants reduce CO₂ in the
          atmosphere, mitigating climate change by acting as natural carbon
          sinks.
        </li>
      </ul>
    </div>
  );

  const [userGuess, setUserGuess] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const verifyGuess = useCallback(async () => {
    if (userGuess.trim().toLowerCase() === song.toLowerCase()) {
      setMessageFunc(true);
      fireConfetti();
      const correctAudio = new Audio("/audio/correctAnswer.mp3");
      correctAudio.play();
    } else {
      setMessageFunc(false);
      const correctAudio = new Audio("/audio/wrongAnswer.mp3");
      correctAudio.play();
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
      "This was supposed to be hard, you know",
      "Swifties are one Tumblr post away from world domination I know it",
      "You got it! Good guess!",
      "Did you study for this instead of your test?",
      "Okay, Swiftie, I see you",
      "Okay you Googled that admit it",
      "If you used Shazam, that's cheating",
      "You're really smart. Can we be friends?",
      "You're scarily good at this.",
      "Are you sure you're not secretly Taylor lurking on the Internet?",
      "May the confetti break your fall",
      "\"It's not a phase, mom\" but it actually wasn't",
      "Someone really knows their Taylor Swift.",
    ];

    const resWrongAns = [
      "❌ Nope ❌",
      "❌ ...wrong ❌",
      "❌ Really? ❌",
      "❌ Do better man ❌",
      "❌ If this is your villain origin story I apologize ❌",
      "❌ I expect better from you ❌",
      "❌ Come on, you're better than this ❌",
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
      setMessage(correct);
      fireConfetti();
    } else {
      setIsCorrect(false);
      const incorrect =
        resWrongAns[Math.floor(Math.random() * resWrongAns.length)];
      setMessage(incorrect);
    }
  };

  return (
    <div className="justify-center w-full grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen px-20 py-5 font-[family-name:var(--font-geist-sans)] bg-black text-white">
      <AppSidebar />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {isCorrect && (
          <div className="items-center flex flex-col">
            <Image
              src={image}
              alt="The image describing the song"
              width={300}
              height={300}
            />
            <div className="mt-4 items-center flex justify-center w-full flex-col">
              <div className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] mb-3">
                🏆 Correct! The song was {song} by {artist}. 🏆
              </div>
              <div className="list-inside list-decimal text-xs text-center sm:text-left font-[family-name:var(--font-geist-mono)] mb-4 italic">
                {message}
              </div>
            </div>
            <div className="mt-4 items-center flex justify-center w-full flex-col text-left sm:text-left border border-gray-300 rounded-lg p-4 bg-stone-800 text-white">
              {explanation}
            </div>
          </div>
        )}

        {!isCorrect && (
          <div className="items-center flex justify-center w-full flex-col">
            <div className="text-xl text-center sm:text-left font-sans mb-4">
              SongGuessr: Let's learn about Photosynthesis through Taylor
              Swift's music!
            </div>
            <div className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] mb-4">
              Guess the song from this picture! You may refer to the audio clip
              as a hint.
            </div>
            <Image
              src={image}
              alt="The image describing the song"
              width={300}
              height={300}
            />
            {message && (
              <div className="mt-4 items-center flex justify-center w-full flex-col list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                {message}
              </div>
            )}
            <div className="mt-4 flex justify-center w-full">
              <AudioPlayer audioSrc="/audio/clip4.mp3" />
            </div>
            <div className="flex justify-center w-full">
              <form
                className="mt-4 flex w-full max-w-sm items-center space-x-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  verifyGuess();
                }}
              >
                <Input
                  type="text"
                  placeholder="Your Guess Here"
                  value={userGuess}
                  onChange={(e) => setUserGuess(e.target.value)}
                />
                <Button
                  className="bg-purple-600 text-white hover:bg-neutral-800"
                  type="submit"
                >
                  Guess
                </Button>
              </form>
            </div>
          </div>
        )}

        <div className="flex justify-between w-full">
          <Button
            className="bg-purple-800 text-white hover:bg-purple-400 transform hover:scale-110 transition-transform"
            onClick={() => router.push("/third")}
          >
            <MoveLeft className="mr-2" />
            Previous
          </Button>
          <Button
            className="bg-purple-800 text-white hover:bg-purple-400 transform hover:scale-110 transition-transform"
            onClick={() => router.push("/fifth")}
          >
            Next
            <MoveRight className="ml-2" />
          </Button>
        </div>
      </main>
    </div>
  );
}
