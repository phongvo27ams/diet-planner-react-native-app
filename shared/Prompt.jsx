export default {
  CALORIES_PROMPT: `Based on Weight, Height, Gender, Goal, give me calories and proteins need daily consider age as 28 in JSON format and follow the schema:
  {
    calories:<>,
    proteins:<>
  }`,

  GENERATE_RECIPE_OPTION_PROMPT: `:Depends on user instruction create 3 different Recipe variant with Recipe Name with Emoji, 2 line description and main ingredient list in JSON format with field recipeName, description, ingredients (without size) only. Do not give me text response.`,
}