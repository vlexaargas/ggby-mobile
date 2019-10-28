import { createStackNavigator } from "react-navigation-stack";
import defaultStackNavigatorConfigs from "../../components/navigator";

import InfoContainer from "./InfoContainer";

const InfoNavigator = createStackNavigator(
  {
    Info: {
      screen: InfoContainer
    }
  },
  defaultStackNavigatorConfigs
);

export default InfoNavigator;
