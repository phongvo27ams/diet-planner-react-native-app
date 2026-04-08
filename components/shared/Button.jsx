import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '../../shared/Colors';

export default function Button({ title, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        width: '100%',
        borderRadius: 10,
      }}
    >
      <Text style={{
        color: Colors.WHITE,
        fontSize: 18,
        textAlign: 'center',
      }}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}