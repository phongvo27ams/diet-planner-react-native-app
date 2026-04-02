import { Stack } from "expo-router";
import { ConvexProvider, ConvexReactClient } from "convex/react";

export default function RootLayout() {
  const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!);
  unsavedChangeWarning: false;

  return (
    <ConvexProvider client={convex}>
      <Stack screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="index" />
      </Stack>
    </ConvexProvider>
  )
}
