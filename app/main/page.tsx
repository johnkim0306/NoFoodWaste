"use client";

import { useMemo } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import Refrigerator from "@/components/Refrigerator";

const MainPage: React.FC = () => {
  const foodItems = useSelector((state: RootState) => state.foodItems.items);

  const shelves = useMemo(() => {
    const newShelves = [];
    for (let i = 0; i < foodItems.length; i += 5) {
      newShelves.push(foodItems.slice(i, i + 5).map(item => item.name));
    }
    return newShelves;
  }, [foodItems]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row items-start justify-center bg-gray-100 p-4 gap-8">
        <div className="shelf-container w-full p-4">
          <h1 className="text-2xl font-bold mb-4">Food Shelf</h1>
          {shelves.map((shelf, index) => (
            <div key={index} className="shelf mb-8">
              <div className="books grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {shelf.map((item, idx) => (
                  <div key={idx} className="food-item bg-green-200 p-2 m-2 rounded flex flex-col items-center">
                    <img src={`/images/${item}.jpg`} alt={item} className="w-16 h-16 object-cover mb-2" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Refrigerator />
      </div>
    </div>
  );
};

export default MainPage;