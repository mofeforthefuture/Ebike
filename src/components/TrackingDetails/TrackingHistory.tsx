import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { scaleWidth, scaleHeight, scaleFont } from '../../utils';
import { COLORS } from '../../themes';
import { TrackingHistoryItem as TrackingHistoryItemType } from './types';
import { TrackingHistoryItem } from './TrackingHistoryItem';

interface TrackingHistoryProps {
  items: TrackingHistoryItemType[];
}

export const TrackingHistory: React.FC<TrackingHistoryProps> = ({ items }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isActive = item.iconColor === COLORS.primary;
          return (
            <TrackingHistoryItem
              key={item.id}
              item={item}
              isLast={isLast}
              isActive={isActive}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scaleWidth(20),
    paddingTop: scaleHeight(24),
  },
  title: {
    fontSize: scaleFont(16),
    fontWeight: '600',
    color: '#2E3E5C',
    letterSpacing: 0.5,
    marginBottom: scaleHeight(16),
  },
  list: {
    flex: 1,
  },
});
