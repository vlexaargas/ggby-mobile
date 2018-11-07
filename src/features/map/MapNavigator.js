import React from "react";

import { WebView } from "react-native";
import { createStackNavigator } from "react-navigation";
import defaultStackNavigatorConfigs from "../../components/navigator";

const Map = () => (
  <WebView
  originWhitelist={['*']}
  source={require("../../../assets/images/hand-map-2.jpg")}
  injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.16, minimum-scale=0.16, maximum-scale=0.4, user-scalable=1'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
  scalesPageToFit={false}
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
