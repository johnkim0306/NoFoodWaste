"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [foodItems, setFoodItems] = useState<string[]>([]);
  const [receipt, setReceipt] = useState<File | null>(null);

  const handleFoodItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFoodItems(e.target.value.split(","));
  };

  const handleReceiptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setReceipt(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (receipt) {
      const formData = new FormData();
      formData.append("file", receipt);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log(result);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

<main className="flex min-h-screen flex-col items-center justify-between p-24">
        <section id="landing" className="max-w-4xl">
          <h1 className="text-5xl font-bold text-blue-600">
            From Wallet to Plate, No Food Waste Delivers Nutritious Savings!
          </h1>
          <div className="gap-12 grid grid-cols-3 mt-14">
            <div
              className="flex flex-col relative overflow-hidden height-auto text-foreground box-border bg-content1 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-large transition-transform-background motion-reduce:transition-none py-4"
              tabIndex={-1}
            >
              <div className="flex p-3 z-10 w-full justify-start items-center shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large">
                <p className="text-4xl font-bold">
                  <span className="text-blue-500">2.9+</span> People
                </p>
              </div>
              <hr
                className="shrink-0 bg-divider border-none w-full h-divider"
                role="separator"
              />
              <div className="relative flex w-full p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased">
                <p>unable to afford a healthy diet</p>
              </div>
            </div>
            <div
              className="flex flex-col relative overflow-hidden height-auto text-foreground box-border bg-content1 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-large transition-transform-background motion-reduce:transition-none py-4"
              tabIndex={-1}
            >
              <div className="flex p-3 z-10 w-full justify-start items-center shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large">
                <p className="text-4xl font-bold text-blue-500">39%</p>
              </div>
              <hr
                className="shrink-0 bg-divider border-none w-full h-divider"
                role="separator"
              />
              <div className="relative flex w-full p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased">
                <p>increase in global food prices</p>
              </div>
            </div>
            <div
              className="flex flex-col relative overflow-hidden height-auto text-foreground box-border bg-content1 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium rounded-large transition-transform-background motion-reduce:transition-none py-4"
              tabIndex={-1}
            >
              <div className="flex p-3 z-10 w-full justify-start items-center shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large">
                <p className="text-4xl font-bold">
                  <span className="text-blue-500">12M</span> Deaths
                </p>
              </div>
              <hr
                className="shrink-0 bg-divider border-none w-full h-divider"
                role="separator"
              />
              <div className="relative flex w-full p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased">
                <p>linked to poor diet and nutrition</p>
              </div>
            </div>
          </div>
          <p className="mt-14">
            <span className="text-blue-500">No Food Waste</span> is dedicated to
            supporting individuals facing financial constraints by offering
            personalized, budget-friendly{" "}
            <span className="text-blue-500">meal recommendations</span>. We
            recognize the challenges of stretching limited resources, which is
            why we specialize in providing{" "}
            <span className="text-blue-500">nutritious</span> meal options
            tailored to tight budgets. With No Food Waste, you can enjoy satisfying
            meals without breaking the bank, ensuring that everyone has access
            to <span className="text-blue-500">affordable</span>, nourishing
            food choices. Let us be your partner in making healthy eating{" "}
            <span className="text-blue-500">accessible</span> to all.
          </p>
        </section>
      </main>


        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label>
            List your food items (comma separated):
            <input
              type="text"
              onChange={handleFoodItemChange}
              className="border p-2 rounded"
            />
          </label>
          <label>
            Upload your grocery receipt:
            <input
              type="file"
              accept="image/*"
              onChange={handleReceiptChange}
              className="border p-2 rounded"
            />
          </label>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Submit
          </button>
        </form>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
