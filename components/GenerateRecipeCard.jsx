import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { ArrowRight02Icon } from '@hugeicons/core-free-icons';
import { useRouter } from 'expo-router';

import Colors from '../shared/Colors';

export default function GenerateRecipeCard() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={[Colors.BLUE, Colors.PRIMARY]}
      style={{
        marginTop: 15,
        padding: 15,
        borderRadius: 10
      }}
    >
      <Text
        style={{
          fontSize: 23,
          fontWeight: 'bold',
          color: Colors.WHITE
        }}
      >
        Need Meal Ideas?
      </Text>

      <Text
        style={{
          color: Colors.WHITE,
          fontSize: 18,
          opacity: 0.8,
          marginTop: 7
        }}
      >
        Let's our AI generate personalized recipes just for you!
      </Text>

      <TouchableOpacity
        onPress={() => router.push('/generate-ai-recipe')}
        style={{
          padding: 12,
          backgroundColor: Colors.WHITE,
          marginTop: 10,
          borderRadius: 8,
          width: 190,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 7
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: Colors.PRIMARY
          }}
        >
          Generate with AI
        </Text>

        <HugeiconsIcon icon={ArrowRight02Icon} color={Colors.PRIMARY} />
      </TouchableOpacity>
    </LinearGradient>
  )
}