import React, { useRef, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Animated,
} from 'react-native';
import { Bike } from '../assets';
import { scaleWidth, scaleHeight } from '../utils';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = scaleWidth(255);
const CARD_SPACING = scaleWidth(5);
const CARD_HEIGHT = scaleHeight(265);

interface BikeCarouselProps {
  bikes?: number[]; // Array of bike IDs or indices
}

const BikeCarousel: React.FC<BikeCarouselProps> = ({
  bikes = [1, 2, 3, 4, 5],
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
      listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / (CARD_WIDTH + CARD_SPACING));

        if (index !== currentIndex && index >= 0 && index < bikes.length) {
          setCurrentIndex(index);
        }
      },
    },
  );

  const getItemOpacity = (index: number) => {
    return scrollX.interpolate({
      inputRange: [
        (index - 1) * (CARD_WIDTH + CARD_SPACING),
        index * (CARD_WIDTH + CARD_SPACING),
        (index + 1) * (CARD_WIDTH + CARD_SPACING),
      ],
      outputRange: [0.5, 1, 0.5],
      extrapolate: 'clamp',
    });
  };

  const renderItem = ({ index }: { index: number }) => {
    const opacity = getItemOpacity(index);

    return (
      <Animated.View
        style={[
          styles.cardContainer,
          {
            opacity,
          },
        ]}
      >
        <View style={styles.card}>
          <Image source={Bike} style={styles.bikeImage} resizeMode="contain" />
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={bikes}
        renderItem={renderItem}
        keyExtractor={(item, index) => `bike-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        snapToInterval={CARD_WIDTH + CARD_SPACING}
        decelerationRate="fast"
        contentContainerStyle={styles.listContent}
        getItemLayout={(_, index) => ({
          length: CARD_WIDTH + CARD_SPACING,
          offset: (CARD_WIDTH + CARD_SPACING) * index,
          index,
        })}
      />
      <View style={styles.paginatorContainer}>
        {bikes.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginatorDot,
              index === currentIndex && styles.paginatorDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: scaleHeight(40),
  },
  listContent: {
    paddingHorizontal: 20,
  },
  cardContainer: {
    width: CARD_WIDTH,
    marginRight: 10,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#F1F6FB',
    borderRadius: 32,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    padding: scaleWidth(20),
  },
  bikeImage: {
    width: scaleWidth(199),
    height: scaleHeight(229),
  },
  paginatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleHeight(30),
  },
  paginatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E5F0FC',
    marginHorizontal: 4,
  },
  paginatorDotActive: {
    backgroundColor: '#02131E',
    width: 6,
    height: 6,
  },
});

export default BikeCarousel;
