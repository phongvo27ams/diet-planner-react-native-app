import { View, Text } from 'react-native';
import React from 'react';
import Colors from '../shared/Colors';

export default function RecipeOptionList({ recipeOption }) {
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
          <View
            key={index}
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
          </View>
        ))}
      </View>
    </View>
  )
}