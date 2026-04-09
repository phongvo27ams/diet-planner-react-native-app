import React from 'react';
import { View, Text, Platform, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

import Colors from './../../shared/Colors';
import Button from './../../components/shared/Button'

import RecipeIntro from '../../components/RecipeIntro';
import RecipeIngredents from '../../components/RecipeIngredents';
import RecipeSteps from '../../components/RecipeSteps';

export default function RecipeDetail() {
  const { recipeId } = useLocalSearchParams();
  console.log("recipeId", recipeId);
  const recipeDetail = useQuery(api.Recipes.GetRecipeById, {
    id: recipeId == undefined && 'j97ec3m20j9szh91trjfcgvzvs84h6p5'
  });
  console.log("recipeDetail", recipeDetail);

  return (
    <FlatList
      data={[]}
      renderItem={() => null}
      ListHeaderComponent={
        <View style={{ padding: 20, paddingTop: Platform.OS == 'ios' ? 40 : 30, backgroundColor: Colors.WHITE, height: '100%' }}>
          <RecipeIntro recipeDetail={recipeDetail} />
          <RecipeIngredents recipeDetail={recipeDetail} />
          <RecipeSteps recipeDetail={recipeDetail} />

          <View style={{marginTop: 15}}>
            <Button title={'Add to Meal Plan'} />
          </View>
        </View>
      }
    >
    </FlatList>
  )
}