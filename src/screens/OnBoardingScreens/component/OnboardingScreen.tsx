import { Animated, FlatList, Text, View, Pressable, Dimensions } from 'react-native';
import React, { useRef, useState, useMemo } from 'react';
import Slides from '../data';
import SlideItem from './SlideItem';
import Pagination from './Pagination';
import tw from 'twrnc';


const OnboardingScreen = ({ navigation }: { navigation: any }) => {
  const [index, setIndex] = useState<number>(0);
  const scrollX = useRef<Animated.Value>(new Animated.Value(0)).current;
  const [currentPage, setCurrentPage] = useState<number>(0);


  const isLastPage = useMemo(() => currentPage === Slides.length - 1, [currentPage]);
  const nextButtonTitle = isLastPage ? "Let’s Get Started" : "Next";

  const slider = useRef<FlatList<any>>(null);
  const slideNext = () => {
    if (nextButtonTitle === "Let’s Get Started") {
      navigation.navigate('SignUp1');
    } else {
      const nextIndex = currentPage + 1;
      const offset = nextIndex * Dimensions.get('window').width;
      slider.current?.scrollToOffset({ offset, animated: true });
      setCurrentPage(nextIndex);
    }
  };

  const handleSkipPress = () => {
    setCurrentPage(Slides.length - 1);
    slider.current?.scrollToEnd({ animated: true });
  };

  const handleOnScroll = (event: any) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      }
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems && viewableItems.length > 0) {
      setIndex(viewableItems[0].index);
      setCurrentPage(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View style={{ flex: 1, backgroundColor: '#F0F3F4', }}>
      <Pressable onPress={handleSkipPress}>
        <Text style={tw`text-right text-black font-bold mt-70px mr-32px`}>Skip</Text>
      </Pressable>
      <View style={{ height: 780 }}>
        <FlatList
          data={Slides}
          renderItem={({ item }: any) => <SlideItem item={item} index={0} />}
          horizontal
          pagingEnabled
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          onScroll={handleOnScroll}
          onViewableItemsChanged={handleOnViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / Dimensions.get('window').width);
            setCurrentPage(index);
          }}
          ref={slider}
        />
        <Pagination data={Slides} scrollX={scrollX} index={index} />
      </View>
      <View style={{ position: 'absolute', bottom: 40, left: 0, right: 0 }}>
        <Pressable onPress={slideNext} style={tw`bg-[#5591a9] h-40px mt-15px justify-center items-center ml-15px mr-15px rounded-xl shadow-xl shadow-[#5591a9]`}>
          <Text style={tw`text-white font-bold  text-lg `}>{nextButtonTitle}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default OnboardingScreen;