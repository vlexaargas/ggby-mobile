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

    const { title, startDateTime, duration, shortDescription, description } = event;

    return (
      <TouchableOpacity onPress={onEventPress}>
        <View style={styles.eventItemContainer}>
          <View style={styles.leftEventItemSection}>
            <Text style={styles.normalText}>
              {moment(startDateTime).format("h a")}
            </Text>
            { !!duration &&  // ugly double negation needed to type coerce the int to a bool and check it's truthiness. (error without)
              <Text style={styles.secondaryText}>
                {`${duration} hour${duration > 1 ? "s" : ""}`}
              </Text>
            }
       
          </View>

          <View style={styles.centerEventItemSection}>
            <Text style={styles.eventTitleText}>{title}</Text>
            <Text style={styles.secondaryText} numberOfLines={3} ellipsizeMode="tail">
              {shortDescription ? shortDescription : description}
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
