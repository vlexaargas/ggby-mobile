import React from "react";


import { Platform, Image, Dimensions, StyleSheet } from "react-native";
import ImageZoom from "react-native-image-pan-zoom";
import MapView from 'react-native-maps';

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

const mapWidth = 2048;
const mapHeight = 1977;
// There are a lot of magic numbers in this file.
// The mapWidth and height must be included as well as the magic numbers
// for the crop width and height :/

// Also convert to stateful component so reset() can be called when component will mount.
// without this, cropWidth
class CityMap extends React.Component {
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
      source={require("../../../assets/images/FruitBowl.jpg")}
    />
  );

  render() {
    const { error } = this.state;

    return !error ? (
      <ImageZoom
        cropWidth={Dimensions.get("screen").width}
        cropHeight={Dimensions.get("screen").height-240}
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

const map2Width = 613;
const map2Height = 280;

class FestivalMap extends React.Component {
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
      source={require("../../../assets/images/details-map.png")}
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

// Defines bounding region of map region and overlay (overhead shot) per MapView docs 
// https://github.com/react-native-community/react-native-maps/blob/master/docs/mapview.md
// https://github.com/react-native-community/react-native-maps/blob/master/docs/overlay.md
const upperLeftLat = 38.537217
const upperLeftLon = -109.948547
const lowerRightLat = 38.532936
const lowerRightLon = -109.944216
class FruitBowlMap extends React.Component {

  render() {
    return ( <MapView
    provider="google"
    mapType="none"
    initialRegion={{
      latitude: (upperLeftLat + lowerRightLat ) / 2,
      longitude: (upperLeftLon + lowerRightLon) / 2,
      latitudeDelta: Math.abs(upperLeftLat - lowerRightLat),
      longitudeDelta: Math.abs(upperLeftLon - lowerRightLon),
    }}
    overlay={{
      image: "../../../assets/images/FruitBowl.jpg",
      //38.537217, -109.948547
      //38.532936, -109.944216
      bounds: [
          {latitude: upperLeftLat, longitude: upperLeftLon},
          {latitude: lowerRightLat, longitude: lowerRightLon}
      ]
    }}
    />
    );
  }
}

const MapTabs = createMaterialTopTabNavigator(
  {
    FruitBowlMap: {
      screen: props => <FruitBowlMap />,
      navigationOptions: {
        title: "Fruit Bowl"
      }
    },
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
