/**
 * Vibe Check Screen - AI-powered message analysis
 * Analyzes tone, respectfulness, and emotional safety of messages
 */
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';

export default function VibeCheckScreen() {
  const [message, setMessage] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const analyzeVibe = async () => {
    setLoading(true);
    
    // Simulated AI analysis - In production, this would call the backend API
    setTimeout(() => {
      const mockAnalysis = {
        score: 85,
        level: 'good',
        color: '#00FF88',
        indicators: [
          { type: 'positive', text: 'Respectful language detected', icon: '✅' },
          { type: 'positive', text: 'Shows genuine interest', icon: '✅' },
          { type: 'neutral', text: 'Appropriate conversation pace', icon: '⚪' },
        ],
        recommendations: [
          'Continue with caution and trust your instincts',
          'Look for consistency in their communication',
        ],
      };
      setAnalysis(mockAnalysis);
      setLoading(false);
    }, 1500);
  };

  const getVibeEmoji = (level: string) => {
    switch (level) {
      case 'good': return '🟢';
      case 'mixed': return '🟡';
      case 'caution': return '🔴';
      default: return '⚪';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Vibe Check</Text>
        <Text style={styles.subtitle}>AI-powered message analysis 🤖</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoIcon}>💡</Text>
        <Text style={styles.infoText}>
          Paste a message exchange to analyze tone, respectfulness, and potential red flags.
          All checks are private and anonymous.
        </Text>
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.label}>Message to Analyze</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Paste the message or conversation here..."
          placeholderTextColor="#666"
          multiline
          numberOfLines={8}
          value={message}
          onChangeText={setMessage}
        />

        <TouchableOpacity
          style={[styles.analyzeButton, !message && styles.disabledButton]}
          onPress={analyzeVibe}
          disabled={!message || loading}
        >
          <Text style={styles.analyzeButtonText}>
            {loading ? 'Analyzing...' : 'Check Vibe'}
          </Text>
        </TouchableOpacity>
      </View>

      {analysis && (
        <View style={styles.resultsSection}>
          <View style={styles.scoreCard}>
            <Text style={styles.scoreLabel}>Vibe Score</Text>
            <View style={styles.scoreDisplay}>
              <Text style={[styles.scoreNumber, { color: analysis.color }]}>
                {analysis.score}
              </Text>
              <Text style={styles.scoreMax}>/100</Text>
            </View>
            <Text style={styles.scoreEmoji}>{getVibeEmoji(analysis.level)}</Text>
            <Text style={[styles.scoreLevel, { color: analysis.color }]}>
              {analysis.level.toUpperCase()} VIBES
            </Text>
          </View>

          <View style={styles.indicatorsSection}>
            <Text style={styles.sectionTitle}>Indicators</Text>
            {analysis.indicators.map((indicator: any, index: number) => (
              <View key={index} style={styles.indicator}>
                <Text style={styles.indicatorIcon}>{indicator.icon}</Text>
                <Text style={styles.indicatorText}>{indicator.text}</Text>
              </View>
            ))}
          </View>

          <View style={styles.recommendationsSection}>
            <Text style={styles.sectionTitle}>Recommendations</Text>
            {analysis.recommendations.map((rec: string, index: number) => (
              <View key={index} style={styles.recommendation}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.recommendationText}>{rec}</Text>
              </View>
            ))}
          </View>

          <View style={styles.disclaimer}>
            <Text style={styles.disclaimerIcon}>⚠️</Text>
            <Text style={styles.disclaimerText}>
              This is an AI-powered analysis and should not replace your personal judgment.
              Always trust your instincts and prioritize your safety.
            </Text>
          </View>
        </View>
      )}

      <View style={styles.tipsSection}>
        <Text style={styles.tipsTitle}>What We Look For:</Text>
        <View style={styles.tipItem}>
          <Text style={styles.tipIcon}>🔍</Text>
          <Text style={styles.tipText}>Manipulation tactics and gaslighting patterns</Text>
        </View>
        <View style={styles.tipItem}>
          <Text style={styles.tipIcon}>🔍</Text>
          <Text style={styles.tipText}>Respectful communication and boundaries</Text>
        </View>
        <View style={styles.tipItem}>
          <Text style={styles.tipIcon}>🔍</Text>
          <Text style={styles.tipText}>Emotional safety and genuine interest</Text>
        </View>
        <View style={styles.tipItem}>
          <Text style={styles.tipIcon">🔍</Text>
          <Text style={styles.tipText}>Aggression, pressure, or red flag language</Text>
        </View>
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF10F0',
  },
  subtitle: {
    fontSize: 16,
    color: '#B695F8',
    marginTop: 4,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  infoIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
  },
  inputSection: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#B695F8',
    marginBottom: 8,
  },
  textArea: {
    backgroundColor: '#1A1A1A',
    color: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    minHeight: 150,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    marginBottom: 16,
  },
  analyzeButton: {
    backgroundColor: '#FF10F0',
    paddingVertical: 16,
    borderRadius: 12,
  },
  disabledButton: {
    backgroundColor: '#666',
  },
  analyzeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultsSection: {
    padding: 16,
  },
  scoreCard: {
    backgroundColor: '#1A1A1A',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  scoreLabel: {
    color: '#666',
    fontSize: 14,
    marginBottom: 8,
  },
  scoreDisplay: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  scoreMax: {
    fontSize: 24,
    color: '#666',
    marginBottom: 6,
  },
  scoreEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  scoreLevel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  indicatorsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B695F8',
    marginBottom: 12,
  },
  indicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  indicatorIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  indicatorText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  recommendationsSection: {
    marginBottom: 20,
  },
  recommendation: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bullet: {
    color: '#FF10F0',
    fontSize: 18,
    marginRight: 8,
  },
  recommendationText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
  },
  disclaimer: {
    flexDirection: 'row',
    backgroundColor: '#2A1A1A',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF10F0',
  },
  disclaimerIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  disclaimerText: {
    flex: 1,
    color: '#FF10F0',
    fontSize: 12,
    lineHeight: 18,
  },
  tipsSection: {
    padding: 16,
    backgroundColor: '#1A1A1A',
    margin: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#B695F8',
    marginBottom: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  tipText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});
