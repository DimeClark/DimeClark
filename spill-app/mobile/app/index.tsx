/**
 * Onboarding/Welcome screen
 * First screen users see when opening the app
 */
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>☕ Spill</Text>
        <Text style={styles.tagline}>
          Spill the Tea on Dating
        </Text>
        <Text style={styles.subtitle}>
          A safe, inclusive space for LGBTQ+ folks to share authentic dating experiences
        </Text>

        <View style={styles.features}>
          <Text style={styles.feature}>✨ Post anonymous reviews</Text>
          <Text style={styles.feature}>🔍 Search before you date</Text>
          <Text style={styles.feature}>🤖 AI Vibe Check messages</Text>
          <Text style={styles.feature}>🏳️‍🌈 Built for the community</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push('/auth/signup')}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push('/auth/login')}
        >
          <Text style={styles.secondaryButtonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    justifyContent: 'space-between',
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#FF10F0',
    marginBottom: 10,
  },
  tagline: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#B695F8',
    marginBottom: 15,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
    opacity: 0.8,
  },
  features: {
    width: '100%',
    paddingHorizontal: 20,
  },
  feature: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 12,
    opacity: 0.9,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#FF10F0',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#B695F8',
  },
  secondaryButtonText: {
    color: '#B695F8',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
