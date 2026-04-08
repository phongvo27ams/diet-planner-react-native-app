import { View, Text, Platform, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';

import Colors from './../../shared/Colors';
import Prompt from './../../shared/Prompt';
import Button from './../../components/shared/Button';
import { GenerateRecipeOptionsAI } from './../../services/AiModel';
import RecipeOptionList from './../../components/RecipeOptionList';

export default function GenerateAIRecipe() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipeOption, setRecipeOption] = useState([]);

  const GenerateRecipeOptions = async () => {
    setLoading(true);

    try {
      // Make AI model call to generate recipe options
      const PROMPT = input + Prompt.GENERATE_RECIPE_OPTION_PROMPT;
      const result = await GenerateRecipeOptionsAI(PROMPT);
      console.log(result.choices[0].message);

      const extractedJson = (result.choices[0].message.content).replace('```json', '').replace('```', '');
      const parsedJsonResponse = JSON.parse(extractedJson);
      console.log(parsedJsonResponse);
      setRecipeOption(parsedJsonResponse);
      console.log('recipeOption', recipeOption);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }

  return (
    <View
      style={{
        paddingTop: Platform.OS == 'ios' ? 40 : 30,
        padding: 20,
        backgroundColor: Colors.WHITE,
        height: '100%'
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontWeight: 'bold'
        }}
      >
        AI Recipe Generator
      </Text>

      <Text
        style={{
          marginTop: 5,
          colors: Colors.GRAY,
          fontSize: 16
        }}
      >
        Generate personalized recipes using AI
      </Text>

      <TextInput
        style={styles.textArea}
        onChangeText={value => setInput(value)}
        placeholder='Enter your ingredents or recipe name'
      />

      <View
        style={{
          marginTop: 25
        }}
      >
        <Button
          title={'Generate recipe'}
          onPress={GenerateRecipeOptions}
          loading={loading}
        />
      </View>

      {recipeOption?.length > 0 && <RecipeOptionList recipeOption={recipeOption} />}
    </View>
  )
}

const styles = StyleSheet.create({
  textArea: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 20,
    marginTop: 15,
    height: 150,
    textAlignVertical: 'top',
    backgroundColor: Colors.WHITE
  }
})