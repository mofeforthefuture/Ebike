import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import { BOTTOM_SHEET_MAX_HEIGHT, BOTTOM_SHEET_MIN_HEIGHT } from './constants';

export const useBottomSheet = () => {
  const translateY = useRef(
    new Animated.Value(-BOTTOM_SHEET_MIN_HEIGHT),
  ).current;
  const lastOffsetY = useRef(-BOTTOM_SHEET_MIN_HEIGHT);
  const baseY = useRef(new Animated.Value(-BOTTOM_SHEET_MIN_HEIGHT)).current;
  const gestureY = useRef(new Animated.Value(0)).current;
  const currentValueRef = useRef(-BOTTOM_SHEET_MIN_HEIGHT);

  useEffect(() => {
    translateY.setValue(-BOTTOM_SHEET_MIN_HEIGHT);
    baseY.setValue(-BOTTOM_SHEET_MIN_HEIGHT);
    lastOffsetY.current = -BOTTOM_SHEET_MIN_HEIGHT;
    currentValueRef.current = -BOTTOM_SHEET_MIN_HEIGHT;
    gestureY.setValue(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Combine base position with gesture
  const combinedY = Animated.add(baseY, gestureY);

  // Sync combined position to translateY and track current value
  useEffect(() => {
    const listenerId = combinedY.addListener(({ value }) => {
      translateY.setValue(value);
      currentValueRef.current = value;
    });
    return () => {
      combinedY.removeListener(listenerId);
    };
  }, [combinedY, translateY]);

  // Blur overlay opacity based on sheet position
  const blurOpacity = translateY.interpolate({
    inputRange: [-BOTTOM_SHEET_MAX_HEIGHT, -BOTTOM_SHEET_MIN_HEIGHT],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: gestureY } }],
    { useNativeDriver: true },
  );

  const onHandlerStateChange = (event: any) => {
    const { oldState, translationY, velocityY } = event.nativeEvent;

    if (oldState === 1) {
      // BEGAN - reset gesture translation and update base to current position
      const currentValue = currentValueRef.current;
      baseY.setValue(currentValue);
      lastOffsetY.current = currentValue;
      gestureY.setValue(0);
    } else if (oldState === 4) {
      // END - gesture finished
      const currentPosition = lastOffsetY.current + translationY;

      // Clamp position to valid range
      const clampedPosition = Math.max(
        -BOTTOM_SHEET_MAX_HEIGHT,
        Math.min(-BOTTOM_SHEET_MIN_HEIGHT, currentPosition),
      );

      // Calculate snap position based on velocity and position
      let snapTo = -BOTTOM_SHEET_MIN_HEIGHT;

      const midPoint =
        (-BOTTOM_SHEET_MIN_HEIGHT + -BOTTOM_SHEET_MAX_HEIGHT) / 2;

      if (velocityY < -700) {
        // Fast upward swipe - expand
        snapTo = -BOTTOM_SHEET_MAX_HEIGHT;
      } else if (velocityY > 700) {
        // Fast downward swipe - minimize
        snapTo = -BOTTOM_SHEET_MIN_HEIGHT;
      } else if (clampedPosition < midPoint) {
        // Above midpoint - expand
        snapTo = -BOTTOM_SHEET_MAX_HEIGHT;
      } else {
        // Below midpoint - minimize
        snapTo = -BOTTOM_SHEET_MIN_HEIGHT;
      }

      // Reset gesture
      gestureY.setValue(0);
      lastOffsetY.current = snapTo;

      // Update base position
      baseY.setValue(snapTo);

      // Use timing for smoother downward motion, spring for upward
      const isMovingDown = snapTo > clampedPosition;
      const distance = Math.abs(snapTo - clampedPosition);

      if (isMovingDown && distance > 30) {
        // Use timing animation for smoother downward motion
        Animated.timing(translateY, {
          toValue: snapTo,
          duration: Math.min(350, Math.max(200, distance * 0.6)),
          useNativeDriver: true,
        }).start(() => {
          translateY.setValue(snapTo);
          baseY.setValue(snapTo);
        });
      } else {
        // Use spring for upward or small movements
        Animated.spring(translateY, {
          toValue: snapTo,
          useNativeDriver: true,
          damping: 22,
          stiffness: 100,
          velocity: velocityY ? Math.abs(velocityY) / 1000 : 0,
        }).start(() => {
          translateY.setValue(snapTo);
          baseY.setValue(snapTo);
        });
      }
    }
  };

  return {
    translateY,
    blurOpacity,
    onGestureEvent,
    onHandlerStateChange,
  };
};
