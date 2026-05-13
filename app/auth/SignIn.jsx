import { View, Text, Image, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState, useContext } from 'react';
import { useConvex } from 'convex/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { api } from '../../convex/_generated/api';
import * as Sentry from '@sentry/react-native';

import { auth } from '../../services/FirebaseConfig';
import { setSentryUserContext } from '../../services/SentryService';
import { UserContext } from '../../context/UserContext';
import Input from '../../components/shared/Input';
import Button from '../../components/shared/Button';

export default function SignIn() {
  const convex = useConvex();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);

  const onSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Missing fields!', 'Please fill all the fields');
      return;
    }

    try {
      const userData = await Sentry.startSpan(
        {
          name: 'auth.sign_in',
          op: 'auth.login',
          attributes: {
            screen: 'SignIn',
            method: 'email_password',
          },
        },
        async () => {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          Sentry.setTag('auth.firebase_uid', userCredential.user.uid);

          return convex.query(api.Users.GetUser, {
            email: email
          });
        }
      );

      if (!userData) {
        throw new Error('Signed in Firebase user does not exist in Convex users table');
      }

      setUser(userData);
      setSentryUserContext(userData, 'sign_in');
      router.replace('/(tabs)/Home');
    } catch (error) {
      Sentry.captureException(error, {
        tags: {
          feature: 'auth',
          flow: 'sign_in',
        },
      });
      Alert.alert('Error signing in!', 'Please check your credentials and try again');
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
        marginTop: 12
      }}>
        <Input placeholder={'Email'} onChangeText={setEmail} />
        <Input placeholder={'Password'} password={true} onChangeText={setPassword} />
      </View>

      <View style={{
        width: '100%',
        marginTop: 10
      }}>
        <Button title={'Sign In'} onPress={() => onSignIn()} style={{
          marginTop: 10
        }} />
        <Text style={{
          textAlign: 'center',
          fontSize: 16,
          marginTop: 15
        }}>
          Don&apos;t have an account?</Text>
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
