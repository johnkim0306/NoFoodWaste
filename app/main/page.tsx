"use client";

import { useMemo, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { setRecipes } from '@/lib/features/foodItems/foodItemsSlice';
import Refrigerator from "@/components/Refrigerator";
import UserInput from "@/components/UserInput";

interface Recipe {
  name: string;
  image: string;
  category: string;
  description: string;
  instructions: string;
}

const MainPage: React.FC = () => {
  const foodItems = useSelector((state: RootState) => state.foodItems.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const shelves = useMemo(() => {
    const newShelves = [];
    for (let i = 0; i < foodItems.length; i += 4) {
      newShelves.push(foodItems.slice(i, i + 4).map(item => item.name));
    }
    return newShelves;
  }, [foodItems]);

  const findRecipes = async () => {
    try {
      console.log("findRecipes function called");
      const response = await fetch("/api/find-recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ foodItems }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Recipes fetched:", result.recipes);
      dispatch(setRecipes(result.recipes));
      router.push('/find-recipes'); // Ensure no query parameter is added
    } catch (error) {
      console.error("Error finding recipes:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row items-start justify-center bg-gray-100 p-4 gap-8 mt-16">
        <div className="shelf-container w-full p-4">
          <h1 className="text-3xl font-bold mb-16">Food Shelf</h1>
          {shelves.map((shelf, index) => (
            <div key={index} className="shelf mt-16 mb-16">
              <div className="books grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8">
                {shelf.map((item, idx) => (
                  <div key={idx} className="food-item bg-green-200 p-4 m-4 rounded flex flex-col items-center">
                    <img src={`/images/${item}.jpg`} alt={item} className="w-24 h-24 object-cover mb-2" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={findRecipes}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-4"
          >
            Find Recipes
          </button>
        </div>
        <div className="flex flex-row items-start gap-4"> {/* Ensure flex-direction is row and add gap */}
          <UserInput />
          <Refrigerator />
        </div>
      </div>
    </div>
  );
};

export default MainPage;