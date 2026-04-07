import { View, Text } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { UserContext } from './../../context/UserContext';

export default function Home() {
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!user?.weight) {
      router.replace('/preferences');
    }
  }, [user]);

  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}