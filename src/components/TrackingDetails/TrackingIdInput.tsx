import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { scaleWidth, scaleHeight, scaleFont } from '../../utils';
import { COLORS } from '../../themes';

interface TrackingIdInputProps {
  value: string;
}

export const TrackingIdInput: React.FC<TrackingIdInputProps> = ({ value }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        editable={false}
        placeholderTextColor="#031420"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    marginHorizontal: scaleWidth(24),
    marginTop: 40,
    borderRadius: scaleWidth(46),
    zIndex: 996,
  },
  input: {
    borderRadius: scaleWidth(50),
    paddingHorizontal: scaleWidth(20),
    paddingVertical: scaleHeight(12),
    fontSize: scaleFont(14),
    fontWeight: '500',
    color: '#000000',
    width: '100%',
    textAlign: 'center',
    height: scaleHeight(56),
    borderWidth: 0.5,
    borderColor: '#051F32',
  },
});
