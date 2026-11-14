import {
  User,
  Event,
  MedicationInfo,
  Settings,
  CheckInStatus,
  Alert,
  EmergencyContact,
} from '../types';

export const mockUser: User = {
  id: 'user-001',
  name: 'Alex Johnson',
  type: 'primary',
  phone: '+1-555-0123',
  email: 'alex.johnson@example.com',
};

export const mockCaregiver: User = {
  id: 'user-002',
  name: 'Jamie Thompson',
  type: 'caregiver',
  phone: '+1-555-0124',
  email: 'jamie.thompson@example.com',
};

export const mockEmergencyContacts: EmergencyContact[] = [
  {
    id: 'contact-001',
    name: 'Jamie Thompson',
    relationship: 'Spouse',
    phone: '+1-555-0124',
    email: 'jamie.thompson@example.com',
    priority: 1,
  },
  {
    id: 'contact-002',
    name: 'Dr. Sarah Chen',
    relationship: 'Neurologist',
    phone: '+1-555-0125',
    email: 'dr.chen@medicalcenter.com',
    priority: 2,
  },
  {
    id: 'contact-003',
    name: 'Morgan Lee',
    relationship: 'Friend',
    phone: '+1-555-0126',
    priority: 3,
  },
];

export const mockMedicationInfo: MedicationInfo = {
  currentMedications: [
    'Levetiracetam 500mg (2x daily)',
    'Lamotrigine 100mg (1x daily)',
  ],
  rescueMedications: ['Diazepam 5mg (emergency use only)'],
  allergies: ['Penicillin', 'Sulfa drugs'],
  medicalHistory: [
    'Epilepsy diagnosed 2018',
    'Tonic-clonic seizures',
    'Last hospitalization: March 2025',
  ],
};

export const mockEvents: Event[] = [
  {
    id: 'event-001',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    type: 'fall',
    duration: 15,
    location: 'Living Room',
    status: 'user_ok',
    userResponse: 'acknowledged',
    resolvedAt: new Date(Date.now() - 2 * 60 * 60 * 1000 + 60000).toISOString(),
    notes: 'User responded within 1 minute',
  },
  {
    id: 'event-002',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    type: 'seizure',
    duration: 180,
    location: 'Bedroom',
    status: 'escalated',
    userResponse: 'no_response',
    escalatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000 + 300000).toISOString(),
    resolvedAt: new Date(Date.now() - 24 * 60 * 60 * 1000 + 600000).toISOString(),
    notes: 'Emergency contacts notified, user recovered',
  },
  {
    id: 'event-003',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    type: 'bathroom_timeout',
    duration: 1200,
    location: 'Bathroom',
    status: 'user_ok',
    userResponse: 'acknowledged',
    resolvedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 60000).toISOString(),
    notes: 'User responded via Alexa',
  },
  {
    id: 'event-004',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    type: 'inactivity',
    duration: 300,
    location: 'Kitchen',
    status: 'user_ok',
    userResponse: 'acknowledged',
    resolvedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 120000).toISOString(),
  },
];

export const mockSettings: Settings = {
  escalationTimeLimit: 300,
  bathroomTimeLimit: 1200,
  emergencyContacts: mockEmergencyContacts,
  deviceId: 'ring-device-abc123',
};

export const mockCheckInStatus: CheckInStatus = {
  isActive: false,
};

export const mockActiveCheckIn: CheckInStatus = {
  isActive: true,
  eventId: 'event-active',
  eventType: 'fall',
  startTime: new Date(Date.now() - 60000).toISOString(),
  timeRemaining: 240,
};

export const mockAlerts: Alert[] = [
  {
    id: 'alert-001',
    eventId: 'event-002',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    severity: 'high',
    message: 'Possible seizure detected. User did not respond to check-in.',
    read: true,
  },
  {
    id: 'alert-002',
    eventId: 'event-001',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    severity: 'medium',
    message: 'Fall detected in Living Room. User confirmed they are okay.',
    read: false,
  },
];
