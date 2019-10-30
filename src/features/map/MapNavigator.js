import React from "react";

import { Image, Dimensions, StyleSheet } from "react-native";
import ImageZoom from "react-native-image-pan-zoom";

import {
  createStackNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";

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

const mapWidth = 1432;
const mapHeight = 1864;
const mapPath = "../../../assets/images/FruitBowl.jpg"
// There are a lot of magic numbers in this file.
// The mapWidth and height must be included as well as the magic numbers
// for the crop width and height :/

// Also convert to stateful component so reset() can be called when component will mount.
// without this, cropWidth
class FruitBowlMap extends React.Component {
  state = {
    error: false
  };

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { error: true };
  }

  renderImage = () => (
    <Image
      style={{
        width: mapWidth,
        height: mapHeight
      }}
      source={require()}
    />
  );

  render() {
    const { error } = this.state;

    return !error ? (
      <ImageZoom
        cropWidth={Dimensions.get("screen").width}
        cropHeight={Dimensions.get("screen").height - 240}
        imageWidth={mapWidth}
        imageHeight={mapHeight}
        enableCenterFocus={false}
        centerOn={{ x: 0, y: 0, scale: 0.3, duration: 100 }}
        minScale={0.2}
        maxscale={2.0}
        maxoverflow={0}
        style={{
          flex: 1,
          alignSelf: "stretch"
        }}
      >
        {this.renderImage()}
      </ImageZoom>
    ) : (
      this.renderImage()
    );
  }
}

const map2Width = 1080;
const map2Height = 1750;
const map2Path = "../../../assets/images/Overview.jpg";

class OverviewMap extends React.Component {
  state = {
    error: false
  };

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { error: true };
  }

  renderImage = () => (
    <Image
      style={{
        width: map2Width, // yuck TODO no magics numbers
        height: map2Height
      }}
      source={require()}
    />
  );

  render() {
    const { error } = this.state;

    return !error ? (
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
        {this.renderImage()}
      </ImageZoom>
    ) : (
      this.renderImage()
    );
  }
}

const MapTabs = createMaterialTopTabNavigator(
  {
    Map1: {
      screen: props => <FruitBowlMap />,
      navigationOptions: {
        title: "Fruit Bowl"
      }
    },
    Map2: {
      screen: props => <OverviewMap />,
      navigationOptions: {
        title: "Overview"
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
