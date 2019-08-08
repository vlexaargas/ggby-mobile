import React from "react";
import moment from "moment";
import { groupBy, map, keys } from "ramda";

import { View, Text, SectionList } from "react-native";
import { BlurView } from 'expo-blur';
import EventItemContainer from "./EventItemContainer";

import styles from "./ScheduleView.style";

class ScheduleView extends React.PureComponent {
  keyExtractor = ({ id }) => id.toString();

  renderSectionHeader = ({ section: { title } }) => (
    <BlurView tint="light" intensity={80} style={styles.sectionHeaderContainer}>
      <Text style={styles.sectionTitleText}>{title}</Text>
    </BlurView>
  );

  renderEventItem = ({ item: event }) => <EventItemContainer event={event} />;

  sectionListData = () => {
    const { events } = this.props;

    const groupByDate = ({ startDateTime }) =>
      moment(startDateTime).format("dddd, MMMM Do");

    const groupedEvents = groupBy(groupByDate, events);

    return map(
      title => ({
        title,
        key: title,
        data: map(item => ({ ...item }), groupedEvents[title])
      }),
      keys(groupedEvents)
    );
  };

  render() {
    const { events, emptyMessage } = this.props;

    return (
      <View style={styles.screen}>
        {events.length ? (
          <SectionList
            sections={this.sectionListData()}
            keyExtractor={this.keyExtractor}
            renderSectionHeader={this.renderSectionHeader}
            renderItem={this.renderEventItem}
          />
        ) : (
          <Text style={[styles.normalText, styles.emptyMessageText]}>
            {emptyMessage}
          </Text>
        )}
      </View>
    );
  }
}

export default ScheduleView;
