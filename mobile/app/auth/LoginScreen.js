import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../../assets/logo.svg';

export default function LoginScreen({ navigation, onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const { token, user } = await response.json();

            if (!response.ok) {
                setError('Incorrect email or password.');
                return;
            }

            await AsyncStorage.setItem('token', token);
            onLogin();
            console.log('Login successful!', user);
        } catch (error) {
            setError('Something went wrong. Please try again.');
            console.error('Login error: ', error);
        }
    };

    return (
        <View style={styles.container}>
            <Logo width={80} height={80} style={styles.logo} />
            <Text style={styles.title}>Cora</Text>
            <Text style={styles.subtitle}>Challenge. Prove. Fuel.</Text>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                onSubmitEditing={handleLogin}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.link}>Don't have an account? Sign up</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#fff',
    },
    logo: {
        marginBottom: 12,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#E85D2F',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#999',
        marginBottom: 32,
    },
    error: {
        color: 'red',
        marginBottom: 12,
        fontSize: 14,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
    },
    button: {
        width: '100%',
        backgroundColor: '#E85D2F',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    link: {
        color: '#E85D2F',
        fontSize: 14,
    }
});