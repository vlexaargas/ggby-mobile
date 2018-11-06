import React from "react";
import moment from "moment";

import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";

import styles from "./EventItemView.style";

export default class EventItemView extends React.Component {
  render() {
    const {
      event,
      hasReminder,
      onEventPress,
      onReminderIconPress
    } = this.props;

    const { title, startTime, endTime, description } = event;

    return (
      <TouchableOpacity onPress={onEventPress}>
        <View style={styles.eventItemContainer}>
          <View style={styles.leftEventItemSection}>
            <Text style={styles.normalText}>
              {startTime}
            </Text>

            <Text style={styles.secondaryText}>
              {endTime}
            </Text>
          </View>

          <View style={styles.centerEventItemSection}>
            <Text style={styles.eventTitleText}>{title}</Text>
            <Text style={styles.secondaryText}>
              {description}
            </Text>
          </View>

          <View style={styles.rightEventItemSection}>
            <Icon
              onPress={onReminderIconPress}
              style={[
                styles.reminderIcon,
                hasReminder && styles.activeReminderIcon
              ]}
              name={`ios-alarm${hasReminder ? "" : "-outline"}`}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
