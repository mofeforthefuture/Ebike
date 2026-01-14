import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import { RootStackParamList } from '../navigation/types';
import { MainTabParamList } from '../navigation/types';
import { Cyclist, Bell, CycleAnimation, ArrowRight } from '../assets';
import BikeCarousel from '../components/BikeCarousel';
import { scaleWidth, scaleHeight, scaleFont } from '../utils';
import { COLORS } from '../themes';
import Button from '../components/Button';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const bellScale = useRef(new Animated.Value(1)).current;

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

  const handleOrdersPress = () => {
    navigation.navigate('Orders');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
        <BikeCarousel />

        {/* Yellow Banner Section */}
        <View style={styles.yellowBanner}>
          <Text style={styles.bannerText}>Gotten your{'\n'}E-Bike yet?</Text>
          <Button
            title="Your Orders"
            onPress={handleOrdersPress}
            rightIcon={<Image source={ArrowRight} style={styles.arrowIcon} />}
            fullWidth={false}
            style={styles.ordersButton}
            textStyle={styles.ordersButtonText}
          />
        </View>

        {/* Promotional Section */}
        <View style={styles.promotionalSection}>
          <LottieView
            source={CycleAnimation}
            autoPlay
            loop
            style={styles.cyclistIcon}
          />
          <Text style={styles.promotionalText}>
            You too can join our{'\n'}Elite squad of E-bikers
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 16,
  },
  safeArea: {
    height: scaleHeight(812),
    backgroundColor: '#FFF',
  },
  topSection: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    // paddingBottom: 20,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  yellowBanner: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(24),
    marginTop: scaleHeight(32),
    width: '100%',
    height: scaleHeight(109),
    zIndex: 1000,
  },
  bannerText: {
    fontSize: scaleFont(14),
    fontWeight: '400',
    color: COLORS.textGold,
    lineHeight: scaleFont(18),
    flex: 1,
  },
  ordersButton: {
    width: scaleWidth(183),
    height: 56,
    paddingLeft: scaleWidth(30),
    paddingRight: scaleWidth(36),
    borderRadius: scaleWidth(52),
    justifyContent: 'space-between',
  },
  ordersButtonText: {
    fontSize: scaleFont(14),
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  arrowIcon: {
    width: scaleWidth(16),
    height: scaleHeight(16),
    resizeMode: 'contain',
  },
  promotionalSection: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: scaleHeight(123),
  },
  cyclistIcon: {
    width: scaleWidth(161),
    height: scaleHeight(161),
    marginTop: -5,
  },
  promotionalText: {
    fontSize: scaleFont(14),
    fontWeight: '400',
    color: '#4B5563',
    lineHeight: scaleFont(18),
    letterSpacing: 0.5,
    marginTop: -40,
  },
});

export default HomeScreen;
