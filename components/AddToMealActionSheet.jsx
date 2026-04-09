import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import moment from 'moment/moment';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { Coffee02Icon, Moon02Icon, Sun03Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';

import { UserContext } from './../context/UserContext';
import Colors from './../shared/Colors';
import Button from './shared/Button';

export default function AddToMealActionSheet({ recipeDetail, hideActionSheet }) {
  const [dateList, setDateList] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedMeal, setSelectedMeal] = useState();

  const { user } = useContext(UserContext);

  const createMealPlan = useMutation(api.MealPlan.CreateMealPlan);

  const mealOptions = [
    {
      title: 'Breakfast',
      icon: Coffee02Icon
    },
    {
      title: 'Lunch',
      icon: Sun03Icon
    },
    {
      title: 'Dinner',
      icon: Moon02Icon
    }
  ]

  useEffect(() => {
    GenerateDates();
  }, [])

  const GenerateDates = () => {
    const result = [];
    for (let i = 0; i < 4; i++) {
      const nextDate = moment().add(i, 'days').format('DD/MM/YYYY');
      result.push(nextDate);
    }
    console.log(result);
    setDateList(result);
  }

  const addToMealPlan = async () => {
    if (!selectedDate && !selectedMeal) {
      Alert.alert('Missing fields!', 'Please select date and meal.')
      return;
    }

    const result = await createMealPlan({
      date: selectedDate,
      mealType: selectedMeal,
      recipeId: recipeDetail?._id,
      uid: user?._id
    })

    console.log(result);
    Alert.alert('Success!', 'Added to Meal Plan.');
    hideActionSheet();
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Add to Meal</Text>

      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 15 }}>Select Date</Text>
      <FlatList
        data={dateList}
        numColumns={4}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              display: 'flex', flex: 1, alignItems: 'center', padding: 7, borderWidth: 1, borderRadius: 10, margin: 5,
              borderColor: selectedDate == item ? Colors.PRIMARY : Colors.GRAY,
              backgroundColor: selectedDate == item ? Colors.SECONDARY : Colors.WHITE
            }}
            onPress={() => setSelectedDate(item)}
          >
            <Text style={{ fontSize: 18, fontWeight: '500' }}>{moment(item, 'DD/MM/YYYY').format('ddd')}</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{moment(item, 'DD/MM/YYYY').format('DD')}</Text>
            <Text style={{ fontSize: 16 }}>{moment(item, 'DD/MM/YYYY').format('MMM')}</Text>
          </TouchableOpacity>
        )}
      />

      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 15 }}>Select Meal</Text>
      <FlatList
        data={mealOptions}
        numColumns={4}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              display: 'flex', flex: 1, alignItems: 'center', padding: 7, borderWidth: 1, borderRadius: 10, margin: 5,
              borderColor: selectedMeal == item.title ? Colors.PRIMARY : Colors.GRAY,
              backgroundColor: selectedMeal == item.title ? Colors.SECONDARY : Colors.WHITE
            }}
            onPress={() => setSelectedMeal(item?.title)}
          >
            <HugeiconsIcon icon={item.icon} />
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />

      <View style={{ marginTop: 15 }}>
        <Button title={'+ Add to Meal Plan'} onPress={addToMealPlan} />

        <TouchableOpacity style={{ padding: 15 }} onPress={() => hideActionSheet()}>
          <Text style={{ textAlign: 'center', fontSize: 20 }}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}