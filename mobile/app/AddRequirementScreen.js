import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, StyleSheet } from 'react-native';
import Header from '../components/Header';

export default function AddRequirementScreen({ navigation, route }) {
  const [requirementName, setRequirementName] = useState('');
  const [showRepeatModal, setShowRepeatModal] = useState(false);
  const [repeatType, setRepeatType] = useState('everyday');
  const [frequencyCount, setFrequencyCount] = useState(1);
  const [frequencyPeriod, setFrequencyPeriod] = useState('week');
  const [specificDays, setSpecificDays] = useState([]);
  const [specificDates, setSpecificDates] = useState([]);
  const [selectedProofTypes, setSelectedProofTypes] = useState([]);
  const [error, setError] = useState('');

  const isFormValid = requirementName.trim() && selectedProofTypes.length > 0;

  const repeatOptions = [
    { label: 'Every day', value: 'everyday' },
    { label: 'X times per period', value: 'quota' },
    { label: 'Specific weekdays', value: 'weekdays' },
    { label: 'Specific dates', value: 'dates' },
  ];

  const proofTypes = [
    { label: 'Photo', value: 'photo' },
    { label: 'Video', value: 'video' },
    { label: 'Journal', value: 'journal' },
    { label: 'Honour System', value: 'honour_system' },
  ];

  const toggleProofType = (value) => {
    setSelectedProofTypes(prev =>
      prev.includes(value)
        ? prev.filter(t => t !== value)
        : [...prev, value]
    );
  };

  const getRepeatLabel = () => {
    if (repeatType === 'everyday') return 'Every day';
    if (repeatType === 'quota') return `${frequencyCount} times per ${frequencyPeriod}`;
    if (repeatType === 'weekdays') return specificDays.length > 0 ? specificDays.join(', ') : 'Select days';
    if (repeatType === 'dates') return specificDates.length > 0 ? specificDates.map(d => `${d}th`).join(', ') : 'Select dates';
  };

  const handleSave = () => {
    if (!isFormValid) {
      setError('Please add a name and at least one proof type');
      return;
    }
    const requirement = {
      title: requirementName,
      repeat_type: repeatType,
      frequency_count: frequencyCount,
      frequency_period: frequencyPeriod,
      specific_days: specificDays,
      specific_dates: specificDates,
      proof_types: selectedProofTypes,
    };
    navigation.navigate('CreateChallenge', { newRequirement: requirement });
  };

  return (
    <View style={styles.wrapper}>
      <Header
        title="Add Requirement"
        showBack={true}
        onBack={() => navigation.goBack()}
        showProfile={false}
        showNotifications={false}
      />

      <ScrollView style={styles.container} contentContainerStyle={styles.content}>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Text style={styles.label}>Requirement Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Morning workout"
          value={requirementName}
          onChangeText={setRequirementName}
        />

        <Text style={styles.label}>Repeat</Text>
        <TouchableOpacity
          style={styles.fieldButton}
          onPress={() => setShowRepeatModal(true)}
        >
          <Text style={styles.fieldButtonText}>{getRepeatLabel()}</Text>
          <Text style={styles.fieldButtonArrow}>›</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Proof type</Text>
        {proofTypes.map((type) => (
          <TouchableOpacity
            key={type.value}
            style={styles.checkboxRow}
            onPress={() => toggleProofType(type.value)}
          >
            <View style={[styles.checkbox, selectedProofTypes.includes(type.value) && styles.checkboxActive]}>
              {selectedProofTypes.includes(type.value) && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </View>
            <Text style={styles.checkboxLabel}>{type.label}</Text>
          </TouchableOpacity>
        ))}

      </ScrollView>

      {/* Repeat Modal */}
      <Modal
        visible={showRepeatModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowRepeatModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>

            <View style={styles.modalHandle} />

            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Repeat</Text>
              <TouchableOpacity onPress={() => setShowRepeatModal(false)}>
                <Text style={styles.modalClose}>×</Text>
              </TouchableOpacity>
            </View>

            {repeatOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.optionRow}
                onPress={() => setRepeatType(option.value)}
              >
                <View style={styles.radio}>
                  {repeatType === option.value && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.optionLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}

            {repeatType === 'quota' && (
              <View style={styles.subOption}>
                <TouchableOpacity onPress={() => setFrequencyCount(Math.max(1, frequencyCount - 1))}>
                  <Text style={styles.counterBtn}>−</Text>
                </TouchableOpacity>
                <Text style={styles.counterVal}>{frequencyCount}</Text>
                <TouchableOpacity onPress={() => setFrequencyCount(frequencyCount + 1)}>
                  <Text style={styles.counterBtn}>+</Text>
                </TouchableOpacity>
                <Text style={styles.counterLabel}>times per</Text>
                <TouchableOpacity
                  style={styles.periodToggle}
                  onPress={() => setFrequencyPeriod(frequencyPeriod === 'week' ? 'month' : 'week')}
                >
                  <Text style={styles.periodToggleText}>{frequencyPeriod} ▼</Text>
                </TouchableOpacity>
              </View>
            )}

            {repeatType === 'weekdays' && (
              <View style={styles.dayPills}>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <TouchableOpacity
                    key={day}
                    style={[styles.dayPill, specificDays.includes(day) && styles.dayPillActive]}
                    onPress={() =>
                      setSpecificDays(prev =>
                        prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
                      )
                    }
                  >
                    <Text style={[styles.dayPillText, specificDays.includes(day) && styles.dayPillTextActive]}>
                      {day}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <TouchableOpacity
              style={styles.saveBtn}
              onPress={() => setShowRepeatModal(false)}
            >
              <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, !isFormValid && styles.buttonDisabled]}
          onPress={handleSave}
          disabled={!isFormValid}
        >
          <Text style={styles.buttonText}>Add Requirement</Text>
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
  fieldButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fafafa',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fieldButtonText: {
    fontSize: 15,
    color: '#333',
  },
  fieldButtonArrow: {
    fontSize: 18,
    color: '#999',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: '#E85D2F',
    borderColor: '#E85D2F',
  },
  checkmark: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  checkboxLabel: {
    fontSize: 15,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingBottom: 32,
  },
  modalHandle: {
    width: 36,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    margin: 12,
    alignSelf: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  modalClose: {
    fontSize: 22,
    color: '#999',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#E85D2F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#E85D2F',
  },
  optionLabel: {
    fontSize: 14,
    color: '#333',
  },
  subOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    paddingLeft: 46,
  },
  counterBtn: {
    fontSize: 22,
    color: '#E85D2F',
    fontWeight: '600',
    paddingHorizontal: 8,
  },
  counterVal: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    minWidth: 24,
    textAlign: 'center',
  },
  counterLabel: {
    fontSize: 14,
    color: '#999',
  },
  periodToggle: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  periodToggleText: {
    fontSize: 14,
    color: '#333',
  },
  dayPills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    padding: 16,
    paddingLeft: 46,
  },
  dayPill: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayPillActive: {
    backgroundColor: '#fff5f0',
    borderColor: '#E85D2F',
  },
  dayPillText: {
    fontSize: 12,
    color: '#999',
  },
  dayPillTextActive: {
    color: '#E85D2F',
    fontWeight: '600',
  },
  saveBtn: {
    margin: 16,
    padding: 14,
    backgroundColor: '#E85D2F',
    borderRadius: 8,
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  footer: {
    padding: 16,
    borderTopWidth: 0.5,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#E85D2F',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});