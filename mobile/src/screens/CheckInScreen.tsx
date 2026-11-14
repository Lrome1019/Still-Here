import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { mockCheckInStatus, mockActiveCheckIn } from '../services/mockData';
import { CheckInStatus } from '../types';

export default function CheckInScreen() {
  const [checkInStatus, setCheckInStatus] = useState<CheckInStatus>(mockCheckInStatus);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCheckInStatus();
  }, []);

  const loadCheckInStatus = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCheckInStatus(mockCheckInStatus);
    } catch (error) {
      console.error('Failed to load check-in status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      Alert.alert(
        'Check-In Successful',
        "We've let your caregivers know you're okay!",
        [{ text: 'OK', onPress: () => setCheckInStatus({ isActive: false }) }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit check-in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatTimeRemaining = (seconds?: number) => {
    if (!seconds) return '';
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading && !checkInStatus.isActive) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {checkInStatus.isActive ? (
        <>
          <Text style={styles.alertText}>Are you okay?</Text>
          <Text style={styles.eventTypeText}>
            {checkInStatus.eventType === 'fall' && 'Possible fall detected'}
            {checkInStatus.eventType === 'seizure' && 'Unusual activity detected'}
            {checkInStatus.eventType === 'inactivity' && 'Haven\'t heard from you'}
            {checkInStatus.eventType === 'bathroom_timeout' && 'Checking on you'}
          </Text>
          {checkInStatus.timeRemaining && (
            <Text style={styles.timerText}>
              Time remaining: {formatTimeRemaining(checkInStatus.timeRemaining)}
            </Text>
          )}
          <TouchableOpacity
            style={[styles.checkInButton, styles.urgentButton]}
            onPress={handleCheckIn}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>I'M OKAY</Text>
            )}
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.statusText}>Everything's good!</Text>
          <Text style={styles.descriptionText}>
            We're monitoring for any unusual activity. If something happens, we'll check in with
            you through this screen and Alexa.
          </Text>
          <TouchableOpacity
            style={styles.checkInButton}
            onPress={handleCheckIn}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>I'M OKAY</Text>
            )}
          </TouchableOpacity>
          <Text style={styles.subtleText}>
            Tap anytime to let your caregivers know you're doing well
          </Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  alertText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f44336',
    marginBottom: 16,
    textAlign: 'center',
  },
  statusText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 16,
    textAlign: 'center',
  },
  eventTypeText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 24,
  },
  timerText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ff9800',
    marginBottom: 32,
  },
  checkInButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 24,
    paddingHorizontal: 48,
    borderRadius: 60,
    minWidth: 200,
    minHeight: 200,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  urgentButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtleText: {
    fontSize: 14,
    color: '#999',
    marginTop: 24,
    textAlign: 'center',
  },
});
