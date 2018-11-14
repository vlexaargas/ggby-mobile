import React from "react";

import { Image, Dimensions } from "react-native";
import ImageZoom from 'react-native-image-pan-zoom';
import { createStackNavigator } from "react-navigation";
import defaultStackNavigatorConfigs from "../../components/navigator";

const Map = () => (

   <ImageZoom cropWidth={Dimensions.get('screen').width}
                       cropHeight={Dimensions.get('screen').height}
                       imageWidth={1988}
                       imageHeight={2547}
                       enableCenterFocus={false}
                       centerOn={{ x: 0, y: 0, scale: 0.25, duration: 100 }}
                       minScale={0.2}
                       maxScale={2.0}
                       maxOverflow={0}>
                <Image
                style={{
                  width: 1988,
                  height: 2547
                }}
                source={require("../../../assets/images/the-beautiful-fucking-map.png")}
                />
            </ImageZoom>
  
);

const MapNavigator = createStackNavigator(
  {
    Map: {
      screen: Map
    }
  },
  defaultStackNavigatorConfigs
);

export default MapNavigator;
