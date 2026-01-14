import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { ArrowRight, Wavy, Cyclist, Bell, OrderArrow } from '../assets';
import { scaleWidth, scaleHeight, scaleFont } from '../utils';
import { COLORS } from '../themes';
import Button from '../components/Button';

type Props = NativeStackScreenProps<RootStackParamList, 'Orders'>;

const OrdersScreen: React.FC<Props> = ({ navigation }) => {
  const bellScale = useRef(new Animated.Value(1)).current;
  const [receiptNumber, setReceiptNumber] = useState('');

  const handleBellPressIn = () => {
    Animated.spring(bellScale, {
      toValue: 0.9,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  const handleBellPressOut = () => {
    Animated.spring(bellScale, {
      toValue: 1,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  const handleBellPress = () => {
    // Handle bell press action here
    console.log('Bell pressed');
  };

  const trackingIcons = {
    package: require('../assets/package.png'),
    truck: require('../assets/truck.png'),
  } as const;

  const trackingItems = [
    { id: 'SCP9374826473', status: 'In the process', type: 'package' },
    { id: 'SCP6653728497', status: 'In delivery', type: 'truck' },
  ];

  const getIconByType = (type: string) => {
    switch (type) {
      case 'truck':
        return trackingIcons.truck;
      case 'package':
      default:
        return trackingIcons.package;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topSection}>
          <View style={styles.firstRow}>
            <Image source={Cyclist} style={styles.profileImage} />
            <TouchableOpacity
              onPress={handleBellPress}
              onPressIn={handleBellPressIn}
              onPressOut={handleBellPressOut}
              activeOpacity={1}
            >
              <Animated.View
                style={[
                  styles.bellContainer,
                  {
                    transform: [{ scale: bellScale }],
                  },
                ]}
              >
                <Image source={Bell} style={styles.bellIcon} />
              </Animated.View>
            </TouchableOpacity>
          </View>
          <Text style={styles.greeting}>Hello good Morning!</Text>
        </View>
        {/* Track Your Package Card */}
        <View style={styles.trackingCard}>
          <Image source={Wavy} style={styles.wavyImage} />
          <Text style={styles.trackingTitle}>Track Your Package</Text>
          <Text style={styles.trackingSubtitle}>
            Enter the receipt number that has been given by the officer
          </Text>
          <TextInput
            style={styles.receiptInput}
            placeholder="Enter the receipt number"
            placeholderTextColor="#031420"
            underlineColorAndroid="transparent"
            value={receiptNumber}
            onChangeText={setReceiptNumber}
          />
          <Button
            title="Track Now"
            onPress={() => {
              navigation.navigate('TrackingDetails', {
                receiptNumber: receiptNumber.trim(),
              });
            }}
            rightIcon={
              <Image source={ArrowRight} style={styles.arrowIconWhite} />
            }
            fullWidth={true}
            paddingLeft={34}
            paddingRight={28}
            style={styles.trackButton}
          />
        </View>

        {/* Tracking History */}
        <View style={styles.trackingHistory}>
          <Text style={styles.historyTitle}>Tracking history</Text>

          {trackingItems.map(item => (
            <TouchableOpacity key={item.id} style={styles.trackingItem}>
              <View style={styles.trackingItemLeft}>
                <View style={styles.iconWrapper}>
                  <Image
                    source={getIconByType(item.type)}
                    style={styles.iconImage}
                  />
                </View>
                <View style={styles.trackingItemText}>
                  <Text style={styles.trackingNumber}>{item.id}</Text>
                  <Text style={styles.trackingStatus}>{item.status}</Text>
                </View>
              </View>

              <Image source={OrderArrow} style={styles.trackingArrow} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    backgroundColor: '#FFFFFF',
    paddingTop: 16,
    paddingBottom: scaleHeight(20),
  },
  topSection: {
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
  firstRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    height: 48,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 25,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '700',
    color: '#092C4C',
  },
  bellContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F6FB',
    borderRadius: 12,
  },
  bellIcon: {
    width: 24,
    height: 24,
  },
  trackingCard: {
    backgroundColor: COLORS.primary,
    marginHorizontal: scaleWidth(20),
    marginTop: scaleHeight(24),
    marginBottom: scaleHeight(40),
    borderRadius: 32,
    padding: scaleWidth(24),
    paddingTop: scaleHeight(53),
    width: scaleWidth(375) - scaleWidth(40),
    height: scaleHeight(308),
    position: 'relative',
    overflow: 'hidden',
  },
  wavyImage: {
    position: 'absolute',
    top: -17,
    right: -59,
    width: scaleWidth(221),
    height: scaleHeight(181),
    resizeMode: 'contain',
  },
  trackingTitle: {
    fontSize: scaleFont(18),
    fontWeight: '700',
    color: '#031725',
    marginBottom: scaleHeight(8),
    zIndex: 1,
    lineHeight: scaleFont(24),
  },
  trackingSubtitle: {
    fontSize: scaleFont(14),
    fontWeight: '400',
    color: '#96823D',
    marginBottom: scaleHeight(29),
    lineHeight: scaleFont(20),
    zIndex: 1,
    letterSpacing: 0.5,
  },
  receiptInput: {
    borderRadius: scaleWidth(50),
    borderWidth: 1,
    borderColor: '#000000',
    fontSize: scaleFont(14),
    marginBottom: scaleHeight(10),
    zIndex: 1,
    color: '#000000',
    height: scaleHeight(56),
    fontWeight: '400',
    paddingHorizontal: scaleWidth(30),
    letterSpacing: 0.5,
  },
  trackButton: {
    height: 56,
    borderRadius: scaleWidth(50),
    justifyContent: 'space-between',
    zIndex: 1,
  },
  arrowIcon: {
    width: scaleWidth(16),
    height: scaleHeight(16),
    resizeMode: 'contain',
  },
  arrowIconWhite: {
    width: scaleWidth(16),
    height: scaleHeight(16),
    resizeMode: 'contain',
    tintColor: '#FFFFFF',
  },
  trackingHistory: {
    paddingHorizontal: scaleWidth(20),
    paddingBottom: scaleHeight(40),
  },
  historyTitle: {
    fontSize: scaleFont(16),
    fontWeight: '600',
    color: '#2E3E5C',
    marginBottom: scaleHeight(16),
    lineHeight: scaleFont(24),
    letterSpacing: 0.5,
  },
  trackingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: scaleWidth(12),
    paddingVertical: scaleHeight(14),
    paddingHorizontal: scaleWidth(12),
    marginBottom: scaleHeight(12),
  },
  trackingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: scaleWidth(12),
    backgroundColor: '#F1F6FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    width: scaleWidth(24),
    height: scaleWidth(24),
    resizeMode: 'contain',
  },
  trackingItemText: {
    flex: 1,
  },
  trackingNumber: {
    fontSize: scaleFont(14),
    fontWeight: '500',
    color: '#1E3354',
    marginBottom: scaleHeight(4),
  },
  trackingStatus: {
    fontSize: scaleFont(14),
    fontWeight: '400',
    color: '#7A809D',
    lineHeight: scaleFont(20),
    letterSpacing: 0.5,
  },
  trackingArrow: {
    width: scaleWidth(12),
    height: scaleHeight(12),
    resizeMode: 'contain',
    marginLeft: scaleWidth(12),
  },
});

export default OrdersScreen;
