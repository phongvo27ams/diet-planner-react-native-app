import { useState } from "react";
import { Stack } from "expo-router";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { UserContext } from "./../context/UserContext";

export default function RootLayout() {
  const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!);
  unsavedChangeWarning: false;

  const [user, setUser] = useState(null);

  return (
    <ConvexProvider client={convex}>
      <UserContext.Provider value={{ user, setUser }}>
        <Stack screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="index" />
        </Stack>
      </UserContext.Provider>
    </ConvexProvider>
  )
}