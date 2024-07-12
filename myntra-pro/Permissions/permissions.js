import { PermissionsAndroid } from 'react-native';

const requestStoragePermission = async () => {
    try {
        const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ]);
        if (
            granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
            granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
        ) {
            console.log('Storage permissions granted');
            // Now you can proceed with SQLite operations
        } else {
            console.log('Storage permissions denied');
        }
    } catch (err) {
        console.warn(err);
    }
};

// Call requestStoragePermission when needed
