import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../../assets/logo.svg';

export default function RegisterScreen({ navigation, onRegister }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState(''); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handRegister = async () => {
        try {
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    first_name: firstName, 
                    last_name: lastName, 
                    username, 
                    email, 
                    password 
                }),
            });

            const { token, user } = await response.json();

            if (!response.ok) {
                setError('Registration failed');
                return;
            }

            await AsyncStorage.setItem('token', token);
            onRegister();
            console.log('Registration successful!', user);
        } catch (error) {
            setError('Something went wrong. Please try again.');
            console.error('Registration error: ', error);
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
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />

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
                onSubmitEditing={handRegister}
            />

            <TouchableOpacity style={styles.button} onPress={handRegister}>
            <Text style={styles.buttonText}>Register</Text>
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