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

const mapWidth = 2339;
const mapHeight = 1654;

const FestivalMap = () => (
  <ImageZoom // this is very brittle with respect to making a general slackline festival app. This code is specific to the GGBY file map. TODO -- clean up
    cropWidth={Dimensions.get("screen").width}
    cropHeight={Dimensions.get("screen").height}
    imageWidth={mapWidth}
    imageHeight={mapHeight}
    enableCenterFocus={false}
    centerOn={{ x: 0, y: 0, scale: 0.17, duration: 100 }} // yuck TODO no magic numbers
    minScale={0.1}
    maxscale={2.0}
    maxoverflow={0}
    style={{
      flex: 1,
      resizemode: "cover",
      alignSelf: "center"
    }}
  >
    <Image
      style={{
        width: mapWidth, // yuck TODO no magics numbers
        height: mapHeight
      }}
      source={require("../../../assets/images/festival-map.jpg")}
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
