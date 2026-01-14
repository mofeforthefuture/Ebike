import React, { useRef, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { scaleHeight, scaleWidth } from '../utils';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Slide {
  id: string;
  component: React.ReactNode;
}

interface SliderProps {
  slides: Slide[];
  onSlideChange?: (index: number) => void;
}

const Slider: React.FC<SliderProps> = ({ slides, onSlideChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / SCREEN_WIDTH);

    if (index !== currentIndex && index >= 0 && index < slides.length) {
      setCurrentIndex(index);
      onSlideChange?.(index);
    }
  };

  const renderItem = ({ item }: { item: Slide }) => {
    return <View style={styles.slideContainer}>{item.component}</View>;
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
      />
      <Paginator data={slides} currentIndex={currentIndex} />
    </View>
  );
};

interface PaginatorProps {
  data: Slide[];
  currentIndex: number;
}

const Paginator: React.FC<PaginatorProps> = ({ data, currentIndex }) => {
  return (
    <View style={styles.paginatorContainer}>
      {data.map((_, index) => (
        <View
          key={index}
          style={[
            styles.paginatorDot,
            index === currentIndex && styles.paginatorDotActive,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: scaleHeight(635),
  },
  slideContainer: {
    width: SCREEN_WIDTH,
    flex: 1,
  },
  paginatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: scaleHeight(48),
    paddingTop: scaleHeight(24),
  },
  paginatorDot: {
    width: 6,
    height: 6,
    borderRadius: scaleWidth(4),
    backgroundColor: '#FFFFFF',
    marginHorizontal: scaleWidth(8),
  },
  paginatorDotActive: {
    opacity: 1,
    width: 6,
    backgroundColor: '#02131E',
  },
});

export default Slider;
