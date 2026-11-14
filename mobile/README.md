# Still Here Mobile App

The mobile application for **Still Here** - providing check-in capabilities for users and alert monitoring for caregivers.

## Features

- **Check-In Screen**: Large "I'm okay" button for quick user responses during alerts
- **Caregiver Alerts**: Real-time alert feed for caregivers with severity indicators
- **EMS Info Display**: Critical medical information ready for emergency responders
- **Event Log**: Complete history of detected events for medical review
- **Settings**: Configure escalation times, bathroom safety timer, and emergency contacts

## Tech Stack

- **Framework**: Expo (SDK 58)
- **Language**: TypeScript
- **Navigation**: React Navigation (Bottom Tabs)
- **Icons**: Expo Vector Icons (Ionicons)

## Prerequisites

- Node.js 16+ and npm
- Expo CLI (installed automatically)
- iOS Simulator (macOS) or Android Studio (for Android emulator)
- Expo Go app (for physical device testing)

## Getting Started

### Install Dependencies

```bash
cd mobile
npm install
```

### Run the App

**iOS Simulator (macOS only):**
```bash
npm run ios
```

**Android Emulator:**
```bash
npm run android
```

**Web Browser:**
```bash
npm run web
```

**Physical Device (Expo Go):**
```bash
npm start
```
Then scan the QR code with:
- iOS: Camera app
- Android: Expo Go app

## Project Structure

```
mobile/
├── App.tsx                          # Root component
├── src/
│   ├── navigation/
│   │   └── AppNavigator.tsx         # Tab navigation setup
│   ├── screens/
│   │   ├── CheckInScreen.tsx        # User check-in interface
│   │   ├── CaregiverHomeScreen.tsx  # Alert feed for caregivers
│   │   ├── EMSInfoScreen.tsx        # Emergency responder info
│   │   ├── EventLogScreen.tsx       # Historical event list
│   │   └── SettingsScreen.tsx       # App configuration
│   ├── services/
│   │   ├── api.ts                   # Backend API client (stubbed)
│   │   └── mockData.ts              # Mock/synthetic data for development
│   └── types/
│       └── index.ts                 # TypeScript interfaces
├── package.json
└── tsconfig.json
```

## Development Mode

The app currently uses **mock data** for all operations. The API client in `src/services/api.ts` is stubbed and ready to connect to the backend once it's available.

### Mock Data Includes:
- Sample user and caregiver profiles
- Emergency contacts
- Medication information
- Recent events (falls, seizures, inactivity, bathroom timeouts)
- Active and historical alerts

## Type Checking

Run TypeScript type checking:

```bash
npx tsc --noEmit
```

## Connecting to Backend

When the backend is ready:

1. Set the API URL in your environment:
   ```bash
   export EXPO_PUBLIC_API_URL=https://your-backend-url.com/api
   ```

2. Update the API client methods in `src/services/api.ts` to handle authentication tokens

3. Replace mock data imports with actual API calls

## Testing on Team Devices

Share the app with teammates using Expo:

```bash
npm start
```

Share the QR code or use:
```bash
npx expo start --tunnel
```

## Known Issues & TODOs

- [ ] Connect to actual backend API
- [ ] Implement real-time push notifications
- [ ] Add user authentication flow
- [ ] Add contact management (add/edit/delete)
- [ ] Implement device pairing with Ring
- [ ] Add Alexa integration status indicators
- [ ] Add offline support and data caching
- [ ] Add export event log to PDF for doctor visits

## Contributing

See the main repository [CONTRIBUTING.md](../docs/CONTRIBUTING.md) for team guidelines.

## Need Help?

- Post in Discord `#mobile` channel
- Check the [ARCHITECTURE.md](../docs/ARCHITECTURE.md) for system design
- Review React Native docs: https://reactnative.dev/
- Expo documentation: https://docs.expo.dev/
