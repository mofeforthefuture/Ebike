import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { scaleWidth, scaleHeight, scaleFont } from '../../utils';
import { COLORS } from '../../themes';
import { TrackingHistoryItem as TrackingHistoryItemType } from './types';
import { getIconByType } from './constants';

interface TrackingHistoryItemProps {
  item: TrackingHistoryItemType;
  isLast: boolean;
  isActive: boolean;
}

export const TrackingHistoryItem: React.FC<TrackingHistoryItemProps> = ({
  item,
  isLast,
  isActive,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.iconContainer}>
          {!isLast && (
            <View
              style={[
                styles.timelineConnector,
                isActive && styles.timelineConnectorActive,
              ]}
            />
          )}
          <View
            style={[styles.iconWrapper, { backgroundColor: item.iconColor }]}
          >
            <Image
              source={getIconByType(item.type)}
              style={styles.icon}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.status}>{item.status}</Text>
          <Text style={styles.location}>{item.location}</Text>
        </View>
      </View>
      <Text style={styles.time}>{item.time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scaleHeight(20),
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    position: 'relative',
    marginRight: scaleWidth(12),
  },
  timelineConnector: {
    position: 'absolute',
    top: scaleHeight(56),
    left: scaleWidth(27),
    width: 2,
    height: scaleHeight(48),
    backgroundColor: '#E5E7EB',
    zIndex: 0,
  },
  timelineConnectorActive: {
    backgroundColor: COLORS.primary,
  },
  iconWrapper: {
    width: scaleWidth(56),
    height: scaleHeight(56),
    borderRadius: scaleWidth(28),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  icon: {
    width: scaleWidth(24),
    height: scaleWidth(24),
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
  },
  status: {
    fontSize: scaleFont(14),
    fontWeight: '600',
    color: '#1E3354',
    marginBottom: scaleHeight(8),
  },
  location: {
    fontSize: scaleFont(14),
    fontWeight: '400',
    color: '#6B7280',
    lineHeight: scaleHeight(24),
  },
  time: {
    fontSize: scaleFont(12),
    fontWeight: '400',
    color: '#7A809D',
    lineHeight: scaleHeight(24),
  },
});
