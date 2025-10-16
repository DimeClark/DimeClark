/**
 * Search Screen
 * Search for profiles, reviews, and filter by various criteria
 */
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    pronouns: '',
    zodiac: '',
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name, username, or keywords..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Quick Filters */}
      <View style={styles.filterSection}>
        <Text style={styles.sectionTitle}>Filter By</Text>
        
        <View style={styles.filterRow}>
          <TextInput
            style={styles.filterInput}
            placeholder="Location"
            placeholderTextColor="#666"
            value={filters.location}
            onChangeText={(text) => setFilters({ ...filters, location: text })}
          />
        </View>

        <View style={styles.filterRow}>
          <TextInput
            style={styles.filterInput}
            placeholder="Pronouns"
            placeholderTextColor="#666"
            value={filters.pronouns}
            onChangeText={(text) => setFilters({ ...filters, pronouns: text })}
          />
        </View>

        <View style={styles.filterRow}>
          <TextInput
            style={styles.filterInput}
            placeholder="Zodiac Sign"
            placeholderTextColor="#666"
            value={filters.zodiac}
            onChangeText={(text) => setFilters({ ...filters, zodiac: text })}
          />
        </View>

        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Popular Tags */}
      <View style={styles.tagsSection}>
        <Text style={styles.sectionTitle}>Popular Tags</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagsScroll}>
          {['red-flag', 'green-flag', 'respectful', 'ghosting', 'love-bombing', 'transphobia', 'supportive'].map((tag, index) => (
            <TouchableOpacity key={index} style={styles.popularTag}>
              <Text style={styles.popularTagText}>#{tag}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Recent Searches */}
      <View style={styles.recentSection}>
        <Text style={styles.sectionTitle}>Recent Searches</Text>
        <View style={styles.recentItem}>
          <Text style={styles.recentIcon}>🕐</Text>
          <Text style={styles.recentText}>New York, they/them</Text>
        </View>
        <View style={styles.recentItem}>
          <Text style={styles.recentIcon}>🕐</Text>
          <Text style={styles.recentText}>love-bombing</Text>
        </View>
      </View>

      {/* Safe Search Notice */}
      <View style={styles.notice}>
        <Text style={styles.noticeIcon}>🔒</Text>
        <Text style={styles.noticeText}>
          All searches are private and anonymous. We protect your privacy.
        </Text>
      </View>
    </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    margin: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    paddingVertical: 16,
    fontSize: 16,
  },
  filterSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B695F8',
    marginBottom: 12,
  },
  filterRow: {
    marginBottom: 12,
  },
  filterInput: {
    backgroundColor: '#1A1A1A',
    color: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  searchButton: {
    backgroundColor: '#FF10F0',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tagsSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  tagsScroll: {
    flexDirection: 'row',
  },
  popularTag: {
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  popularTagText: {
    color: '#B695F8',
    fontWeight: '600',
  },
  recentSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  recentIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  recentText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  notice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  noticeIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  noticeText: {
    flex: 1,
    color: '#B695F8',
    fontSize: 14,
  },
});
