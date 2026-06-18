import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Logo from '../assets/logo.svg';

export default function Header({ title, showNotifications = true, showAdd = false, onAdd, onProfile, onNotifications, profilePhoto }) {
  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={onProfile} style={styles.profileButton}>
        {profilePhoto ? (
          <Image source={{ uri: profilePhoto }} style={styles.profileImage} />
        ) : (
          <View style={styles.profilePlaceholder}>
            <Ionicons name="person" size={18} color="#E85D2F" />
          </View>
        )}
      </TouchableOpacity>

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
  profileButton: {
    width: 40,
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#E85D2F',
  },
  profilePlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#E85D2F',
    justifyContent: 'center',
    alignItems: 'center',
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
});