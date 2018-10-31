import React from "react";

import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import Schedule from "../schedule";
import Map from "../map";
import Info from "../info";

import TabBarIcon from "../../components/icons";
import * as v from "../../theme/variables";

// NOTE: If the RootNavigator get any more complex (i.e.  accounts/registration
// features) we'll probably want to move this into its own feature dir. For
// now, the RootNavigator below is pretty much just providing a header.

const RootNavigator = createMaterialBottomTabNavigator(
  {
    Schedule: {
      screen: Schedule,
      navigationOptions: {
        tabBarLabel: "Schedule",
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name="calendar" />
        )
      }
    },
    Map: {
      screen: Map,
      navigationOptions: {
        tabBarLabel: "Map",
        tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="map" />
      }
    },
    Info: {
      screen: Info,
      navigationOptions: {
        tabBarLabel: "Beta",
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name="beta" />
        )
      }
    }
  },
  {
    barStyle: {
      backgroundColor: v.DARK_BACKGROUND_COLOR
    },
    inactiveColor: v.WHITE,
    activeColor: v.ACCENT_COLOR,
    initialRouteName: 'Schedule'
  }
);

export default RootNavigator;
