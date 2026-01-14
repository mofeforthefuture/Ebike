import React from 'react';
import { Image, ImageStyle } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SendScreen from '../screens/SendScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { Home, Bookmark, Send, Setting } from '../assets';

const Tab = createBottomTabNavigator<MainTabParamList>();

interface TabIconProps {
  focused: boolean;
}

const HomeIcon: React.FC<TabIconProps> = ({ focused }) => (
  <Image
    source={Home}
    style={
      {
        width: 24,
        height: 24,
        tintColor: focused ? '#031420' : '#BBBFD0',
      } as ImageStyle
    }
    resizeMode="contain"
  />
);

const ProfileIcon: React.FC<TabIconProps> = ({ focused }) => (
  <Image
    source={Bookmark}
    style={
      {
        width: 24,
        height: 24,
        tintColor: focused ? '#031420' : '#BBBFD0',
      } as ImageStyle
    }
    resizeMode="contain"
  />
);

const SendIcon: React.FC<TabIconProps> = ({ focused }) => (
  <Image
    source={Send}
    style={
      {
        width: 24,
        height: 24,
        tintColor: focused ? '#031420' : '#BBBFD0',
      } as ImageStyle
    }
    resizeMode="contain"
  />
);

const SettingsIcon: React.FC<TabIconProps> = ({ focused }) => (
  <Image
    source={Setting}
    style={
      {
        width: 24,
        height: 24,
        tintColor: focused ? '#031420' : '#BBBFD0',
      } as ImageStyle
    }
    resizeMode="contain"
  />
);

// Icon renderer functions defined outside component
const renderHomeIcon = ({ focused }: { focused: boolean }) => (
  <HomeIcon focused={focused} />
);

const renderProfileIcon = ({ focused }: { focused: boolean }) => (
  <ProfileIcon focused={focused} />
);

const renderSendIcon = ({ focused }: { focused: boolean }) => (
  <SendIcon focused={focused} />
);

const renderSettingsIcon = ({ focused }: { focused: boolean }) => (
  <SettingsIcon focused={focused} />
);

const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#031420',
        tabBarInactiveTintColor: '#BBBFD0',
        headerShown: false,
        tabBarStyle: {
          height: 80,
          backgroundColor: '#F1F6FB',
          paddingTop: 13,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: renderHomeIcon,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: renderProfileIcon,
        }}
      />
      <Tab.Screen
        name="Send"
        component={SendScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: renderSendIcon,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: renderSettingsIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
