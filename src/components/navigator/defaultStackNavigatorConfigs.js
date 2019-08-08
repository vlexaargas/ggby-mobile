import React from "react";

import { Image, StatusBar, Text } from "react-native";

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
{/*        <Image
          style={{
            marginLeft: v.BASE_VALUE,
            width: 30,
            height: 30,
            resizeMode: "contain"
          }}
          fadeDuration={0}
          source={require("../../../assets/appicon/ggby-logo-ios.png")}
        />*/}
        {/*<Image
          style={{
            marginHorizontal: v.BASE_VALUE,
            width: 240,
            height: 240,
            resizeMode: "contain"
          }}
          fadeDuration={0}
          source={require("../../../assets/images/festival-name.png")}
        /> */}
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold'
          }}
        >
          Bern City Slack
        </Text>
      </React.Fragment>
    )
  }
};
