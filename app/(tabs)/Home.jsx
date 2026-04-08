import { View, Text } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { UserContext } from './../../context/UserContext';

import HomeHeader from '../../components/HomeHeader';
import TodayProgress from '../../components/TodayProgress';
import GenerateRecipeCard from '../../components/GenerateRecipeCard';
import TodaysMealPlan from '../../components/TodaysMealPlan';

export default function Home() {
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!user?.weight) {
      router.replace('/preferences');
    }
  }, [user]);

  return (
    <View
      style={{
        padding: 20
      }}
    >
      <HomeHeader />
      <TodayProgress />
      <GenerateRecipeCard />
      <TodaysMealPlan />
    </View>
  )
}