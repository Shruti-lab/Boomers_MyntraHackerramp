// screens/DesignerProfileFormScreen.js
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const ProfileFormScreen = ({ navigation, route }) => {
  const { profileData, setProfileData } = route.params;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    bio: Yup.string().required('Bio is required'),
  });

  return (
    <View style={styles.container}>
      <Formik
        initialValues={profileData}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setProfileData(values);
          navigation.goBack();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <Text>Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

            <Text>Email</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <Text>Phone</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
            />
            {touched.phone && errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

            <Text>Bio</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('bio')}
              onBlur={handleBlur('bio')}
              value={values.bio}
            />
            {touched.bio && errors.bio && <Text style={styles.error}>{errors.bio}</Text>}

            <Button onPress={handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: 'red',
  },
});

export default ProfileFormScreen;
