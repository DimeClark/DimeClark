/**
 * Feed Screen - Main content feed
 * Displays Spills, Sips, and Brews from the community
 */
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';

// Mock data for demonstration
const MOCK_POSTS = [
  {
    id: 1,
    type: 'spill',
    author: 'Anonymous',
    rating: 4,
    content: 'Met someone amazing on Hinge! They were respectful, asked about pronouns first thing, and the conversation flowed naturally. Green flags all around! 🟢',
    tags: ['respectful', 'green-flag', 'hinge'],
    likes: 42,
    timestamp: '2h ago',
  },
  {
    id: 2,
    type: 'brew',
    author: 'Anonymous',
    content: 'Red flag alert: Someone kept asking about my "real" name after I told them my pronouns. Trust your gut, folks. 🚩',
    tags: ['red-flag', 'transphobia'],
    likes: 89,
    timestamp: '4h ago',
  },
  {
    id: 3,
    type: 'sip',
    author: 'Anonymous',
    rating: 2,
    content: 'I dated this person too! Can confirm the love bombing was real. Ran when things got serious.',
    tags: ['red-flag', 'warning'],
    likes: 23,
    timestamp: '6h ago',
  },
];

export default function FeedScreen() {
  const [activeTab, setActiveTab] = useState('all');

  const renderRating = (rating: number) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'spill': return '#FF10F0';
      case 'sip': return '#B695F8';
      case 'brew': return '#FFB800';
      default: return '#FFFFFF';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'spill': return '☕';
      case 'sip': return '🍵';
      case 'brew': return '🫖';
      default: return '•';
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with Create Post button */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Spill</Text>
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>+ New Spill</Text>
        </TouchableOpacity>
      </View>

      {/* Filter tabs */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterTab, activeTab === 'all' && styles.activeFilterTab]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.filterText, activeTab === 'all' && styles.activeFilterText]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterTab, activeTab === 'spills' && styles.activeFilterTab]}
          onPress={() => setActiveTab('spills')}
        >
          <Text style={[styles.filterText, activeTab === 'spills' && styles.activeFilterText]}>
            ☕ Spills
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterTab, activeTab === 'sips' && styles.activeFilterTab]}
          onPress={() => setActiveTab('sips')}
        >
          <Text style={[styles.filterText, activeTab === 'sips' && styles.activeFilterText]}>
            🍵 Sips
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterTab, activeTab === 'brews' && styles.activeFilterTab]}
          onPress={() => setActiveTab('brews')}
        >
          <Text style={[styles.filterText, activeTab === 'brews' && styles.activeFilterText]}>
            🫖 Brews
          </Text>
        </TouchableOpacity>
      </View>

      {/* Feed */}
      <ScrollView style={styles.feed}>
        {MOCK_POSTS.map((post) => (
          <View key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.postTypeContainer}>
                <Text style={styles.postTypeIcon}>{getTypeIcon(post.type)}</Text>
                <Text style={[styles.postType, { color: getTypeColor(post.type) }]}>
                  {post.type.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.timestamp}>{post.timestamp}</Text>
            </View>

            <Text style={styles.author}>{post.author}</Text>
            
            {post.rating && (
              <Text style={styles.rating}>{renderRating(post.rating)}</Text>
            )}

            <Text style={styles.content}>{post.content}</Text>

            <View style={styles.tags}>
              {post.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>#{tag}</Text>
                </View>
              ))}
            </View>

            <View style={styles.postFooter}>
              <TouchableOpacity style={styles.likeButton}>
                <Text style={styles.likeText}>❤️ {post.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.commentText}>💬 Reply</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.shareText}>🔗 Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF10F0',
  },
  createButton: {
    backgroundColor: '#FF10F0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#1A1A1A',
  },
  activeFilterTab: {
    backgroundColor: '#FF10F0',
  },
  filterText: {
    color: '#666',
    fontWeight: '600',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  feed: {
    flex: 1,
  },
  postCard: {
    backgroundColor: '#1A1A1A',
    margin: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  postTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postTypeIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  postType: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  timestamp: {
    color: '#666',
    fontSize: 12,
  },
  author: {
    color: '#B695F8',
    fontWeight: '600',
    marginBottom: 4,
  },
  rating: {
    fontSize: 16,
    marginBottom: 8,
  },
  content: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 12,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: {
    color: '#B695F8',
    fontSize: 12,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  commentText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  shareText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});
