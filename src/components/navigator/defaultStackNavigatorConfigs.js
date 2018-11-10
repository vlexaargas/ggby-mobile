import React from "react";

import { Image, StatusBar } from "react-native";

import * as v from "../../theme/variables";

export default {
  headerLayoutPreset: "left",
  navigationOptions: {
    headerTintColor: v.WHITE,
    headerStyle: {
      backgroundColor: v.DARK_BACKGROUND_COLOR,
      borderBottomWidth: 0
    },
    headerTitle: () => (
      <React.Fragment>
        <StatusBar barStyle="light-content" />
        <Image
          style={{
            marginLeft: v.BASE_VALUE,
            width: 30,
            height: 30,
            resizeMode: "contain"
          }}
          fadeDuration={0}
          source={require("../../../assets/appicon/ggby-logo-no-text.png")}
        />
        <Image
          style={{
            marginHorizontal: v.BASE_VALUE,
            width: 70,
            height: 25,
            resizeMode: "contain"
          }}
          fadeDuration={0}
          source={require("../../../assets/images/ggby-name.png")}
        />
      </React.Fragment>
    )
  }
};
