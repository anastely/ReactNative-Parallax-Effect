import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

type itemProps = {
  url: string;
  key: number;
};
interface SliderProps {
  item: itemProps;
  index: number;
  scrollX: SharedValue<number>;
}
const SCREEN_WIDTH = Dimensions.get('window').width;
const IMG_WIDTH = SCREEN_WIDTH - 20;
const IMG_HEIGHT = SCREEN_WIDTH * 1.6;

const Slider: React.FC<SliderProps> = ({item, index, scrollX}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * SCREEN_WIDTH,
      index * SCREEN_WIDTH,
      (index + 1) * SCREEN_WIDTH,
    ];
    const translateX = interpolate(scrollX.value, inputRange, [
      -SCREEN_WIDTH * 0.7,
      0,
      SCREEN_WIDTH * 0.7,
    ]);
    return {
      transform: [{translateX}],
    };
  });

  return (
    <Animated.View style={[styles.container]}>
      <Animated.Image
        source={{uri: item.url}}
        style={[styles.img, animatedStyle]}
      />
    </Animated.View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  container: {
    height: IMG_HEIGHT,
    width: IMG_WIDTH,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: IMG_HEIGHT,
    width: IMG_WIDTH * 1.5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
});
