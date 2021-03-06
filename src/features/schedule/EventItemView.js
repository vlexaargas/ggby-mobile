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

    const { title, startDateTime, duration, shortDescription, description, instructor } = event;

    return (
      <TouchableOpacity onPress={onEventPress} activeOpacity={description ? 0.2 : 1.0 }> 
        <View style={styles.eventItemContainer}>
          <View style={styles.leftEventItemSection}>
            <Text style={styles.normalText}>
              {moment(startDateTime).format("HH:mm")}
            </Text>
            { !!duration &&  // ugly double negation needed to type coerce the int to a bool and check it's truthiness. (error without)
              <Text style={styles.secondaryText}>
                {`${duration}hr`}
              </Text>
            }
       
          </View>

          <View style={styles.centerEventItemSection}>
            <Text style={styles.eventTitleText}>{title}</Text>
            <Text style={styles.secondaryText} numberOfLines={3} ellipsizeMode="tail">
              {shortDescription ? shortDescription : (description ? description : instructor ? (`Taught by: ${instructor}`) : "")}
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
