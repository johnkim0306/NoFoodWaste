"use client";

import { useState } from "react";

const MainPage = () => {
  const [foodItems, setFoodItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFoodItems(inputValue.split(",").map(item => item.trim()));
  };

  const shelves = [];
  for (let i = 0; i < foodItems.length; i += 5) {
    shelves.push(foodItems.slice(i, i + 5));
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Food Shelf</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <label className="block mb-2">
          Enter food items (comma separated):
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          />
        </label>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>
      <div className="shelf-container w-full p-4">
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
      <div className="fridge">
        <div className="fridge-body">
          <div className="handle top"></div>
          <div className="handle bottom"></div>
          <div className="divider"></div>
          <div className="hightlight top"></div>
          <div className="hightlight bottom"></div>
          <div className="shadow-bottom"></div>
        </div>
        <div className="fridge-shadow"></div>
      </div>
    </div>
  );
};

export default MainPage;