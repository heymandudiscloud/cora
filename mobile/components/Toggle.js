import { View, TouchableOpacity, StyleSheet } from 'react-native';

const Toggle = ({ value, onValueChange }) => (
  <TouchableOpacity
    onPress={() => onValueChange(!value)}
    style={[styles.toggle, value && styles.toggleActive]}
  >
    <View style={[styles.toggleThumb, value && styles.toggleThumbActive]} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ddd',
    padding: 2,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: '#E85D2F',
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
});

export default Toggle;