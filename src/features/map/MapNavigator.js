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

const Map = () => (
  <ImageZoom // this is very brittle with respect to making a general slackline festival app. This code is specific to the GGBY file map. TODO -- clean up
    cropWidth={Dimensions.get("screen").width}
    cropHeight={Dimensions.get("screen").height}
    imageWidth={1988}
    imageHeight={2547}
    enableCenterFocus={false}
    centerOn={{ x: 0, y: 0, scale: 0.17, duration: 100 }} // yuck TODO no magic numbers
    minScale={0.1}
    maxscale={2.0}
    maxoverflow={0}
    style={{
      flex: 1,
      resizemode: "contain",
      alignSelf: "center"
    }}
  >
    <Image
      style={{
        width: 1988, // yuck TODO no magics numbers
        height: 2547
      }}
      source={require("../../../assets/images/the-beautiful-fucking-map.png")}
    />
  </ImageZoom>
);

const Map2 = () => (
  <ImageZoom // this is very brittle with respect to making a general slackline festival app. This code is specific to the GGBY file map. TODO -- clean up
    cropWidth={Dimensions.get("screen").width}
    cropHeight={Dimensions.get("screen").height}
    imageWidth={1988}
    imageHeight={2547}
    enableCenterFocus={false}
    centerOn={{ x: 0, y: 0, scale: 0.17, duration: 100 }} // yuck TODO no magic numbers
    minScale={0.1}
    maxscale={2.0}
    maxoverflow={0}
    style={{
      flex: 1,
      resizemode: "contain",
      alignSelf: "center"
    }}
  >
    <Image
      style={{
        width: 1988, // yuck TODO no magics numbers
        height: 2547
      }}
      source={require("../../../assets/images/highline-sponsors.png")}
    />
  </ImageZoom>
);

const MapTabs = createMaterialTopTabNavigator(
  {
    FestivalMap: {
      screen: props => <Map />,
      navigationOptions: {
        title: "Festival Map"
      }
    },
    HighlineMap: {
      screen: props => <Map2 />,
      navigationOptions: {
        title: "Highline Map"
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
