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

    const { title, startDateTime, duration, shortDescription, description, instructor, location } = event;

    return (
      <TouchableOpacity onPress={onEventPress} activeOpacity={description ? 0.2 : 1.0 }> 
        <View style={styles.eventItemContainer}>
          <View style={styles.leftEventItemSection}>
            <Text style={styles.normalText}>
              {moment(startDateTime).format("h:mm A")}
            </Text>
            { !!duration &&  // ugly double negation needed to type coerce the int to a bool and check it's truthiness. (error without)
              <Text style={styles.secondaryText}>
                {moment(startDateTime).add(duration, 'm').format("h:mm A") }
              </Text>
            }
       
          </View>

          <View style={styles.centerEventItemSection}>
            <Text style={styles.eventTitleText}>{title}</Text>
            <Text style={styles.secondaryText} numberOfLines={3} ellipsizeMode="tail">
              {shortDescription ? shortDescription : (description ? description : instructor ? (`By: ${instructor} @ ${location}`) : "")}
            </Text>
          </View>

          <View style={styles.rightEventItemSection}>
            <Icon
              onPress={onReminderIconPress}
              style={[
                styles.reminderIcon,
                hasReminder && styles.activeReminderIcon
              ]}
              name={`ios-alarm`}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
