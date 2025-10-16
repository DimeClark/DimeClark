/**
 * Main tabs layout
 * Navigation for Feed, Search, Vibe Check, and Profile
 */
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0A0A0A',
        },
        headerTintColor: '#FF10F0',
        tabBarStyle: {
          backgroundColor: '#0A0A0A',
          borderTopColor: '#2A2A2A',
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: '#FF10F0',
        tabBarInactiveTintColor: '#666',
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          tabBarIcon: () => '🏠',
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: () => '🔍',
        }}
      />
      <Tabs.Screen
        name="vibe-check"
        options={{
          title: 'Vibe Check',
          tabBarIcon: () => '🤖',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: () => '👤',
        }}
      />
    </Tabs>
  );
}
