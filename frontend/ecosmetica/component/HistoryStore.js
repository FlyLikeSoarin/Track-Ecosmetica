import Constants from 'expo-constants'; 
//import { NativeModules } from 'react-native';

//for iOS: 
//console.log(NativeModules.SettingsManager.clientUniqueId); 
//for Android: 
//console.log(NativeModules.PlatformConstants.fingerprint); //(or NativeModules.PlatformConstants.serial)

const HistoryStore = {
    clientId: Constants.deviceId,
    data: [],
}

export default HistoryStore