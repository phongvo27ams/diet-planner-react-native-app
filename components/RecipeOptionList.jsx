import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { useMutation } from 'convex/react';
import { api } from './../convex/_generated/api';

import Colors from '../shared/Colors';
import Prompt from '../shared/Prompt';
import { GenerateAIRecipe, GenerateRecipeImage } from '../services/AiModel';
import LoadingDialog from './LoadingDialog';
import { UserContext } from './../context/UserContext';

export default function RecipeOptionList({ recipeOption }) {
  const [loading, setLoading] = useState(false);

  const CreateRecipe = useMutation(api.Recipes.CreateRecipe);
  const { user } = useContext(UserContext);

  const onRecipeOptionSelect = async (recipe) => {
    setLoading(true);

    const PROMPT = "RecipeName: " + recipe?.recipeName + "Description: " + recipe?.description + Prompt.GENERATE_COMPLETE_RECIPE_PROMPT;
    console.log("PROMPT", PROMPT);

    try {
      const result = await GenerateAIRecipe(PROMPT);
      const extractedJson = (result.choices[0].message.content).replace('```json', '').replace('```', '');
      const parsedJsonResponse = JSON.parse(extractedJson);
      console.log("parsedJsonResponse", parsedJsonResponse);

      // Generate recipe image
      const aiImageResponse = await GenerateRecipeImage(parsedJsonResponse?.imagePrompt);
      console.log("aiImageResponse", aiImageResponse?.data?.image);

      // Save to database
      const saveRecipeResult = await CreateRecipe({
        jsonData: parsedJsonResponse,
        imageUrl: aiImageResponse?.data?.image,
        recipeName: parsedJsonResponse?.recipeName,
        uid: user?._id
      })
      console.log("saveRecipeResult", saveRecipeResult);

      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }

  return (
    <View
      style={{
        marginTop: 20
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold'
        }}
      >
        Select Recipe
      </Text>

      <View>
        {recipeOption?.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onRecipeOptionSelect(item)}
            style={{
              padding: 15,
              borderWidth: 0.2,
              borderRadius: 15,
              marginTop: 15
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                marginBottom: 10
              }}
            >
              {item?.recipeName}
            </Text>

            <Text
              style={{
                color: Colors.GRAY
              }}
            >
              {item?.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <LoadingDialog loading={loading} />
    </View>
  )
}