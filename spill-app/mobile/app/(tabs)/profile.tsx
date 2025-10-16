/**
 * Profile Screen
 * User profile with settings, Safe Date Tips hub, and LGBTQ+ badge
 */
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>👤</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>🏳️‍🌈</Text>
          </View>
        </View>
        
        <Text style={styles.name}>Anonymous User</Text>
        <Text style={styles.pronouns}>they/them</Text>
        
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Spills</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>34</Text>
            <Text style={styles.statLabel}>Sips</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Brews</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Gender Identity:</Text>
          <Text style={styles.infoValue}>Non-binary</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Orientation:</Text>
          <Text style={styles.infoValue}>Queer</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Location:</Text>
          <Text style={styles.infoValue}>Brooklyn, NY</Text>
        </View>
      </View>

      {/* Safe Date Tips Hub */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Safe Date Tips Hub 🛡️</Text>
        
        <TouchableOpacity style={styles.resourceCard}>
          <Text style={styles.resourceIcon}>📚</Text>
          <View style={styles.resourceContent}>
            <Text style={styles.resourceTitle}>Dating Safety Guide</Text>
            <Text style={styles.resourceDescription}>
              Essential tips for safe dating in the LGBTQ+ community
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resourceCard}>
          <Text style={styles.resourceIcon}>📞</Text>
          <View style={styles.resourceContent}>
            <Text style={styles.resourceTitle}>Crisis Hotlines</Text>
            <Text style={styles.resourceDescription}>
              24/7 LGBTQ+ support and crisis resources
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resourceCard}>
          <Text style={styles.resourceIcon}>🚨</Text>
          <View style={styles.resourceContent}>
            <Text style={styles.resourceTitle}>Report Harassment</Text>
            <Text style={styles.resourceDescription}>
              How to report and stay safe from harassment
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resourceCard}>
          <Text style={styles.resourceIcon}>💬</Text>
          <View style={styles.resourceContent}>
            <Text style={styles.resourceTitle}>Red Flag Recognition</Text>
            <Text style={styles.resourceDescription}>
              Learn to identify manipulation and toxic behavior
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>🔔 Notifications</Text>
          <Text style={styles.settingArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>🔒 Privacy & Safety</Text>
          <Text style={styles.settingArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>🎨 Appearance</Text>
          <Text style={styles.settingArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>✅ Verification</Text>
          <Text style={styles.settingArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>🛡️ Community Guidelines</Text>
          <Text style={styles.settingArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>ℹ️ About</Text>
          <Text style={styles.settingArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Logout */}
      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={() => router.push('/')}
      >
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Made with 💜 for the community</Text>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    fontSize: 80,
  },
  badge: {
    position: 'absolute',
    bottom: 0,
    right: -5,
    backgroundColor: '#FF10F0',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  pronouns: {
    fontSize: 16,
    color: '#B695F8',
    marginBottom: 20,
  },
  stats: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF10F0',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  editButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FF10F0',
    paddingHorizontal: 32,
    paddingVertical: 10,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#FF10F0',
    fontWeight: 'bold',
    fontSize: 16,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#B695F8',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  resourceCard: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  resourceIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  resourceContent: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  resourceDescription: {
    fontSize: 14,
    color: '#666',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  settingText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  settingArrow: {
    fontSize: 24,
    color: '#666',
  },
  logoutButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FF10F0',
    margin: 16,
    paddingVertical: 14,
    borderRadius: 12,
  },
  logoutText: {
    color: '#FF10F0',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    padding: 20,
  },
  footerText: {
    color: '#666',
    fontSize: 14,
    marginBottom: 4,
  },
  version: {
    color: '#666',
    fontSize: 12,
  },
});
