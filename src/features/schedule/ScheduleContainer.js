import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import { __, filter, reject, pluck, propSatisfies, includes } from "ramda";

import { selectEvents } from "../../domain/events";
import { selectIndexedEventReminders } from "../../domain/eventReminders";

import ScheduleView from "./ScheduleView";

const emptyMessageMap = {
  upcoming:
    "Wow. Looks like GGBY 2018 has come to an end.\n\nThank you so very" +
    " much for coming 🙏🙏🙏 we sincerly hope it 'twas the most incredible" +
    " of times for you.\n\n 🚶 Slack on!",
  interested:
    'No events have yet been marked as "interested" 🤷.\n\nTo do so, head to the' +
    ' "Upcoming" tab 👈, take a look-see, and hit the alarm button for a 30' +
    " minute reminder & to add to this list.\n\nSo pick some workshops and" +
    " activities and let's raaaaage!",
  past:
    "Nothing's happened yet!\n\nAdventure abounds in the near future, get" +
    " ready to meet some wonderful people 😁 !"
};

class ScheduleContainer extends React.Component {
  sortedEvents = () => {
    const { indexedEventReminders, filterBy } = this.props;

    const { events } = this.props;

    // "Upcoming" events includes ongoing events
    const upcomingEvents = filter(
      ({ startDateTime, duration }) =>
        moment(startDateTime)
          .add(parseFloat(duration), "hours")
          .isAfter(moment()),
      events
    );

    // "Past" events are those that are not "Upcoming"
    const pastEvents = reject(
      propSatisfies(includes(__, pluck("id", upcomingEvents)), "id"),
      events
    );

    switch (filterBy) {
      case "upcoming":
        return upcomingEvents;
      case "interested":
        return filter(e => indexedEventReminders[e.id], upcomingEvents);
      case "past":
        return pastEvents;
      default:
        return events;
    }
  };

  render() {
    const { filterBy } = this.props;
    return (
      <ScheduleView
        events={this.sortedEvents()}
        onEventPress={this.onEventPress}
        emptyMessage={emptyMessageMap[filterBy]}
      />
    );
  }
}

const mapStateToProps = state => ({
  indexedEventReminders: selectIndexedEventReminders(state),
  events: selectEvents(state)
});

export default connect(mapStateToProps)(ScheduleContainer);
