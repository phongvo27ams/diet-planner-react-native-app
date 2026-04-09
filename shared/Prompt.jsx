export default {
  CALORIES_PROMPT: `Based on Weight, Height, Gender, Goal, give me calories and proteins need daily consider age as 28 in JSON format and follow the schema:
  {
    calories:<>,
    proteins:<>
  }`,

  GENERATE_RECIPE_OPTION_PROMPT: `:Depends on user instruction create 3 different Recipe variant with Recipe Name with Emoji, 2 line description and main ingredient list in JSON format with field recipeName, description, ingredients (without size) only. Do not give me text response.`,

  GENERATE_COMPLETE_RECIPE_PROMPT: `
    - As per recipeName and description give me recipeName and description as field, give me all list of ingredients as ingredient
    - Emoji icons for each ingredient as icon, quantity as quantity, along with detail step by step recipe as steps
    - Total calories as calories (only number), minutes to cook as cookTime and serving number as serveTo
    - Realistic image Text prompt as per recipe as imagePrompt
    - Give me category list for recipe from [Breakfast,Lunch,Dinner,Salad,Dessert,Fastfood,Drink,Cake] as category
    - Give me response in JSON format only
    - Shema format should be:
    {
      "description": "string",
      "recipeName": "string",
      "calories": "number",
      "category": ["string"],
      "cookTime": "number",
      "imagePrompt": "string",
      "ingredients": [
        {
          "icon": "string",
          "ingredient": "string",
          "quantity": "string"
        }
      ],
      "serverTo": "number",
      "steps": ["string"]
    }
  `
}