import { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import PinnedChallenge from '../components/PinnedChallenge';
import Feed from '../components/Feed';

export default function HomeScreen({ user }) {
  return (
    <View style={styles.container}>
      <Header title="Home" profilePhoto={user?.profile_photo_url} />
      <ScrollView>
        <PinnedChallenge user={user} />
        <Feed user={user} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});