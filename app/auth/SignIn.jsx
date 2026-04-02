import { View, Text, Image, Alert } from 'react-native';
import { Link } from 'expo-router';
import { useState } from 'react';

import Input from '../../components/shared/Input';
import Button from '../../components/shared/Button';

export default function SignIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignIn = () => {
    if (!email || !password) {
      Alert.alert('Missing fields!', 'Please fill all the fields');
      return;
    }
  }

  return (
    <View style={{
      display: 'flex',
      alignItems: 'center',
      padding: 20
    }}>
      <Image source={require('./../../assets/images/logo.png')}
        style={{
          width: 150,
          height: 150,
          marginTop: 60
        }}
      />

      <Text style={{
        fontSize: 35,
        fontWeight: 'bold'
      }}>
        Welcome Back!
      </Text>

      <View style={{
        width: '100%',
        marginTop: 20
      }}>
        <Input placeholder={'Email'} onChangeText={setEmail} />
        <Input placeholder={'Password'} password={true} onChangeText={setPassword} />
      </View>

      <View style={{
        width: '100%',
        marginTop: 15
      }}>
        <Button title={'Sign In'} onPress={() => onSignIn()} style={{
          marginTop: 20
        }} />
        <Text style={{
          textAlign: 'center',
          fontSize: 16,
          marginTop: 15
        }}>
          Don't have an account?</Text>
        <Link href={'/auth/SignUp'} asChild>
          <Text style={{
            textAlign: 'center',
            fontSize: 16,
            marginTop: 5,
            fontWeight: 'bold'
          }}>
            Create new account
          </Text>
        </Link>
      </View>
    </View>
  )
}