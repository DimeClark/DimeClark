/**
 * Vibe Check Routes
 * AI-powered sentiment analysis for message exchanges
 */
const express = require('express');
const Sentiment = require('sentiment');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();
const sentiment = new Sentiment();

// Analyze message vibe
router.post('/analyze', authMiddleware, async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Perform sentiment analysis
    const result = sentiment.analyze(message);

    // Define red flag keywords
    const redFlags = [
      'manipulate', 'gaslight', 'control', 'deserve', 'crazy', 'insane',
      'overreacting', 'sensitive', 'dramatic', 'real name', 'biological',
      'actually', 'just joking', 'cant take a joke', 'too sensitive'
    ];

    // Define green flag keywords
    const greenFlags = [
      'respect', 'consent', 'boundary', 'comfortable', 'pronouns',
      'understand', 'appreciate', 'support', 'care', 'kind'
    ];

    // Check for red and green flags
    const lowerMessage = message.toLowerCase();
    const detectedRedFlags = redFlags.filter(flag => lowerMessage.includes(flag));
    const detectedGreenFlags = greenFlags.filter(flag => lowerMessage.includes(flag));

    // Calculate vibe score (0-100)
    let vibeScore = 50; // Start neutral

    // Adjust based on sentiment
    vibeScore += result.score * 5; // Scale sentiment score

    // Adjust based on flags
    vibeScore -= detectedRedFlags.length * 15;
    vibeScore += detectedGreenFlags.length * 10;

    // Clamp score between 0-100
    vibeScore = Math.max(0, Math.min(100, vibeScore));

    // Determine vibe level
    let level = 'mixed';
    let color = '#FFB800';
    
    if (vibeScore >= 70) {
      level = 'good';
      color = '#00FF88';
    } else if (vibeScore < 40) {
      level = 'caution';
      color = '#FF4444';
    }

    // Generate indicators
    const indicators = [];

    if (detectedGreenFlags.length > 0) {
      indicators.push({
        type: 'positive',
        text: `Respectful language detected: ${detectedGreenFlags.join(', ')}`,
        icon: '✅',
      });
    }

    if (detectedRedFlags.length > 0) {
      indicators.push({
        type: 'negative',
        text: `Potential red flags: ${detectedRedFlags.join(', ')}`,
        icon: '🚩',
      });
    }

    if (result.score > 0) {
      indicators.push({
        type: 'positive',
        text: 'Overall positive tone detected',
        icon: '✅',
      });
    } else if (result.score < 0) {
      indicators.push({
        type: 'negative',
        text: 'Negative or concerning tone detected',
        icon: '⚠️',
      });
    } else {
      indicators.push({
        type: 'neutral',
        text: 'Neutral tone - proceed with awareness',
        icon: '⚪',
      });
    }

    // Generate recommendations
    const recommendations = [];

    if (level === 'good') {
      recommendations.push('This conversation shows positive signs');
      recommendations.push('Continue with normal caution');
    } else if (level === 'mixed') {
      recommendations.push('Mixed signals detected - trust your instincts');
      recommendations.push('Watch for consistency in their behavior');
    } else {
      recommendations.push('Proceed with extra caution');
      recommendations.push('Consider discussing concerns or setting boundaries');
      recommendations.push('Trust your gut feeling about this interaction');
    }

    res.json({
      score: Math.round(vibeScore),
      level,
      color,
      indicators,
      recommendations,
      analysis: {
        sentimentScore: result.score,
        comparative: result.comparative,
        redFlagsDetected: detectedRedFlags.length,
        greenFlagsDetected: detectedGreenFlags.length,
      },
    });
  } catch (error) {
    console.error('Vibe check error:', error);
    res.status(500).json({ error: 'Failed to analyze message' });
  }
});

// Get vibe check history (optional feature)
router.get('/history', authMiddleware, async (req, res) => {
  try {
    // TODO: Implement vibe check history storage
    res.json({ message: 'Vibe check history coming soon' });
  } catch (error) {
    console.error('Vibe check history error:', error);
    res.status(500).json({ error: 'Failed to get history' });
  }
});

module.exports = router;
