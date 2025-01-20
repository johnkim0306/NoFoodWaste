import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib
import ast
import sys
import json

# Load data
data = pd.read_csv('recipes.csv')

print(data.columns)

# Convert RecipeIngredientParts to list
def parse_ingredients(ingredient_string):
    try:
        return ast.literal_eval(ingredient_string)
    except:
        return []

# Apply to the dataset
data['IngredientsList'] = data['RecipeIngredientParts'].apply(parse_ingredients)

# Define features of interest
ingredients_of_interest = ['tofu', 'soy sauce', 'garlic', 'onions', 'cardamom']  # Example ingredients

# Create binary columns for the presence of each ingredient
for ingredient in ingredients_of_interest:
    data[ingredient] = data['IngredientsList'].apply(lambda x: 1 if ingredient in x else 0)

# Ensure the 'RecipeCategory' column exists
if 'RecipeCategory' not in data.columns:
    raise KeyError("The 'RecipeCategory' column is missing from the dataset")

# Handle NaN values
data = data.dropna(subset=ingredients_of_interest + ['RecipeCategory'])

# Define features and labels
features = data[ingredients_of_interest]  # The binary features
labels = data['RecipeCategory']  # Example target label

# Split into training and testing sets
train_data, test_data = train_test_split(data, test_size=0.2, random_state=42)

# Train a model
model = RandomForestClassifier()
model.fit(train_data[ingredients_of_interest], train_data['RecipeCategory'])

# Save the model
joblib.dump(model, 'food_recommendation_model.pkl')

# Function to recommend recipes based on ingredients
def recommend_recipes(user_ingredients):
    # Convert user ingredients to binary features
    user_input_features = pd.DataFrame([1 if ingredient in user_ingredients else 0 for ingredient in ingredients_of_interest]).T
    user_input_features.columns = ingredients_of_interest
    
    # Predict the recipe categories
    predicted_categories = model.predict(user_input_features)
    
    # Get the top 5 recipes that match the predicted categories
    recommended_recipes = data[data['RecipeCategory'].isin(predicted_categories)].head(5)
    
    recipes = []
    for _, recipe in recommended_recipes.iterrows():
        recommended_image = recipe['Images'].split(",")[0].strip('c("').strip('"')
        recipes.append({
            "name": recipe['Name'],
            "image": recommended_image,
            "category": recipe['RecipeCategory'],
            "description": recipe['Description'],
            "instructions": recipe['RecipeInstructions']
        })
    
    return recipes

if __name__ == "__main__":
    if len(sys.argv) > 1:
        user_ingredients = json.loads(sys.argv[1])
    else:
        # Provide default ingredients for testing
        user_ingredients = ['tofu', 'soy sauce', 'garlic']
    
    recipes = recommend_recipes(user_ingredients)
    print(json.dumps({"recipes": recipes}))
