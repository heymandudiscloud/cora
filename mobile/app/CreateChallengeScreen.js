import { View, Text } from 'react-native';
import Header from '../components/Header';


export default function CreateChallengeScreen( { navigation }) {
  return (
    <View>
        <Header title="Create Challenge" showBack={true} onBack={() => navigation.goBack()}showProfile={false} showNotifications={false} />
    </View>
  );
}