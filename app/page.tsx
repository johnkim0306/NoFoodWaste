"use client";

import { useState } from "react";
import Image from "next/image";

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

      try {
        const response = await fetch("/api/analyze", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
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
      </main>

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


    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Upload Grocery Receipt</h1>
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
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Analyze
        </button>
      </form>
    </div>
    </div>
  );
}
