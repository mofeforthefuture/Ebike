import React from 'react';
import { View, StyleSheet, Animated, ScrollView } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { scaleWidth, scaleHeight } from '../../utils';
import { SCREEN_HEIGHT, BOTTOM_SHEET_MAX_HEIGHT } from './constants';
import { EstimatedTime } from './EstimatedTime';
import { SummaryCard } from './SummaryCard';
import { TrackingHistory } from './TrackingHistory';
import { SummaryItem, TrackingHistoryItem } from './types';

interface BottomSheetProps {
  estimatedTime: string;
  summaryItems: SummaryItem[];
  trackingHistory: TrackingHistoryItem[];
  translateY: Animated.Value;
  blurOpacity: Animated.AnimatedInterpolation<string | number>;
  onGestureEvent: (event: any) => void;
  onHandlerStateChange: (event: any) => void;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  estimatedTime,
  summaryItems,
  trackingHistory,
  translateY,
  blurOpacity,
  onGestureEvent,
  onHandlerStateChange,
}) => {
  return (
    <>
      {/* Blur Overlay - appears when sheet is expanded */}
      <Animated.View
        style={[
          styles.blurOverlay,
          {
            opacity: blurOpacity,
          },
        ]}
        pointerEvents="none"
      />

      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View
          style={[
            styles.bottomSheet,
            {
              transform: [{ translateY }],
            },
          ]}
        >
          <View style={styles.dragHandleContainer}>
            <View style={styles.dragHandle} />
          </View>

          <ScrollView
            style={styles.scrollContent}
            contentContainerStyle={styles.scrollContentContainer}
            showsVerticalScrollIndicator={false}
          >
            <EstimatedTime time={estimatedTime} />

            <SummaryCard items={summaryItems} />

            <TrackingHistory items={trackingHistory} />
          </ScrollView>
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

const styles = StyleSheet.create({
  blurOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 998,
  },
  bottomSheet: {
    position: 'absolute',
    top: SCREEN_HEIGHT,
    left: 0,
    right: 0,
    height: BOTTOM_SHEET_MAX_HEIGHT,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 42,
    borderTopRightRadius: 42,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
    zIndex: 999,
  },
  dragHandleContainer: {
    paddingTop: scaleHeight(12),
    paddingBottom: scaleHeight(8),
    alignItems: 'center',
  },
  dragHandle: {
    width: scaleWidth(48),
    height: scaleHeight(5),
    backgroundColor: '#DBE2E9',
    borderRadius: scaleWidth(2),
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: scaleHeight(20),
  },
});
