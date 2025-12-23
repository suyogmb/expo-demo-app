 //build the app for ios and android
 eas env:pull  //pull the environment variables from the expo EAS
 eas build -p ios --profile development //build the app for ios
 eas build -p android --profile development //build the app for android

 //upload the app to app store and play store
 eas submit -p ios --profile production //upload the app to app store
 eas submit -p android --profile production //upload the app to play store

 //publish the app to app store and play store
 eas publish -p ios --profile production //publish the app to app store
 eas publish -p android --profile production //publish the app to play store

 //Development build for iOS Simulator
 eas build --platform ios --profile ios-simulator

 //Development build for Android
 eas build --platform android --profile development

 //Production build for iOS
 eas build --platform ios --profile production

 //Production build for Android
 eas build --platform android --profile production

 