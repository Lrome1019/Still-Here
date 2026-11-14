import {
  User,
  Event,
  MedicationInfo,
  Settings,
  CheckInStatus,
  Alert,
  EmergencyContact,
} from '../types';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

export class ApiClient {
  private baseUrl: string;
  private authToken?: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  setAuthToken(token: string) {
    this.authToken = token;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(this.authToken && { Authorization: `Bearer ${this.authToken}` }),
      ...options?.headers,
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getCurrentUser(): Promise<User> {
    return this.request<User>('/user/me');
  }

  async acknowledgeCheckIn(eventId: string): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`/events/${eventId}/acknowledge`, {
      method: 'POST',
    });
  }

  async getCheckInStatus(): Promise<CheckInStatus> {
    return this.request<CheckInStatus>('/checkin/status');
  }

  async getEvents(limit: number = 50): Promise<Event[]> {
    return this.request<Event[]>(`/events?limit=${limit}`);
  }

  async getEvent(eventId: string): Promise<Event> {
    return this.request<Event>(`/events/${eventId}`);
  }

  async getMedicationInfo(userId: string): Promise<MedicationInfo> {
    return this.request<MedicationInfo>(`/user/${userId}/medication-info`);
  }

  async updateMedicationInfo(
    userId: string,
    info: MedicationInfo
  ): Promise<MedicationInfo> {
    return this.request<MedicationInfo>(`/user/${userId}/medication-info`, {
      method: 'PUT',
      body: JSON.stringify(info),
    });
  }

  async getSettings(userId: string): Promise<Settings> {
    return this.request<Settings>(`/user/${userId}/settings`);
  }

  async updateSettings(userId: string, settings: Settings): Promise<Settings> {
    return this.request<Settings>(`/user/${userId}/settings`, {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  }

  async getAlerts(userId: string): Promise<Alert[]> {
    return this.request<Alert[]>(`/user/${userId}/alerts`);
  }

  async markAlertRead(alertId: string): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`/alerts/${alertId}/read`, {
      method: 'POST',
    });
  }

  async notifyEmergencyContacts(
    eventId: string,
    contacts: EmergencyContact[]
  ): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`/events/${eventId}/notify`, {
      method: 'POST',
      body: JSON.stringify({ contacts }),
    });
  }

  async requestEMSCall(eventId: string): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`/events/${eventId}/call-ems`, {
      method: 'POST',
    });
  }
}

export const apiClient = new ApiClient();
