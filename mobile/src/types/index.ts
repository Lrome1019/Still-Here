export interface User {
  id: string;
  name: string;
  type: 'primary' | 'caregiver';
  phone: string;
  email: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  priority: number;
}

export interface Event {
  id: string;
  timestamp: string;
  type: 'fall' | 'seizure' | 'inactivity' | 'bathroom_timeout';
  duration: number;
  location: string;
  status: 'detected' | 'checking_in' | 'user_ok' | 'escalated' | 'resolved';
  userResponse?: 'acknowledged' | 'no_response';
  escalatedAt?: string;
  resolvedAt?: string;
  notes?: string;
}

export interface MedicationInfo {
  currentMedications: string[];
  rescueMedications: string[];
  allergies: string[];
  medicalHistory: string[];
}

export interface Settings {
  escalationTimeLimit: number;
  bathroomTimeLimit: number;
  emergencyContacts: EmergencyContact[];
  deviceId?: string;
}

export interface CheckInStatus {
  isActive: boolean;
  eventId?: string;
  eventType?: Event['type'];
  startTime?: string;
  timeRemaining?: number;
}

export interface Alert {
  id: string;
  eventId: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  read: boolean;
}
