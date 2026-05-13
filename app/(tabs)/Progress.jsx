import React, { useContext } from 'react';
import { FlatList, Text, View } from 'react-native';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { AnalyticsUpIcon, FireIcon, Target02Icon, WeightScaleIcon } from '@hugeicons/core-free-icons';

import { UserContext } from '../../context/UserContext';
import Colors from '../../shared/Colors';

const stats = [
  { title: 'Calories', keyName: 'calories', suffix: 'kCal', icon: FireIcon, color: Colors.PRIMARY },
  { title: 'Protein', keyName: 'proteins', suffix: 'g', icon: AnalyticsUpIcon, color: Colors.GREEN },
  { title: 'Weight', keyName: 'weight', suffix: 'kg', icon: WeightScaleIcon, color: Colors.BLUE },
];

export default function Progress() {
  const { user } = useContext(UserContext);
  const calorieGoal = user?.calories ?? 0;
  const sampleConsumed = calorieGoal ? Math.round(calorieGoal * 0.68) : 0;
  const progress = calorieGoal ? Math.min((sampleConsumed / calorieGoal) * 100, 100) : 0;

  return (
    <FlatList
      data={stats}
      keyExtractor={(item) => item.title}
      contentContainerStyle={{ padding: 20, paddingBottom: 110 }}
      ListHeaderComponent={
        <View>
          <View style={{ marginTop: 30 }}>
            <Text style={{ fontSize: 28, fontWeight: 'bold' }}>Progress</Text>
            <Text style={{ fontSize: 16, color: Colors.GRAY, marginTop: 4 }}>
              Track your nutrition goal at a glance.
            </Text>
          </View>

          <View style={{ marginTop: 20, padding: 18, borderRadius: 8, backgroundColor: Colors.WHITE }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <Text style={{ fontSize: 16, color: Colors.GRAY }}>Daily calories</Text>
                <Text style={{ fontSize: 32, fontWeight: 'bold', marginTop: 4 }}>
                  {sampleConsumed}/{calorieGoal || '--'}
                </Text>
              </View>
              <View
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 8,
                  backgroundColor: Colors.SECONDARY,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <HugeiconsIcon icon={Target02Icon} color={Colors.PRIMARY} size={28} />
              </View>
            </View>

            <View style={{ height: 12, borderRadius: 99, backgroundColor: Colors.SECONDARY, marginTop: 18 }}>
              <View
                style={{
                  width: `${progress}%`,
                  height: 12,
                  borderRadius: 99,
                  backgroundColor: progress > 90 ? Colors.GREEN : Colors.PRIMARY,
                }}
              />
            </View>
            <Text style={{ color: Colors.GRAY, fontSize: 15, marginTop: 10 }}>
              {Math.round(progress)}% of your target logged today
            </Text>
          </View>

          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 24, marginBottom: 10 }}>Goal Summary</Text>
        </View>
      }
      renderItem={({ item }) => (
        <View
          style={{
            padding: 16,
            borderRadius: 8,
            backgroundColor: Colors.WHITE,
            marginBottom: 12,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 8,
                backgroundColor: Colors.SECONDARY,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <HugeiconsIcon icon={item.icon} color={item.color} size={24} />
            </View>
            <Text style={{ fontSize: 17, fontWeight: '600' }}>{item.title}</Text>
          </View>

          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            {user?.[item.keyName] ?? '--'} {item.suffix}
          </Text>
        </View>
      )}
      ListFooterComponent={
        <View style={{ padding: 16, borderRadius: 8, backgroundColor: Colors.WHITE, marginTop: 8 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Current goal</Text>
          <Text style={{ color: Colors.GRAY, fontSize: 16, marginTop: 6 }}>
            {user?.goal ?? 'Complete your preferences to personalize progress tracking.'}
          </Text>
        </View>
      }
    />
  );
}
