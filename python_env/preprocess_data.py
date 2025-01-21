import pandas as pd
import joblib
import ast

# Load data
data = pd.read_csv('recipes.csv')

# Convert RecipeIngredientParts to list
def parse_ingredients(ingredient_string):
    try:
        return ast.literal_eval(ingredient_string)
    except:
        return []

# Apply to the dataset
data['IngredientsList'] = data['RecipeIngredientParts'].apply(parse_ingredients)

# Save the preprocessed data
joblib.dump(data, 'preprocessed_data.pkl')
