import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Logo from '../assets/logo.svg';

export default function pinnedChallenge({ user }) {
    const [challenge, setChallenge] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPinnedChallenge = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    const response = await fetch('http://localhost:3000/users/me/challenges?status=active', {
                        headers: { 'Authorization': `Bearer ${token}` },
                    });
                    const data = await response.json();
                    const pinned = data.challenges?.find(c => c.is_pinned);
                    setChallenge(pinned || null);
                }
            } catch (error) {
                console.error('Failed to fetch pinned challenge:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPinnedChallenge();
    }, []);

    if (loading) return null;

    if (!challenge) {
        return (
            <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No active challenge</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Challenges')}>
                <Text style={styles.emptyLink}>Start one →</Text>
            </TouchableOpacity>
            </View>
        );
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>{challenge.custom_name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  
});