import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '../../shared/Colors';

export default function Button({ title, onPress, icon, loading = false }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      style={{
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        width: '100%',
        borderRadius: 10,
      }}
    >
      {
        loading ? <ActivityIndicator color={Colors.WHITE} /> :
          <Text style={{
            color: Colors.WHITE,
            fontSize: 18,
            textAlign: 'center',
          }}>
            {icon} {title}
          </Text>
      }
    </TouchableOpacity>
  )
}