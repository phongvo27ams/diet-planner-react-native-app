import { TextInput } from 'react-native';

export default function Input({ placeholder, password = false, onChangeText }) {
  return (
    <TextInput
      placeholder={placeholder}
      secureTextEntry={password}
      onChangeText={(value) => onChangeText(value)}
      style={{
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 18,
        padding: 15,
        paddingVertical: 20,
        width: '100%',
        marginTop: 15
      }}
    />
  )
}