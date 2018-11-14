import React from "react";

import { Image, Dimensions } from "react-native";
import ImageZoom from 'react-native-image-pan-zoom';
import { createStackNavigator } from "react-navigation";
import defaultStackNavigatorConfigs from "../../components/navigator";

const Map = () => (

  <ImageZoom // this is very brittle with respect to making a general slackline festival app. This code is specific to the GGBY file map. TODO -- clean up
    cropWidth={Dimensions.get('screen').width}
    cropHeight={Dimensions.get('screen').height}
    imageWidth={1988}
    imageHeight={2547}
    enableCenterFocus={false}
    centerOn={{ x: 0, y: 0, scale: 0.17, duration: 100 }} //yuck TODO no magic numbers
    minScale={0.1}
    maxscale={2.0} 
    maxoverflow={0}
    style={{
      flex: 1,
      resizemode: 'contain',
      alignSelf: 'center'
      }}>
     <Image 
       style={{
         width: 1988, // yuck TODO no magics numbers
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
