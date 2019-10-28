import React from "react";

import { createStackNavigator } from "react-navigation-stack";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";

import defaultStackNavigatorConfigs from "../../components/navigator";
import * as v from "../../theme/variables";
import styles from "./ScheduleNavigator.style";

import ScheduleContainer from "./ScheduleContainer";
import EventDetailsView from "./EventDetailsView";

const ScheduleTabs = createMaterialTopTabNavigator(
  {
    UpcomingEvents: {
      screen: props => <ScheduleContainer filterBy="upcoming" {...props} />,
      navigationOptions: {
        title: "Upcoming"
      }
    },
    InterestedEvents: {
      screen: props => <ScheduleContainer filterBy="interested" {...props} />,
      navigationOptions: {
        title: "Interested"
      }
    },
    PastEvents: {
      screen: props => <ScheduleContainer filterBy="past" {...props} />,
      navigationOptions: {
        title: "Past"
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

const ScheduleNavigator = createStackNavigator(
  {
    ScheduleTabs: {
      screen: ScheduleTabs
    },
    EventDetails: {
      screen: EventDetailsView
    }
  },
  defaultStackNavigatorConfigs
);

export default ScheduleNavigator;
