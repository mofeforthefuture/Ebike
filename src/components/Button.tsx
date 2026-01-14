import React, { useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
  Animated,
} from 'react-native';
import { COLORS } from '../themes';
import { scaleWidth, scaleHeight, scaleFont } from '../utils';

export type ButtonVariant = 'default' | 'google' | 'bordered';

export interface ButtonProps {
  /**
   * The text to display on the button
   */
  title: string;
  /**
   * Callback function when button is pressed
   */
  onPress: () => void;
  /**
   * Button variant style
   * - 'default': Standard black button with rounded corners
   * - 'google': Pill-shaped button with space for Google icon on left
   * - 'bordered': Black button with yellow border/glow effect
   */
  variant?: ButtonVariant;
  /**
   * Icon component to display on the left side (e.g., Google logo)
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon component to display on the right side (e.g., arrow)
   */
  rightIcon?: React.ReactNode;
  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
  /**
   * Custom style for the button container
   */
  style?: ViewStyle;
  /**
   * Custom style for the text
   */
  textStyle?: TextStyle;
  /**
   * Full width button
   */
  fullWidth?: boolean;
  /**
   * Custom padding left
   */
  paddingLeft?: number;
  /**
   * Custom padding right
   */
  paddingRight?: number;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'default',
  leftIcon,
  rightIcon,
  disabled = false,
  style,
  textStyle,
  fullWidth = true,
  paddingLeft,
  paddingRight,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  const handlePress = () => {
    // Quick bounce animation on press for tactile feedback
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 0.92,
        useNativeDriver: true,
        tension: 400,
        friction: 7,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 400,
        friction: 7,
      }),
    ]).start();

    // Call the original onPress
    onPress();
  };

  const getButtonStyle = (): ViewStyle[] => {
    const baseStyle: ViewStyle[] = [styles.button];

    switch (variant) {
      case 'google':
        baseStyle.push(styles.buttonGoogle as ViewStyle);
        break;
      case 'bordered':
        baseStyle.push(styles.buttonBordered as ViewStyle);
        break;
      default:
        baseStyle.push(styles.buttonDefault as ViewStyle);
    }

    if (fullWidth) {
      baseStyle.push(styles.fullWidth as ViewStyle);
    }

    if (disabled) {
      baseStyle.push(styles.buttonDisabled as ViewStyle);
    }

    // Apply custom padding if provided
    if (paddingLeft !== undefined || paddingRight !== undefined) {
      const customPadding: ViewStyle = {};
      if (paddingLeft !== undefined) {
        customPadding.paddingLeft = paddingLeft;
      }
      if (paddingRight !== undefined) {
        customPadding.paddingRight = paddingRight;
      }
      // Override paddingHorizontal when custom padding is provided
      customPadding.paddingHorizontal = 0;
      baseStyle.push(customPadding);
    }

    if (style) {
      baseStyle.push(style);
    }

    return baseStyle;
  };

  const getTextStyle = (): TextStyle[] => {
    const baseStyle: TextStyle[] = [styles.text];

    switch (variant) {
      case 'bordered':
        baseStyle.push(styles.textBordered as TextStyle);
        break;
      default:
        baseStyle.push(styles.textDefault as TextStyle);
    }

    if (textStyle) {
      baseStyle.push(textStyle);
    }

    return baseStyle;
  };

  const isGoogleVariant = variant === 'google';

  const animatedStyle = {
    transform: [{ scale: scaleAnim }],
  };

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        style={getButtonStyle()}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        activeOpacity={1}
      >
        {leftIcon && (
          <View
            style={[
              styles.leftIconContainer,
              isGoogleVariant && styles.leftIconContainerGoogle,
            ]}
          >
            {leftIcon}
          </View>
        )}
        <Text
          style={[
            getTextStyle(),
            isGoogleVariant && (styles.textGoogle as TextStyle),
          ]}
        >
          {title}
        </Text>
        {isGoogleVariant && leftIcon && <View style={styles.rightSpacer} />}
        {rightIcon && (
          <View style={styles.rightIconContainer}>{rightIcon}</View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scaleWidth(16),
    backgroundColor: COLORS.black,
    height: scaleHeight(56),
  },
  buttonDefault: {
    borderRadius: scaleWidth(12),
  },
  buttonGoogle: {
    borderRadius: scaleWidth(50), // Pill-shaped
    justifyContent: 'flex-start',
    paddingLeft: scaleWidth(16),
  },
  buttonBordered: {
    borderRadius: scaleWidth(12),
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    // Add shadow for glow effect
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    fontSize: scaleFont(14),
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  textDefault: {
    color: '#FFFFFF',
  },
  textBordered: {
    color: '#FFFFFF', // Light gray/white as shown in image
  },
  leftIconContainer: {
    marginRight: scaleWidth(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftIconContainerGoogle: {
    marginRight: 0,
  },
  textGoogle: {
    flex: 1,
    textAlign: 'center',
  },
  rightSpacer: {
    width: scaleWidth(24), // Match icon width
    height: scaleWidth(24),
  },
  rightIconContainer: {
    marginLeft: scaleWidth(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Button;
