"use client";

import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

interface Recipe {
  name: string;
  image: string;
  category: string;
  description: string;
  instructions: string;
}

const FindRecipesPage: React.FC = () => {
  const recipes = useSelector((state: RootState) => state.foodItems.recipes);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-16">Recipes</h1>
      {recipes.length > 0 ? (
        <ul className="list-disc list-inside">
          {recipes.map((recipe, index) => (
            <li key={index}>
              <h3>{recipe.name}</h3>
              <img src={recipe.image} alt={recipe.name} className="w-24 h-24 object-cover mb-2" />
              <p><strong>Category:</strong> {recipe.category}</p>
              <p><strong>Description:</strong> {recipe.description}</p>
              <p><strong>Instructions:</strong> {recipe.instructions}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
};

export default FindRecipesPage;
