import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { CheckmarkSquare02Icon, SquareIcon } from '@hugeicons/core-free-icons';

import Colors from '../shared/Colors';
import { RefreshDataContext } from './../context/RefreshDataContext';

export default function MealPlanCard({ mealPlanInfo }) {
  const { refreshData, setRefreshData } = useContext(RefreshDataContext);

  const updateStatus = useMutation(api.MealPlan.UpdateStatus);

  const onCheck = async (status) => {
    const result = await updateStatus({
      id: mealPlanInfo?.mealPlan?._id,
      status: status,
      calories: mealPlanInfo?.recipe?.jsonData?.calories
    });

    Alert.alert('Success!', 'Status updated.');
    setRefreshData(Date.now());
  }

  return (
    <View style={{ padding: 10, display: 'flex', flexDirection: 'row', gap: 10, backgroundColor: Colors.WHITE, borderRadius: 15, marginTop: 10 }}>
      <Image source={{ uri: mealPlanInfo?.recipe?.imageUrl }} style={{ height: 70, width: 70, borderRadius: 15 }} />

      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10, flex: 1 }}>
        <View>
          <Text style={styles.mealTypeText}>{mealPlanInfo?.mealPlan?.mealType}</Text>
          <Text style={styles.recipeName}>{mealPlanInfo?.recipe?.recipeName}</Text>
          <Text style={styles.calories}>{mealPlanInfo?.recipe?.jsonData?.calories} kCal</Text>
        </View>

        <View>
          {mealPlanInfo?.mealPlan?.status != true ?
            <TouchableOpacity onPress={() => onCheck(true)}>
              <HugeiconsIcon icon={SquareIcon} color={Colors.GRAY} />
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => onCheck(false)}>
              <HugeiconsIcon icon={CheckmarkSquare02Icon} color={Colors.GREEN} />
            </TouchableOpacity>
          }
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mealTypeText: {
    backgroundColor: Colors.SECONDARY,
    color: Colors.PRIMARY,
    padding: 1,
    paddingHorizontal: 10,
    borderRadius: 99,
    flexWrap: 'wrap'
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  calories: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 5,
    color: Colors.GREEN
  }
})