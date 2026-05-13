import React, { useContext } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Alert02Icon, ArrowRight02Icon, Logout03Icon, Mail01Icon, Settings02Icon, Target02Icon, UserSquareIcon } from '@hugeicons/core-free-icons';
import { signOut } from 'firebase/auth';
import * as Sentry from '@sentry/react-native';

import { auth } from '../../services/FirebaseConfig';
import { setSentryUserContext } from '../../services/SentryService';
import { UserContext } from '../../context/UserContext';
import Colors from '../../shared/Colors';

const profileRows = [
  { title: 'Preferences', subtitle: 'Goal, calories and body profile', icon: Target02Icon, route: '/preferences' },
  { title: 'Account', subtitle: 'Email and profile information', icon: UserSquareIcon },
  { title: 'Settings', subtitle: 'Notifications and app preferences', icon: Settings02Icon },
];

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  const onLogOut = async () => {
    await signOut(auth);
    setUser(undefined);
    setSentryUserContext(null);
    router.replace('/');
  };

  const sendSentryDemoEvent = () => {
    Sentry.captureException(new Error('Demo mobile replay and email alert from Profile'));
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ marginTop: 30 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold' }}>Profile</Text>
        <Text style={{ fontSize: 16, color: Colors.GRAY, marginTop: 4 }}>Manage your diet planner account.</Text>
      </View>

      <View style={{ marginTop: 20, padding: 18, borderRadius: 8, backgroundColor: Colors.WHITE, alignItems: 'center' }}>
        <Image source={require('../../assets/images/user.png')} style={{ width: 92, height: 92, borderRadius: 99 }} />
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 12 }}>{user?.name ?? 'Guest User'}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 }}>
          <HugeiconsIcon icon={Mail01Icon} color={Colors.GRAY} size={18} />
          <Text style={{ color: Colors.GRAY, fontSize: 16 }}>{user?.email ?? 'No email connected'}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', gap: 12, marginTop: 14 }}>
        <View style={{ flex: 1, padding: 14, borderRadius: 8, backgroundColor: Colors.WHITE }}>
          <Text style={{ color: Colors.GRAY, fontSize: 14 }}>Calories</Text>
          <Text style={{ fontSize: 22, fontWeight: 'bold', marginTop: 4 }}>{user?.calories ?? '--'}</Text>
        </View>
        <View style={{ flex: 1, padding: 14, borderRadius: 8, backgroundColor: Colors.WHITE }}>
          <Text style={{ color: Colors.GRAY, fontSize: 14 }}>Credit</Text>
          <Text style={{ fontSize: 22, fontWeight: 'bold', marginTop: 4 }}>{user?.credit ?? 0}</Text>
        </View>
      </View>

      <View style={{ marginTop: 22, gap: 12 }}>
        {profileRows.map((item) => (
          <TouchableOpacity
            key={item.title}
            activeOpacity={0.8}
            onPress={() => item.route && router.push(item.route)}
            style={{
              padding: 16,
              borderRadius: 8,
              backgroundColor: Colors.WHITE,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }}>
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 8,
                  backgroundColor: Colors.SECONDARY,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <HugeiconsIcon icon={item.icon} color={Colors.PRIMARY} size={24} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{item.title}</Text>
                <Text style={{ fontSize: 14, color: Colors.GRAY, marginTop: 3 }}>{item.subtitle}</Text>
              </View>
            </View>
            <HugeiconsIcon icon={ArrowRight02Icon} color={Colors.GRAY} size={20} />
          </TouchableOpacity>
        ))}
      </View>

      {__DEV__ ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={sendSentryDemoEvent}
          style={{
            marginTop: 18,
            padding: 16,
            borderRadius: 8,
            backgroundColor: Colors.SECONDARY,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <HugeiconsIcon icon={Alert02Icon} color={Colors.PRIMARY} size={22} />
          <Text style={{ color: Colors.PRIMARY, fontSize: 17, fontWeight: 'bold' }}>Send Sentry Demo Event</Text>
        </TouchableOpacity>
      ) : null}

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onLogOut}
        style={{
          marginTop: 18,
          padding: 16,
          borderRadius: 8,
          backgroundColor: '#FFF1F1',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        <HugeiconsIcon icon={Logout03Icon} color="#D92D20" size={22} />
        <Text style={{ color: '#D92D20', fontSize: 17, fontWeight: 'bold' }}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
