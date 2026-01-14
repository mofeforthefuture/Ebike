import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { scaleWidth, scaleHeight, scaleFont } from '../../utils';

interface EstimatedTimeProps {
  time: string;
  onOptionsPress?: () => void;
}

export const EstimatedTime: React.FC<EstimatedTimeProps> = ({
  time,
  onOptionsPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.textContainer}>
          <Text style={styles.label}>Estimate arrives in</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
        <TouchableOpacity onPress={onOptionsPress}>
          <View style={styles.circlesContainer}>
            <View style={styles.circle} />
            <View style={styles.circle} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scaleWidth(20),
    paddingBottom: scaleHeight(16),
    height: scaleHeight(51),
    marginVertical: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: scaleFont(14),
    fontWeight: '400',
    color: '#7A809D',
    marginBottom: scaleHeight(4),
    lineHeight: scaleHeight(24),
    letterSpacing: 0.5,
  },
  time: {
    fontSize: scaleFont(24),
    fontWeight: '600',
    color: '#2E3E5C',
    lineHeight: scaleHeight(24),
    letterSpacing: 0.5,
  },
  circlesContainer: {
    flexDirection: 'row',
    gap: 7,
    alignItems: 'center',
  },
  circle: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#200E32',
  },
});
