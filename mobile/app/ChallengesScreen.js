import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';

export default function ChallengesScreen({ user, navigation }) {
  const [activeTab, setActiveTab] = useState('my');
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const response = await fetch('http://localhost:3000/users/me/challenges?status=active', {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          const data = await response.json();
          setChallenges(data.challenges || []);
        }
      } catch (error) {
        console.error('Failed to fetch challenges: ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchChallenges();
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title="Challenges"
        showAdd={activeTab === 'my'}
        onAdd={() => {}}
      />

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'my' && styles.activeTab]}
          onPress={() => setActiveTab('my')}
        >
          <Text style={[styles.tabText, activeTab === 'my' && styles.activeTabText]}>My Challenges</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'community' && styles.activeTab]}
          onPress={() => setActiveTab('community')}
        >
          <Text style={[styles.tabText, activeTab === 'community' && styles.activeTabText]}>Community</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {activeTab === 'my' ? (
          loading ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Loading...</Text>
            </View>
          ) : challenges.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>No active challenges</Text>
              <Text style={styles.emptySubtitle}>Start a challenge to track your progress</Text>
              <TouchableOpacity onPress={() => setActiveTab('community')}>
                {Platform.OS === 'web' ? (
                    <View style={[styles.startButton, { background: 'linear-gradient(135deg, #ffb64a, #e85d1a)' }]}>
                    <Text style={styles.startButtonText}>Browse Challenges</Text>
                    </View>
                ) : (
                    <LinearGradient
                    colors={['#ffb64a', '#e85d1a']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.startButton}
                    >
                    <Text style={styles.startButtonText}>Browse Challenges</Text>
                    </LinearGradient>
                )}
                </TouchableOpacity>
            </View>
          ) : (
            <Text>Challenges list coming soon</Text>
          )
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Community Challenges</Text>
            <Text style={styles.emptySubtitle}>Coming soon</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#E85D2F',
  },
  tabText: {
    fontSize: 14,
    color: '#999',
  },
  activeTabText: {
    color: '#E85D2F',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 24,
  },
  startButton: {
    backgroundColor: '#E85D2F',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  startButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});