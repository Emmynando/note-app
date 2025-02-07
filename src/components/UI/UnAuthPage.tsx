"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function UnAuth({ unAuthImage }) {
  const [showPrompt, setShowPrompt] = useState(false);

  return (
    <main className="h-dvh w-[100%] ">
      <Image
        src={unAuthImage}
        width={0}
        height={0}
        alt="emnotes"
        layout="responsive"
        className="h-dvh w-dvw"
        onClick={() => setShowPrompt(true)}
      />
      {showPrompt && (
        <div className="fixed top-[50%] left-[50%] bg-fadeWhite text-black p-4">
          <p className="text-center ">
            You are currently viewing this page because
            <br /> you are not signed in. Proceed to Sign in?
          </p>
          <div className="flex items-center justify-around mt-[1rem] ">
            <button
              className="text-red-900 text-sm"
              onClick={() => setShowPrompt(false)}>
              No
            </button>
            <button className="bg-[#2f3136] p-1 rounded-md text-sm text-white">
              <Link href="/login">Continue</Link>
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
