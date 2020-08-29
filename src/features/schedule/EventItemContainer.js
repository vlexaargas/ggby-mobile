import React from "react";
import { pipe } from "ramda";

import { connect } from "react-redux";
import { withNavigation } from "react-navigation";

import {
  scheduleEventReminder,
  cancelEventReminder
} from "../../epics/eventReminders";

import { selectEventReminder } from "../../domain/eventReminders";

import EventItemView from "./EventItemView";

class EventItemContainer extends React.PureComponent {
  onEventPress = () => {
    const { navigation, event } = this.props;
    if (event.description || (event.shortDescription && event.location)) {
      navigation.navigate("EventDetails", { event });
    }
  };

  onReminderIconPress = () => {
    const {
      event,
      eventReminder,
      cancelEventReminder,
      scheduleEventReminder
    } = this.props;

    return eventReminder
      ? cancelEventReminder(event)
      : scheduleEventReminder(event);
  };

  render() {
    const { event, eventReminder } = this.props;

    return (
      <EventItemView
        event={event}
        hasReminder={!!eventReminder}
        onReminderIconPress={this.onReminderIconPress}
        onEventPress={this.onEventPress}
      />
    );
  }
}

const mapStateToProps = (state, props) => ({
  eventReminder: selectEventReminder(state, props.event.id)
});

const mapDispatchToProps = dispatch => ({
  scheduleEventReminder: event => dispatch(scheduleEventReminder(event)),
  cancelEventReminder: event => dispatch(cancelEventReminder(event))
});

export default pipe(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withNavigation
)(EventItemContainer);
