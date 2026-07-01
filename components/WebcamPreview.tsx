"use client";

import Webcam from "react-webcam";

export default function WebcamPreview() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">
        Webcam Preview
      </h2>

      <Webcam
        audio={false}
        mirrored
        className="rounded-lg w-full"
      />
    </div>
  );
}