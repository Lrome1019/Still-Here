import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import CheckInScreen from '../screens/CheckInScreen';
import CaregiverHomeScreen from '../screens/CaregiverHomeScreen';
import EMSInfoScreen from '../screens/EMSInfoScreen';
import EventLogScreen from '../screens/EventLogScreen';
import SettingsScreen from '../screens/SettingsScreen';

export type RootTabParamList = {
  CheckIn: undefined;
  CaregiverHome: undefined;
  EMSInfo: undefined;
  EventLog: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'home';

            if (route.name === 'CheckIn') {
              iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline';
            } else if (route.name === 'CaregiverHome') {
              iconName = focused ? 'notifications' : 'notifications-outline';
            } else if (route.name === 'EMSInfo') {
              iconName = focused ? 'medical' : 'medical-outline';
            } else if (route.name === 'EventLog') {
              iconName = focused ? 'list' : 'list-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#4CAF50',
          tabBarInactiveTintColor: 'gray',
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      >
        <Tab.Screen
          name="CheckIn"
          component={CheckInScreen}
          options={{ title: 'Check In' }}
        />
        <Tab.Screen
          name="CaregiverHome"
          component={CaregiverHomeScreen}
          options={{ title: 'Alerts' }}
        />
        <Tab.Screen
          name="EMSInfo"
          component={EMSInfoScreen}
          options={{ title: 'EMS Info' }}
        />
        <Tab.Screen
          name="EventLog"
          component={EventLogScreen}
          options={{ title: 'Event Log' }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: 'Settings' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
