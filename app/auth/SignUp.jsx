import { View, Text, Image, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState, useContext } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import * as Sentry from '@sentry/react-native';
import { auth } from '../../services/FirebaseConfig';
import { setSentryUserContext } from '../../services/SentryService';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

import { UserContext } from '../../context/UserContext';

import Input from '../../components/shared/Input';
import Button from '../../components/shared/Button';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const createNewUser = useMutation(api.Users.CreateNewUser);

  const { setUser } = useContext(UserContext);
  const router = useRouter();

  const onSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert('Missing fields!', 'Please fill all the fields');
      return;
    }

    try {
      const result = await Sentry.startSpan(
        {
          name: 'auth.sign_up',
          op: 'auth.register',
          attributes: {
            screen: 'SignUp',
            method: 'email_password',
          },
        },
        async () => {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          Sentry.setTag('auth.firebase_uid', userCredential.user.uid);

          return createNewUser({
            name: name,
            email: email
          });
        }
      );

      setUser(result);
      setSentryUserContext(result, 'sign_up');
      router.replace('/(tabs)/Home');
    } catch (error) {
      Sentry.captureException(error, {
        tags: {
          feature: 'auth',
          flow: 'sign_up',
        },
      });
      Alert.alert('Error signing up!', 'Please try again later');
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
        Create New Account
      </Text>

      <View style={{
        width: '100%',
        marginTop: 12
      }}>
        <Input placeholder={'Full Name'} onChangeText={setName} />
        <Input placeholder={'Email'} onChangeText={setEmail} />
        <Input placeholder={'Password'} password={true} onChangeText={setPassword} />
      </View>

      <View style={{
        width: '100%',
        marginTop: 10
      }}>
        <Button
          title={'Create Account'}
          onPress={() => onSignUp()}
          style={{
            marginTop: 10
          }}
        />

        <Text style={{
          textAlign: 'center',
          fontSize: 16,
          marginTop: 15
        }}>
          Already have an account?
        </Text>

        <Link href={'/auth/SignIn'} asChild>
          <Text style={{
            textAlign: 'center',
            fontSize: 16,
            marginTop: 5,
            fontWeight: 'bold'
          }}>
            Sign In Here
          </Text>
        </Link>
      </View>
    </View>
  )
}
