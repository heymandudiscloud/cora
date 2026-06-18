import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import Toggle from '../components/Toggle';


export default function CreateChallengeScreen({ navigation }) {
  const [challengeName, setChallengeName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [durationType, setDurationType] = useState('days');
  const [category, setCategory] = useState('fitness');
  const [isPublic, setIsPublic] = useState(true);
  const [isCommunity, setIsCommunity] = useState(false);
  const [error, setError] = useState('');
  const isFormValid = challengeName.trim() && description.trim() && duration.trim();

  const handleCreateChallenge = async () => {
    try {
      if (!challengeName || !description || !duration) {
        setError('Please fill in all required fields');
        return;
      }

      let durationDays;
      if (durationType === 'days') durationDays = parseInt(duration);
      if (durationType === 'weeks') durationDays = parseInt(duration) * 7;
      if (durationType === 'months') durationDays = parseInt(duration) * 30;

      const token = await AsyncStorage.getItem('token');
      if (!token) return;

      const response = await fetch('http://localhost:3000/challenge-templates', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: challengeName,
          description,
          duration_days: durationDays,
          category,
          is_public: isPublic,
          is_community: isCommunity,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Challenge creation failed');
        return;
      }

      navigation.goBack();

    } catch (error) {
      console.error('Failed to create challenge: ', error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <View style={styles.wrapper}>
      <Header
        title="Create Challenge"
        showBack={true}
        onBack={() => navigation.goBack()}
        showProfile={false}
        showNotifications={false}
      />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Text style={styles.label}>Challenge Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Wil's 75 Hard 2026"
          value={challengeName}
          onChangeText={setChallengeName}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="What is this challenge about?"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Duration</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 75"
          value={duration}
          onChangeText={setDuration}
          keyboardType="numeric"
        />

        <View style={styles.durationRow}>
          {['days', 'weeks', 'months'].map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.durationButton, durationType === type && styles.durationButtonActive]}
              onPress={() => setDurationType(type)}
            >
              <Text style={[styles.durationButtonText, durationType === type && styles.durationButtonTextActive]}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Category</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={category}
            onValueChange={(value) => setCategory(value)}
            style={styles.picker}
          >
            <Picker.Item label="Fitness" value="fitness" />
            <Picker.Item label="Nutrition" value="nutrition" />
            <Picker.Item label="Mental Health" value="mental_health" />
            <Picker.Item label="Creativity" value="creativity" />
            <Picker.Item label="Reading" value="reading" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>

        <View style={styles.divider} />

        <View style={styles.toggleRow}>
          <View style={styles.toggleInfo}>
            <Text style={styles.toggleLabel}>Public</Text>
            <Text style={styles.toggleDescription}>
              {isPublic
                ? 'Anyone can see this challenge and your progress'
                : 'Only you can see this challenge'}
            </Text>
          </View>
          <Toggle value={isPublic} onValueChange={setIsPublic} />
        </View>

        <View style={styles.toggleRow}>
          <View style={styles.toggleInfo}>
            <Text style={styles.toggleLabel}>Publish to Community</Text>
            <Text style={styles.toggleDescription}>
              {isCommunity
                ? 'Others can start this challenge — combine with Public to make it fully discoverable'
                : 'Keep this as a personal template only you can start'}
            </Text>
          </View>
          <Toggle value={isCommunity} onValueChange={setIsCommunity} />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity 
            style={[styles.button, !isFormValid && styles.buttonDisabled]} 
            onPress={handleCreateChallenge}
            disabled={!isFormValid}
        >
            <Text style={styles.buttonText}>Create Challenge</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 12,
    backgroundColor: '#fff0f0',
    padding: 10,
    borderRadius: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: '#333',
    backgroundColor: '#fafafa',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  durationRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  durationButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginHorizontal: 3,
    backgroundColor: '#fafafa',
  },
  durationButtonActive: {
    borderColor: '#E85D2F',
    backgroundColor: '#fff5f0',
  },
  durationButtonText: {
    color: '#999',
    fontSize: 14,
  },
  durationButtonTextActive: {
    color: '#E85D2F',
    fontWeight: '600',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fafafa',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  divider: {
    height: 0.5,
    backgroundColor: '#eee',
    marginVertical: 8,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  toggleInfo: {
    flex: 1,
    marginRight: 16,
  },
  toggleLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  toggleDescription: {
    fontSize: 12,
    color: '#999',
    lineHeight: 16,
  },
  button: {
    backgroundColor: '#E85D2F',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  footer: {
  padding: 16,
  borderTopWidth: 0.5,
  borderTopColor: '#eee',
  backgroundColor: '#fff',
},
buttonDisabled: {
  backgroundColor: '#ccc',
},
});