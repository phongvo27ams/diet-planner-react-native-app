import { Dimensions, Text, View, Image } from "react-native";
import { usePathname, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { onAuthStateChanged } from "firebase/auth";
import { api } from "@/convex/_generated/api";
import { useContext, useEffect } from "react";
import { useConvex } from "convex/react";

import { auth } from "../services/FirebaseConfig";
import { setSentryUserContext } from "../services/SentryService";
import { UserContext } from "../context/UserContext";
import Colors from "../shared/Colors";
import Button from "../components/shared/Button";
import * as Sentry from "@sentry/react-native";

export default function Index() {
  const convex = useConvex();
  const pathname = usePathname();
  const router = useRouter();

  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userInfo) => {
      try {
        if (!userInfo?.email) {
          setSentryUserContext(null);
          return;
        }

        Sentry.setTag("auth.firebase_uid", userInfo.uid);

        const userData = await Sentry.startSpan(
          {
            name: "auth.bootstrap_user",
            op: "auth.session",
            attributes: {
              screen: "index",
              provider: userInfo.providerId,
            },
          },
          () => convex.query(api.Users.GetUser, {
            email: userInfo.email
          })
        );

        if (userData) {
          setUser(userData);
          setSentryUserContext(userData, "session_restore");

          if (pathname === "/" || pathname.startsWith("/auth")) {
            router.replace('/(tabs)/Home');
          }
        }
      } catch (error) {
        Sentry.captureException(error, {
          tags: {
            feature: "auth",
            flow: "session_restore",
          },
        });
      }
    });
    return () => unsubscribe();
  }, [convex, pathname, router, setUser]);

  return (
    <View
      style={{
        flex: 1
      }}
    >
      <Image source={require('./../assets/images/landing.jpg')}
        style={{
          width: '100%',
          height: Dimensions.get('screen').height
        }}
      />
      <View style={{
        position: 'absolute',
        height: Dimensions.get('screen').height,
        backgroundColor: '#0707075e',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: 20
      }}>
        <Image source={require('./../assets/images/logo.png')}
          style={{
            width: 150,
            height: 150,
            marginTop: 100
          }}
        />

        <Text style={{
          color: Colors.WHITE,
          fontSize: 30,
          fontWeight: 'bold'
        }}>
          Diet Planner
        </Text>

        <Text style={{
          color: Colors.WHITE,
          fontSize: 20,
          textAlign: 'center',
          marginHorizontal: 20,
          marginTop: 15,
          opacity: 0.8
        }}>
          Craft delicious, healthy, mean plans tailored just for you. Achieve your goals with our personalized diet plans.
        </Text>
      </View>

      <View style={{
        position: 'absolute',
        bottom: 25,
        width: '100%',
        padding: 20
      }}>
        <Button
          title={'Get Started'}
          onPress={() => router.push('/auth/SignIn')}
          icon={<Ionicons name="arrow-forward" size={24} color="white" />}
        />
      </View>
    </View>
  );
}
