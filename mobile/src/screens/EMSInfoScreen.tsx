import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { mockMedicationInfo, mockUser, mockEvents } from '../services/mockData';
import { MedicationInfo, Event } from '../types';

export default function EMSInfoScreen() {
  const [medicationInfo, setMedicationInfo] = useState<MedicationInfo | null>(null);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEMSInfo();
  }, []);

  const loadEMSInfo = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setMedicationInfo(mockMedicationInfo);
      const recentEvent = mockEvents[0];
      setCurrentEvent(recentEvent);
    } catch (error) {
      console.error('Failed to load EMS info:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (minutes > 0) {
      return `${minutes} min ${secs} sec`;
    }
    return `${secs} sec`;
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.warningBanner}>
        <Ionicons name="medical" size={24} color="#fff" />
        <Text style={styles.warningText}>For Emergency Responders</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Patient Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{mockUser.name}</Text>
        </View>
      </View>

      {currentEvent && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Event</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Type:</Text>
            <Text style={[styles.value, styles.eventType]}>
              {currentEvent.type.replace('_', ' ').toUpperCase()}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Duration:</Text>
            <Text style={styles.value}>{formatDuration(currentEvent.duration)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Location:</Text>
            <Text style={styles.value}>{currentEvent.location}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Time:</Text>
            <Text style={styles.value}>
              {new Date(currentEvent.timestamp).toLocaleString()}
            </Text>
          </View>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current Medications</Text>
        {medicationInfo?.currentMedications.map((med, index) => (
          <View key={index} style={styles.listItem}>
            <Ionicons name="medical-outline" size={16} color="#4CAF50" />
            <Text style={styles.listText}>{med}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rescue Medications</Text>
        {medicationInfo?.rescueMedications.map((med, index) => (
          <View key={index} style={styles.listItem}>
            <Ionicons name="warning-outline" size={16} color="#ff9800" />
            <Text style={[styles.listText, styles.rescueMed]}>{med}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Allergies</Text>
        {medicationInfo?.allergies.map((allergy, index) => (
          <View key={index} style={styles.listItem}>
            <Ionicons name="alert-circle-outline" size={16} color="#f44336" />
            <Text style={[styles.listText, styles.allergy]}>{allergy}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Medical History</Text>
        {medicationInfo?.medicalHistory.map((item, index) => (
          <View key={index} style={styles.listItem}>
            <Ionicons name="document-text-outline" size={16} color="#666" />
            <Text style={styles.listText}>{item}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.callButton}>
        <Ionicons name="call" size={24} color="#fff" />
        <Text style={styles.callButtonText}>CALL 911</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingBottom: 32,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  warningBanner: {
    backgroundColor: '#f44336',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    width: 100,
  },
  value: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  eventType: {
    fontWeight: 'bold',
    color: '#f44336',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 4,
  },
  listText: {
    fontSize: 15,
    color: '#333',
    marginLeft: 8,
    flex: 1,
  },
  rescueMed: {
    fontWeight: '600',
  },
  allergy: {
    fontWeight: '600',
    color: '#f44336',
  },
  callButton: {
    backgroundColor: '#f44336',
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
  callButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
