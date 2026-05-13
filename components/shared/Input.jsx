import { View, Text, TextInput } from 'react-native';

export default function Input({ placeholder, password = false, onChangeText, label = '' }) {
  return (
    <View style={{
      marginTop: 10,
      width: '100%'
    }}>
      {label ? (
        <Text style={{
          fontWeight: '500',
          fontSize: 16,
          marginBottom: 6
        }}>
          {label}
        </Text>
      ) : null}

      <TextInput
        placeholder={placeholder}
        secureTextEntry={password}
        onChangeText={(value) => onChangeText(value)}
        style={{
          paddingHorizontal: 14,
          borderWidth: 1,
          borderRadius: 8,
          fontSize: 16,
          paddingVertical: 14,
          width: '100%',
        }}
      />
    </View>

  )
}
