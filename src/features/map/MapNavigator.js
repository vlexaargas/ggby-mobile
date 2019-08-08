import React from "react";

import { Image, Dimensions } from "react-native";
import ImageZoom from "react-native-image-pan-zoom";
import {
  createStackNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";
import { StyleSheet } from "react-native";
import defaultStackNavigatorConfigs from "../../components/navigator";

import * as v from "../../theme/variables";

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: v.SECONDARY_DARK_BACKGROUND_COLOR
  },
  indicatorStyle: {
    backgroundColor: v.ACCENT_COLOR
  },
  labelStyle: {
    fontWeight: "600"
  }
});

const mapWidth = 1080;
const mapHeight = 1750;
// There are a lot of magic numbers in this file.
// The mapWidth and height must be included as well as the magic numbers 
// for the crop width and height :/


const FestivalMap = () => (
  <ImageZoom
    cropWidth={Dimensions.get("screen").width}
    cropHeight={Dimensions.get("screen").height-240}
    imageWidth={mapWidth}
    imageHeight={mapHeight}
    enableCenterFocus={false}
    centerOn={{ x: 0, y: 0, scale: .3, duration: 100 }} 
    minScale={0.2}
    maxscale={2.0}
    maxoverflow={0}
    style={{
      flex: 1,
      alignSelf: "stretch"
    }}
  >
    <Image
      style={{
        width: mapWidth, 
        height: mapHeight
      }}
      source={require("../../../assets/images/festival-map.png")}
    />
  </ImageZoom>
);


const MapNavigator = createStackNavigator(
  {
    MapTabs: {
      screen: FestivalMap
    }
  },
  defaultStackNavigatorConfigs
);

export default MapNavigator;
