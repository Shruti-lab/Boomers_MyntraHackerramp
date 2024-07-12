import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const ProfileFormScreen = ({ navigation }) => {
  const [db, setDb] = useState(null);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [qualification, setQualification] = useState('');
  const [experience, setExperience] = useState('');
  const [expertise, setExpertise] = useState('');

  useEffect(() => {
    const initializeDb = async () => {
      try {  
        const dbConnection = await SQLite.openDatabase({
          name: 'profile.db',
          location: 'E:\React_Project\Boomers_MyntraHackerramp\myntra-pro\DataBase\profile.sqbpro',
        });
        console.log('Database opened');
        
        try {
          setDb(dbConnection);
          console.log('setup')
        }
        catch{
          console.log('setup error')
        }
        createTable(dbConnection);
      } catch (error) {
        console.error('Error  database', error);
      }
    };

    initializeDb();
  }, []);

  const createTable = (db) => {
    db.transaction(txn => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS profiles (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, dob TEXT, qualification TEXT, experience TEXT, expertise TEXT)`,
        [],
        () => { console.log('Table created successfully'); },
        error => { console.log('Error creating table ' + error.message); }
      );
    });
  };

  const saveProfile = () => {
    if (name && dob && qualification && experience && expertise && db) {
      db.transaction(txn => {
        txn.executeSql(
          `INSERT INTO profiles (name, dob, qualification, experience, expertise) VALUES (?, ?, ?, ?, ?)`,
          [name, dob, qualification, experience, expertise],
          (_, resultSet) => {
            console.log('Insert success: ', resultSet);
            Alert.alert('Success', 'Profile saved successfully');
            navigation.navigate('DesignerPage');
          },
          (_, error) => {
            console.log('Error saving profile: ', error);
            Alert.alert('Error', 'Failed to save profile');
          }
        );
      });
    } else {
      Alert.alert('Error', 'Please fill all fields');
    }
  };

  return (
    <View style={styles.container}>
      {/* Your UI components */}
    </View>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    width: 120,
    marginBottom: 20,
    marginTop: 7,
  },
  myntraTextContainer: {
    alignItems: 'center',
    width: '80%',
  },
  logo: {
    width: 35,
    height: 30,
    resizeMode: 'contain',
  },
  myntraImage: {
    paddingTop: 10,
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  myntraText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginStart: 4,
    top: 0,
  },
  myntraInsider: {
    marginTop: 30,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#ff5868',
    borderRadius: 4,
    marginBottom: 20,
    height: 45,
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
  },
  headingContainer: {
    alignItems: 'center',
    width: '100%',
  },
  heading: {
    fontSize: 30,
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: '#ff4468',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  inputContainer: {
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#838383',
    paddingTop: 15,
    padding: 10,
    width: '100%',
    backgroundColor: 'white',
  },
  textInput: {
    fontSize: 15,
    borderWidth: 2,
    borderColor: '#d3d3d3',
    padding: 5,
    marginTop: 10,
    borderRadius: 8,
    marginBottom: 20,
    width: '95%',
    height: 50,
    backgroundColor: 'white',
  },
  container: {
    padding: 20,
    backgroundColor: '#fff4f2',
    height: '100%',
  },
});

export default ProfileFormScreen;
