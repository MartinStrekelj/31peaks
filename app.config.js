import "dotenv/config";

export default {
  expo: {
    name: "31peaks",
    slug: "31peaks",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      package: "my.app.peaks",
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./assets/images/favicon.png",
    },
    extra: {
      firebase_api_key: process.env.FIREBASE_API_KEY,
      firebase_auth_domain: process.env.FIREBASE_AUTH_DOMAIN,
      firebase_project_id: process.env.FIREBASE_PROJECT_ID,
      firebase_storage_bucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebase_messaging_sender: process.env.FIREBASE_MESSAGING_SENDER,
      firebase_app_id: process.env.FIREBASE_APP_ID,
      facebook_app_id: process.env.FACEBOOK_APP_ID,
    },
  },
};
