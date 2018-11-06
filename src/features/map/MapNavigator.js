import React from "react";

import { View, Text, Image } from "react-native";
import { createStackNavigator } from "react-navigation";
import defaultStackNavigatorConfigs from "../../components/navigator";

const Map = () => (
  <Image
    style={{
      flex: 1,
      resizeMode: 'cover',
      width: undefined,
      height: undefined
    }}
    source={require("../../../assets/images/hand-map.jpg")}
  />
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
