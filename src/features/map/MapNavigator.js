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

// Also convert to stateful component so reset() can be called when component will mount.
// without this, cropWidth 
const CityMap = ({viewPortWidth, ViewPortHeight}) => (
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

const map2Width = 613;
const map2Height = 280;

const FestivalMap = () => (
  <ImageZoom // this is very brittle with respect to making a general slackline festival app. This code is specific to the GGBY file map. TODO -- clean up
    cropWidth={Dimensions.get("screen").width}
    cropHeight={Dimensions.get("screen").height - 240}
    imageWidth={map2Width}
    imageHeight={map2Height}
    enableCenterFocus={false}
    centerOn={{ x: 0, y: 0, scale: 0.5, duration: 100 }} // yuck TODO no magic numbers
    minScale={0.5}
    maxscale={1.0}
    maxoverflow={0}
    style={{
      flex: 1,
      alignSelf: "stretch"
    }}
  >
    <Image
      style={{
        width: map2Width, // yuck TODO no magics numbers
        height: map2Height
      }}
      source={require("../../../assets/images/details-map.png")}
    />
  </ImageZoom>
);

const MapTabs = createMaterialTopTabNavigator(
  {
    CityMap: {
      screen: props => <CityMap />,
      navigationOptions: {
        title: "City Map"
      }
    },
    FestivalMap: {
      screen: props => <FestivalMap />,
      navigationOptions: {
        title: "Festival Map"
      }
    }
  },
  {
    tabBarOptions: {
      style: styles.containerStyle,
      indicatorStyle: styles.indicatorStyle,
      labelStyle: styles.labelStyle,
      activeTintColor: v.ACCENT_COLOR,
      inactiveTintColor: v.WHITE,
      upperCaseLabel: false
    }
  }
);

const MapNavigator = createStackNavigator(
  {
    MapTabs: {
      screen: MapTabs
    }
  },
  defaultStackNavigatorConfigs
);

export default MapNavigator;
