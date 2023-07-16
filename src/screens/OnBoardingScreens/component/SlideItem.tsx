import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import React from 'react';
import tw from "twrnc"

const {width, height} = Dimensions.get('screen');

type Item = {
  img: any,
  title: string,
  subTitle: string,
  uamuziLogo: any,
}

type SlideItemProps = {
  item: Item,
  index: number,
}

const SlideItem: React.FC<SlideItemProps> = ({item, index}) => {
  const isFirstItem = index === 0;
  return (
    <View style={styles.container}>
      <Image
        source={item.img}
        resizeMode="contain"
        style={[
          tw`w-90% h-360px rounded-xl  mt-20px`,
        ]}
      />
      <View style={tw`flex-0.4 items-center`}>
        <View style={tw`flex-row`}>
          <Text style={tw`text-2xl font-bold text-[#333333] text-center mt-10px`}>{item.title}</Text>
        </View>
        <Text style={tw`text-lg mt-12px text-gray-700 text-center mr-15px ml-15px`}>{item.subTitle}</Text>
      </View>
    </View>
  );
};
export default SlideItem;
const styles = StyleSheet.create({
  container: {
    width,
    alignItems: 'center',  
  },
});

