import { View, ScrollView, StyleSheet } from 'react-native';
import Header from '../components/Header';
import PinnedChallenge from '../components/PinnedChallenge';
import Feed from '../components/Feed';

export default function HomeScreen({ user, navigation }) {
  return (
    <View style={styles.container}>
      <Header title="Home" profilePhoto={user?.profile_photo_url} />
      <ScrollView>
        <PinnedChallenge user={user} navigation={navigation} />
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