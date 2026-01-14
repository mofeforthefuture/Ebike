import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { scaleWidth, scaleHeight, scaleFont } from '../../utils';
import { Back } from '../../assets';

interface HeaderProps {
  title: string;
  onBackPress: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onBackPress }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <Image source={Back} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.headerSpacer} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleWidth(24),
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: scaleWidth(24),
    height: scaleHeight(24),
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: scaleFont(18),
    fontWeight: '600',
    color: '#092C4C',
  },
  headerSpacer: {
    width: 40,
  },
});
