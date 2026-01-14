import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight, scaleFont } from '../../utils';
import { COLORS } from '../../themes';
import { SummaryItem } from './types';

interface SummaryCardProps {
  items: SummaryItem[];
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ items }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View key={index}>
          <View style={styles.row}>
            <View style={styles.item}>
              <Text style={styles.value} numberOfLines={1}>
                {item.value || ''}
              </Text>
              {item.subtext ? (
                <Text style={styles.subtext} numberOfLines={1}>
                  {item.subtext}
                </Text>
              ) : (
                <Text style={styles.label} numberOfLines={1}>
                  {item.label || ''}
                </Text>
              )}
            </View>
          </View>
          {index < items.length - 1 && <View style={styles.divider} />}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    marginHorizontal: scaleWidth(20),
    marginTop: scaleHeight(16),
    borderRadius: scaleWidth(16),
    padding: scaleWidth(20),
    minHeight: scaleHeight(100),
  },
  row: {
    paddingVertical: scaleHeight(12),
    minHeight: scaleHeight(40),
  },
  item: {
    flex: 1,
  },
  value: {
    fontSize: scaleFont(16),
    fontWeight: '600',
    color: '#2E3E5C',
    marginBottom: scaleHeight(8),
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  label: {
    fontSize: scaleFont(12),
    fontWeight: '400',
    color: '#96823D',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  subtext: {
    fontSize: scaleFont(12),
    fontWeight: '400',
    color: '#96823D',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#EDC127',
    marginVertical: scaleHeight(8),
    width: scaleWidth(279),
    alignSelf: 'center',
  },
});
