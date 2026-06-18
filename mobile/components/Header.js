import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform } from 'react-native';
import Logo from '../assets/logo.svg';

export default function Header({ title, showNotifications = true, showAdd = false, showProfile = true, showBack = false, onAdd, onProfile, onNotifications, onBack, profilePhoto }) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {showBack ? (
          <TouchableOpacity onPress={onBack}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
        ) : showProfile && (
          <TouchableOpacity onPress={onProfile}>
            {profilePhoto ? (
              Platform.OS === 'web' ? (
                  <View style={{ padding: 2, borderRadius: 20, background: 'linear-gradient(135deg, #ffb64a, #e85d1a)', display: 'flex' }}>
                      <Image source={{ uri: profilePhoto }} style={styles.profileImage} />
                  </View>
              ) : (
                  <LinearGradient
                  colors={['#ffb64a', '#e85d1a']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.gradientBorder}
                  >
                      <Image source={{ uri: profilePhoto }} style={styles.profileImage} />
                  </LinearGradient>
              )
              ) : (
              Platform.OS === 'web' ? (
                  <View style={{ width: 36, height: 36, borderRadius: 18, background: 'linear-gradient(135deg, #ffb64a, #e85d1a)', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                      <Ionicons name="person" size={18} color="#fff" />
                  </View>
              ) : (
                  <LinearGradient
                  colors={['#ffb64a', '#e85d1a']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.gradientBorder}
                  >
                      <Ionicons name="person" size={18} color="#fff" />
                  </LinearGradient>
              )
          )}
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.center}>
        <View style={styles.logoContainer}>
            <Logo width={28} height={28} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.right}>
        {showAdd && (
          <TouchableOpacity onPress={onAdd} style={styles.icon}>
            <Ionicons name="add" size={26} color="#333" />
          </TouchableOpacity>
        )}
        {showNotifications && (
          <TouchableOpacity onPress={onNotifications} style={styles.icon}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
          </TouchableOpacity>
        )}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#E85D2F',
  },
  center: {
    flexDirection: 'row',
    alignItems: 'center',
    },
    title: {
        fontSize: 17,
        fontWeight: '600',
        color: '#333',
        marginLeft: 8,
    },
  right: {
    width: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  icon: {
    marginLeft: 8,
  },
  logoContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    overflow: 'hidden',
},
left: {
  width: 40,
  justifyContent: 'center',
},
});