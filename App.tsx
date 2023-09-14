import React from 'react';
import {StyleSheet, View} from 'react-native';
import Slider from './src/components/Slider';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

const DATA = [
  {
    key: 0,
    url: 'https://images.unsplash.com/photo-1491466424936-e304919aada7?w=1920&q=80',
  },
  {
    key: 1,
    url: 'https://images.unsplash.com/photo-1512850183-6d7990f42385?w=1974&q=80',
  },
  {
    key: 2,
    url: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=1974&q=80',
  },
  {
    key: 3,
    url: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=1974&q=80',
  },
  {
    key: 4,
    url: 'https://images.unsplash.com/photo-1491466424936-e304919aada7w=2938&q=80',
  },
];

const App = () => {
  const scrollX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
    },
  });

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={DATA}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.containerBox}
        keyExtractor={item => item.key.toString()}
        renderItem={({item, index}) => (
          <Slider item={item} index={index} scrollX={scrollX} />
        )}
        onScroll={scrollHandler}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  containerBox: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 20,
    paddingHorizontal: 10,
  },
});
