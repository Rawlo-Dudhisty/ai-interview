"use client";

import { useState } from "react";

interface Props {
  onTranscript: (text: string) => void;
}

export default function SpeechRecorder({
  onTranscript,
}: Props) {
  const [listening, setListening] = useState(false);

  const startRecording = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.start();

    setListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onTranscript(transcript);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  return (
    <button
      onClick={startRecording}
      className={`px-6 py-3 rounded-lg text-white ${
        listening
          ? "bg-red-600"
          : "bg-green-600"
      }`}
    >
      {listening ? "🎤 Listening..." : "🎤 Start Speaking"}
    </button>
  );
}