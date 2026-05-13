import React, { useContext, useEffect, useMemo, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useConvex } from 'convex/react';
import moment from 'moment/moment';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Coffee02Icon, Moon02Icon, PlusSignIcon, Search01Icon, Sun03Icon } from '@hugeicons/core-free-icons';
import { useRouter } from 'expo-router';

import { api } from '../../convex/_generated/api';
import { UserContext } from '../../context/UserContext';
import { RefreshDataContext } from '../../context/RefreshDataContext';
import Colors from '../../shared/Colors';
import MealPlanCard from '../../components/MealPlanCard';

const mealFilters = [
  { title: 'All', icon: Search01Icon },
  { title: 'Breakfast', icon: Coffee02Icon },
  { title: 'Lunch', icon: Sun03Icon },
  { title: 'Dinner', icon: Moon02Icon },
];

export default function Meals() {
  const [selectedMeal, setSelectedMeal] = useState('All');
  const [mealPlan, setMealPlan] = useState([]);

  const convex = useConvex();
  const router = useRouter();
  const { user } = useContext(UserContext);
  const { refreshData } = useContext(RefreshDataContext);

  useEffect(() => {
    const getMeals = async () => {
      if (!user?._id) {
        return;
      }

      const result = await convex.query(api.MealPlan.GetTodaysMealPlan, {
        date: moment().format('DD/MM/YYYY'),
        uid: user._id,
      });
      setMealPlan(result ?? []);
    };

    getMeals();
  }, [convex, refreshData, user?._id]);

  const filteredMeals = useMemo(() => {
    if (selectedMeal === 'All') {
      return mealPlan;
    }

    return mealPlan.filter((item) => item?.mealPlan?.mealType === selectedMeal);
  }, [mealPlan, selectedMeal]);

  const completedMeals = mealPlan.filter((item) => item?.mealPlan?.status === true).length;

  return (
    <FlatList
      data={filteredMeals}
      keyExtractor={(item) => item?.mealPlan?._id}
      contentContainerStyle={{ padding: 20, paddingBottom: 110 }}
      ListHeaderComponent={
        <View>
          <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={{ fontSize: 28, fontWeight: 'bold' }}>Meals</Text>
              <Text style={{ fontSize: 16, color: Colors.GRAY, marginTop: 4 }}>
                {moment().format('dddd, MMM DD')}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => router.push('/generate-ai-recipe')}
              style={{
                width: 48,
                height: 48,
                borderRadius: 8,
                backgroundColor: Colors.PRIMARY,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <HugeiconsIcon icon={PlusSignIcon} color={Colors.WHITE} size={24} />
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 20, padding: 16, borderRadius: 8, backgroundColor: Colors.WHITE }}>
            <Text style={{ fontSize: 16, color: Colors.GRAY }}>Today</Text>
            <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 4 }}>
              {completedMeals}/{mealPlan.length || 3} meals done
            </Text>
            <View style={{ height: 10, borderRadius: 99, backgroundColor: Colors.SECONDARY, marginTop: 14 }}>
              <View
                style={{
                  width: `${mealPlan.length ? (completedMeals / mealPlan.length) * 100 : 0}%`,
                  height: 10,
                  borderRadius: 99,
                  backgroundColor: Colors.GREEN,
                }}
              />
            </View>
          </View>

          <FlatList
            horizontal
            data={mealFilters}
            keyExtractor={(item) => item.title}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10, marginTop: 18, marginBottom: 6 }}
            renderItem={({ item }) => {
              const isActive = selectedMeal === item.title;

              return (
                <TouchableOpacity
                  onPress={() => setSelectedMeal(item.title)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 7,
                    paddingVertical: 10,
                    paddingHorizontal: 14,
                    borderRadius: 8,
                    backgroundColor: isActive ? Colors.PRIMARY : Colors.WHITE,
                  }}
                >
                  <HugeiconsIcon icon={item.icon} size={18} color={isActive ? Colors.WHITE : Colors.PRIMARY} />
                  <Text style={{ color: isActive ? Colors.WHITE : '#222', fontSize: 16, fontWeight: '600' }}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      }
      renderItem={({ item }) => <MealPlanCard mealPlanInfo={item} />}
      ListEmptyComponent={
        <View style={{ marginTop: 35, alignItems: 'center', padding: 24, borderRadius: 8, backgroundColor: Colors.WHITE }}>
          <Image source={require('../../assets/images/logo.png')} style={{ width: 86, height: 86, opacity: 0.8 }} />
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>No meals planned</Text>
          <Text style={{ textAlign: 'center', color: Colors.GRAY, fontSize: 16, marginTop: 6 }}>
            Generate a recipe and add it to today&apos;s meal plan.
          </Text>
        </View>
      }
    />
  );
}
