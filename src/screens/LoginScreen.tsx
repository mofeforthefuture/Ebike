import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS } from '../themes';
import { scaleFont, scaleHeight, scaleWidth } from '../utils';
import { Wavy, OnboardingOne, GoogleIcon } from '../assets';
import Slider from '../components/Slider';
import Button from '../components/Button';
import { RootStackParamList } from '../navigation/types';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

interface SlideData {
  id: string;
  title: string;
  description: string;
}

const slidesData: SlideData[] = [
  {
    id: '1',
    title: 'Welcome to E-Bikes',
    description: 'Buying Electric bikes just got a lot easier, Try us today.',
  },
  {
    id: '2',
    title: 'Quality Bikes',
    description: 'Discover premium electric bikes for your daily commute.',
  },
  {
    id: '3',
    title: 'Fast Delivery',
    description: 'Get your bike delivered quickly and safely to your door.',
  },
];

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleGoogleLogin = () => {
    // Navigate to MainTabs (bottom tab navigator)
    navigation.navigate('MainTabs');
  };

  const handleSignUp = () => {
    // TODO: Implement sign up navigation
    console.log('Sign up pressed');
  };

  const renderSlide = (slide: SlideData) => (
    <View style={styles.slideContent}>
      <View style={styles.illustrationContainer}>
        <Image
          source={OnboardingOne}
          style={styles.onboardingImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.description}>{slide.description}</Text>
      </View>
    </View>
  );

  const sliderSlides = slidesData.map(slide => ({
    id: slide.id,
    component: renderSlide(slide),
  }));

  return (
    <View style={styles.container}>
      <View style={styles.semicircle} />
      <Image source={Wavy} style={styles.wavy} />
      <Slider slides={sliderSlides} />
      <View style={styles.actionContainer}>
        <Button
          variant="google"
          title="Login with Google"
          leftIcon={
            <Image
              source={GoogleIcon}
              style={styles.googleIconImage}
              resizeMode="contain"
            />
          }
          onPress={handleGoogleLogin}
          style={styles.loginButton}
        />
        <TouchableOpacity
          style={styles.signupContainer}
          onPress={handleSignUp}
          activeOpacity={0.7}
        >
          <Text style={styles.signupText}>Don't have any account? </Text>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  semicircle: {
    width: scaleWidth(278),
    height: scaleHeight(556),
    position: 'absolute',
    top: -33,
    left: 0,
    backgroundColor: '#FFCE23',
    borderTopRightRadius: scaleWidth(278),
    borderBottomRightRadius: scaleWidth(278),
  },
  wavy: {
    width: scaleWidth(221),
    height: scaleHeight(181),
    position: 'absolute',
    top: scaleHeight(-5),
    right: scaleWidth(-25),
    resizeMode: 'contain',
  },
  slideContent: {
    flex: 1,
    paddingHorizontal: scaleWidth(20),
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  onboardingImage: {
    width: scaleWidth(322.52),
    height: scaleHeight(237.36),
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: scaleHeight(8),
    lineHeight: scaleHeight(32),
    textAlign: 'center',
  },
  description: {
    fontSize: scaleFont(14),
    color: COLORS.textGold,
    textAlign: 'center',
    paddingHorizontal: scaleWidth(16),
    lineHeight: scaleHeight(24),
    letterSpacing: 0.5,
    fontWeight: '400',
  },
  actionContainer: {
    paddingHorizontal: scaleWidth(20),
    paddingBottom: scaleHeight(40),
  },
  loginButton: {
    marginBottom: scaleHeight(48),
  },
  googleIconImage: {
    width: scaleWidth(32),
    height: scaleWidth(32),
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: scaleWidth(14),
    color: COLORS.textGold,
    fontWeight: '500',
    lineHeight: scaleHeight(25),
    letterSpacing: 0.5,
  },
  signupLink: {
    fontSize: scaleWidth(14),
    color: '#031522',
    fontWeight: '600',
  },
});
