import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { COLORS } from '../themes';
import {
  Header,
  TrackingIdInput,
  TrackingMap,
  BottomSheet,
  useBottomSheet,
  SummaryItem,
} from '../components/TrackingDetails';
import type { TrackingHistoryItem } from '../components/TrackingDetails/types';

type Props = NativeStackScreenProps<RootStackParamList, 'TrackingDetails'>;

const TrackingDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { receiptNumber } = route.params;
  const { translateY, blurOpacity, onGestureEvent, onHandlerStateChange } =
    useBottomSheet();

  const trackingHistory: TrackingHistoryItem[] = [
    {
      id: '1',
      status: 'In Delivery',
      location: 'Bali, Indonesia',
      time: '00.00 PM',
      type: 'truck',
      iconColor: COLORS.primary,
    },
    {
      id: '2',
      status: 'Transit - Sending City',
      location: 'Jakarta, Indonesia',
      time: '21.00 PM',
      type: 'mailbox',
      iconColor: '#F1F6FB',
    },
    {
      id: '3',
      status: 'Send Form Sukabumi',
      location: 'Sukabumi, Indonesia',
      time: '19.00 PM',
      type: 'package',
      iconColor: '#F1F6FB',
    },
  ];

  const summaryItems: SummaryItem[] = [
    {
      label: 'Origin',
      value: 'Sukabumi, Indonesia',
      subtext: `No receipt : SCP6653728497`,
    },
    {
      label: 'Postal fee',
      value: '2,50 USD',
    },
    {
      label: 'Destination',
      value: 'Bali, Indonesia',
      subtext: 'Parcel, 24kg',
    },
  ];

  return (
    <GestureHandlerRootView style={styles.gestureRoot}>
      <View style={styles.fullScreenContainer}>
        <TrackingMap />

        <SafeAreaView style={styles.headerOverlay} edges={['top']}>
          <Header
            title="Tracking Details"
            onBackPress={() => navigation.goBack()}
          />
          <TrackingIdInput value="SCP6653728497" />
        </SafeAreaView>

        <BottomSheet
          estimatedTime="2h 40m"
          summaryItems={summaryItems}
          trackingHistory={trackingHistory}
          translateY={translateY}
          blurOpacity={blurOpacity}
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
        />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  gestureRoot: {
    flex: 1,
  },
  fullScreenContainer: {
    flex: 1,
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    zIndex: 1,
    paddingTop: Platform.OS === 'android' ? 8 : 0,
  },
});

export default TrackingDetailsScreen;
