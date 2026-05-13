import { useEffect, useState } from "react";
import { Stack, useNavigationContainerRef } from "expo-router";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { UserContext } from "./../context/UserContext";
import { RefreshDataContext } from "./../context/RefreshDataContext";
import * as Sentry from '@sentry/react-native';
import { setSentryDeviceContext } from "../services/SentryService";

const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: true,
  enablePrefetchTracking: true,
  useFullPathsForNavigationRoutes: true,
});

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  tracesSampleRate: __DEV__ ? 1.0 : 0.2,
  profilesSampleRate: __DEV__ ? 1.0 : 0.1,
  enableAppStartTracking: true,
  enableNativeFramesTracking: true,
  enableStallTracking: true,
  _experiments: {
    profilingOptions: {
      profileSessionSampleRate: __DEV__ ? 1.0 : 0.1,
      lifecycle: 'trace',
      startOnAppStart: true,
    },
  },

  // Configure Session Replay
  replaysSessionSampleRate: __DEV__ ? 1.0 : 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [
    Sentry.reactNativeTracingIntegration(),
    navigationIntegration,
    Sentry.mobileReplayIntegration({
      maskAllText: true,
      maskAllImages: true,
      maskAllVectors: true,
    }),
    Sentry.feedbackIntegration(),
  ],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

setSentryDeviceContext();

export default Sentry.wrap(function RootLayout() {
  const navigationRef = useNavigationContainerRef();
  const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!);

  const [user, setUser] = useState();
  const [refreshData, setRefreshData] = useState();

  useEffect(() => {
    navigationIntegration.registerNavigationContainer(navigationRef);
  }, [navigationRef]);

  return (
    <ConvexProvider client={convex}>
      <UserContext.Provider value={{ user, setUser }}>
        <RefreshDataContext.Provider value={{ refreshData, setRefreshData }}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
          </Stack>
        </RefreshDataContext.Provider>
      </UserContext.Provider>
    </ConvexProvider>
  )
});
