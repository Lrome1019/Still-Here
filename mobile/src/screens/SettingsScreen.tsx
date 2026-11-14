import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { mockSettings } from '../services/mockData';
import { Settings, EmergencyContact } from '../types';

export default function SettingsScreen() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingEscalation, setEditingEscalation] = useState(false);
  const [editingBathroom, setEditingBathroom] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSettings(mockSettings);
    } catch (error) {
      console.error('Failed to load settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    try {
      setSaving(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      Alert.alert('Success', 'Settings saved successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minutes`;
  };

  const updateEscalationTime = (minutes: string) => {
    const mins = parseInt(minutes, 10);
    if (!isNaN(mins) && mins > 0) {
      setSettings((prev) =>
        prev ? { ...prev, escalationTimeLimit: mins * 60 } : null
      );
    }
  };

  const updateBathroomTime = (minutes: string) => {
    const mins = parseInt(minutes, 10);
    if (!isNaN(mins) && mins > 0) {
      setSettings((prev) =>
        prev ? { ...prev, bathroomTimeLimit: mins * 60 } : null
      );
    }
  };

  const renderContact = (contact: EmergencyContact) => (
    <View key={contact.id} style={styles.contactCard}>
      <View style={styles.contactHeader}>
        <View style={styles.priorityBadge}>
          <Text style={styles.priorityText}>{contact.priority}</Text>
        </View>
        <View style={styles.contactInfo}>
          <Text style={styles.contactName}>{contact.name}</Text>
          <Text style={styles.contactRelationship}>{contact.relationship}</Text>
        </View>
      </View>
      <View style={styles.contactDetails}>
        <View style={styles.contactDetailRow}>
          <Ionicons name="call-outline" size={16} color="#666" />
          <Text style={styles.contactDetailText}>{contact.phone}</Text>
        </View>
        {contact.email && (
          <View style={styles.contactDetailRow}>
            <Ionicons name="mail-outline" size={16} color="#666" />
            <Text style={styles.contactDetailText}>{contact.email}</Text>
          </View>
        )}
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (!settings) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Failed to load settings</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Escalation Settings</Text>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Time before emergency contacts</Text>
            <Text style={styles.settingDescription}>
              How long to wait for your response before alerting contacts
            </Text>
          </View>
          {editingEscalation ? (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                defaultValue={(settings.escalationTimeLimit / 60).toString()}
                onChangeText={updateEscalationTime}
                onBlur={() => setEditingEscalation(false)}
                autoFocus
              />
              <Text style={styles.inputUnit}>min</Text>
            </View>
          ) : (
            <TouchableOpacity onPress={() => setEditingEscalation(true)}>
              <Text style={styles.settingValue}>
                {formatTime(settings.escalationTimeLimit)}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bathroom Safety Timer</Text>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Check-in window</Text>
            <Text style={styles.settingDescription}>
              We'll check in if bathroom sensor shows no exit after this time
            </Text>
          </View>
          {editingBathroom ? (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                defaultValue={(settings.bathroomTimeLimit / 60).toString()}
                onChangeText={updateBathroomTime}
                onBlur={() => setEditingBathroom(false)}
                autoFocus
              />
              <Text style={styles.inputUnit}>min</Text>
            </View>
          ) : (
            <TouchableOpacity onPress={() => setEditingBathroom(true)}>
              <Text style={styles.settingValue}>
                {formatTime(settings.bathroomTimeLimit)}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Emergency Contacts</Text>
          <TouchableOpacity
            onPress={() => Alert.alert('Add Contact', 'Contact form coming soon')}
          >
            <Ionicons name="add-circle" size={28} color="#4CAF50" />
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionDescription}>
          Contacts are notified in priority order
        </Text>
        {settings.emergencyContacts.map(renderContact)}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Device</Text>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Ring Device ID</Text>
            <Text style={styles.settingDescription}>
              {settings.deviceId || 'Not connected'}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => Alert.alert('Connect Device', 'Device pairing coming soon')}
          >
            <Ionicons name="link-outline" size={24} color="#4CAF50" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.saveButton, saving && styles.saveButtonDisabled]}
        onPress={saveSettings}
        disabled={saving}
      >
        {saving ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Ionicons name="save-outline" size={20} color="#fff" />
            <Text style={styles.saveButtonText}>Save Settings</Text>
          </>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    paddingBottom: 32,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#f44336',
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  settingValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 4,
    padding: 8,
    width: 60,
    textAlign: 'center',
    fontSize: 16,
  },
  inputUnit: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  contactCard: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  priorityBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  priorityText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  contactRelationship: {
    fontSize: 14,
    color: '#666',
  },
  contactDetails: {
    marginLeft: 44,
  },
  contactDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  contactDetailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
