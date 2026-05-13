import { Dimensions, Platform } from "react-native";
import Constants from "expo-constants";
import * as Sentry from "@sentry/react-native";

const getUserId = (user) => user?._id ?? user?.id ?? user?.uid ?? user?.email;

export const setSentryUserContext = (user, source = "auth") => {
  if (!user) {
    Sentry.setUser(null);
    Sentry.setTag("auth.state", "signed_out");
    return;
  }

  Sentry.setUser({
    id: String(getUserId(user)),
    email: user.email,
    username: user.name,
  });

  Sentry.setTags({
    "auth.state": "signed_in",
    "auth.source": source,
    "diet.goal": user.goal ?? "not_set",
    "diet.has_preferences": String(Boolean(user.goal || user.calories || user.proteins)),
  });

  Sentry.setContext("diet_profile", {
    calories: user.calories,
    proteins: user.proteins,
    goal: user.goal,
  });
};

export const setSentryDeviceContext = () => {
  const window = Dimensions.get("window");

  Sentry.setContext("device_runtime", {
    platform: Platform.OS,
    platformVersion: Platform.Version,
    appVersion: Constants.expoConfig?.version,
    appOwnership: Constants.appOwnership,
    executionEnvironment: Constants.executionEnvironment,
    screenWidth: window.width,
    screenHeight: window.height,
  });

  Sentry.setTags({
    "app.platform": Platform.OS,
    "app.environment": __DEV__ ? "development" : "production",
  });
};
