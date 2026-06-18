import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform } from 'react-native';
import Logo from '../assets/logo.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function PinnedChallenge({ user, navigation }) {
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
            <View style={styles.card}>
                <Text style={styles.emptyText}>No active challenge</Text>
                {Platform.OS === 'web' ? (
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Challenges')}
                        style={[styles.button, { background: 'linear-gradient(160deg, #ffb64a, #e85d1a)' }]}
                    >
                        <Text style={styles.buttonText}>Start One</Text>
                    </TouchableOpacity>
                    ) : (
                    <TouchableOpacity onPress={() => navigation.navigate('Challenges')}>
                        <LinearGradient
                        colors={['#ffb64a', '#e85d1a']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.button}
                        >
                            <Text style={styles.buttonText}>Start One</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                )}
            </View>
        );
    }
    
    return (
        <View style={styles.card}>
            <Text style={styles.sectionTitle}>{challenge.custom_name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        padding: 16,
        paddingBottom: 8,
    },
    emptyText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        padding: 16,
        paddingBottom: 10,
    },
    emptyLink: {
        fontSize: 12,
        fontWeight: '600',
        color: 'white',
        backgroundColor: '#ffb64a',
        borderRadius: 8,
        padding: 4,
        paddingLeft: 45,
        paddingRight: 45,
    },
    card: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        borderRadius: 16,
        padding: 16,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
    },
        buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
});