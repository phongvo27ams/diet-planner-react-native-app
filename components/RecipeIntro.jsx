import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Dumbbell01Icon, Fire03Icon, PlusSignSquareIcon, ServingFoodIcon, TimeQuarter02Icon } from '@hugeicons/core-free-icons';

import Colors from '../shared/Colors';

export default function RecipeIntro({ recipeDetail }) {
  const recipeJson = recipeDetail?.jsonData;

  return (
    <View style={{ marginTop: 20 }}>
      <Image source={{ uri: recipeDetail?.imageUrl }} style={{ width: '100%', height: 200, borderRadius: 15 }} />
      <View style={{ marginTop: 15, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{recipeDetail?.recipeName}</Text>
        <HugeiconsIcon icon={PlusSignSquareIcon} size={40} color={Colors.PRIMARY} />
      </View>

      <Text style={{ fontSize: 16, marginTop: 6, lineHeight: 25, color: Colors.GRAY }}>{recipeJson?.description}</Text>

      <View style={{ display: 'flex', marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
        <View style={styles.propertiesContainer}>
          <HugeiconsIcon icon={Fire03Icon} color={Colors.PRIMARY} size={30} />
          <Text style={styles.subText}>Calories</Text>
          <Text style={styles.counts}>{recipeJson?.calories}</Text>
        </View>

        {/* <View style={styles.propertiesContainer}>
          <HugeiconsIcon icon={Dumbbell01Icon} color={Colors.PRIMARY} size={30} />
          <Text style={styles.subText}>Proteins</Text>
          <Text style={styles.counts}>{recipeJson?.calories}</Text>
        </View> */}

        <View style={styles.propertiesContainer}>
          <HugeiconsIcon icon={TimeQuarter02Icon} color={Colors.PRIMARY} size={30} />
          <Text style={styles.subText}>Time</Text>
          <Text style={styles.counts}>{recipeJson?.cookTime} min</Text>
        </View>

        <View style={styles.propertiesContainer}>
          <HugeiconsIcon icon={ServingFoodIcon} color={Colors.PRIMARY} size={30} />
          <Text style={styles.subText}>Serve</Text>
          <Text style={styles.counts}>{recipeJson?.serverTo}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  iconBg: {
    padding: 6
  },
  propertiesContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#FBF5FF',
    padding: 6,
    borderRadius: 10,
    flex: 1
  },
  subText: {
    fontSize: 18
  },
  counts: {
    fontSize: 22,
    color: Colors.PRIMARY,
    fontWeight: 'bold'
  }
})