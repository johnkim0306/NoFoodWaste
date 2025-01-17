"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UserInput from "@/components/UserInput";
import Refrigerator from "@/components/Refrigerator";

export default function Home() {
  const [foodItems, setFoodItems] = useState<{ name: string; expiry: number }[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (submitted) {
      router.push('/main');
    }
  }, [submitted, router]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
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

      <div className="flex flex-col items-center">
        <UserInput setFoodItems={setFoodItems} setSubmitted={setSubmitted} />
        <Refrigerator />
      </div>
    </div>
  );
}
