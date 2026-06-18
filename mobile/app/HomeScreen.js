import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';

export default function HomeScreen({ user }) {

   console.log('User:', user);

  return (
    <View style={styles.container}>
      <Header title="Home" profilePhoto={user?.profile_photo_url} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});