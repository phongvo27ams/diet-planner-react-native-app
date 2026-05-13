import { View, Text } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment/moment';
import { useConvex } from 'convex/react';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';

import Colors from '../shared/Colors';
import { UserContext } from '../context/UserContext';
import { RefreshDataContext } from '../context/RefreshDataContext';

export default function TodayProgress() {
  const [totalCaloriesConsumed, setTotalCaloriesConsumed] = useState(0);

  const convex = useConvex();

  const { user } = useContext(UserContext);
  const { refreshData, setRefreshData } = useContext(RefreshDataContext);

  useEffect(() => {
    user && getTotalCaloriesConsumed();
  }, [user, refreshData])

  const getTotalCaloriesConsumed = async () => {
    const result = await convex.query(api.MealPlan.GetTotalCaloriesConsumed, {
      date: moment().format('DD/MM/YYYY'),
      uid: user?._id
    });

    setTotalCaloriesConsumed(result);
  }

  return (
    <View style={{ marginTop: 15, padding: 15, backgroundColor: Colors.WHITE, borderRadius: 10 }}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Today's Goal</Text>

        <Text style={{ fontSize: 18 }}>{moment().format('MMM DD, yyyy')}</Text>
      </View>

      <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginTop: 10, color: Colors.PRIMARY }}>{totalCaloriesConsumed}/{user?.calories} kCal</Text>

      <Text style={{ fontSize: 16, textAlign: 'center', marginTop: 2 }}>You are doing great!</Text>

      <View style={{ backgroundColor: Colors.GRAY, height: 10, borderRadius: 99, marginTop: 15, opacity: 0.7 }}>
        <View style={{ backgroundColor: Colors.PRIMARY, height: 10, borderRadius: 99, width: '70%' }}></View>
      </View>

      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
        <Text>Calories consumes</Text>
        <Text>Keep it up!</Text>
      </View>
    </View>
  )
}