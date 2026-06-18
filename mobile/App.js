import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


import HomeScreen from './app/HomeScreen';
import ChallengesScreen from './app/ChallengesScreen';
import GroupsScreen from './app/GroupsScreen';
import ProfileScreen from './app/ProfileScreen';
import LoginScreen from './app/auth/LoginScreen';
import RegisterScreen from './app/auth/RegisterScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs({ user }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#E85D2F',
        tabBarInactiveTintColor: '#999',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Challenges') iconName = focused ? 'trophy' : 'trophy-outline';
          else if (route.name === 'Groups') iconName = focused ? 'people' : 'people-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home">
        {props => <HomeScreen {...props} user={user} />}
      </Tab.Screen>
      <Tab.Screen name="Challenges">
        {props => <ChallengesScreen {...props} user={user} />}
      </Tab.Screen>
      <Tab.Screen name="Groups">
        {props => <GroupsScreen {...props} user={user} />}
      </Tab.Screen>
      <Tab.Screen name="Profile">
        {props => <ProfileScreen {...props} user={user} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const response = await fetch('http://localhost:3000/users/me', {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          const data = await response.json();
          setUser(data.user);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Session check failed:', error);
      } finally {
        setLoading(false);
      }
    };
    checkToken();
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="Main">
            {props => <MainTabs {...props} user={user} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Login">
              {props => <LoginScreen {...props} onLogin={() => setIsLoggedIn(true)} />}
            </Stack.Screen>
            <Stack.Screen name="Register">
              {props => <RegisterScreen {...props} onRegister={() => setIsLoggedIn(true)} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}