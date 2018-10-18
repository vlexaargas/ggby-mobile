import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import { map, cond, equals, filter } from "ramda";

import { selectEvents } from "../../domain/events";
import { selectIndexedEventReminders } from "../../domain/eventReminders";

import ScheduleView from "./ScheduleView";

const mockEventTimes = event => {
  let seedTime = moment();

  if (event.id === 1) {
    seedTime = seedTime.subtract(1, "day");
  } else if (event.id % 2 === 0) {
    seedTime = seedTime.add(1, "day");
  }

  return {
    ...event,
    startAt: seedTime.add(event.id, "hour").format(),
    endAt: seedTime.add(event.id + 1, "hour").format()
  };
};

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

    let { events } = this.props;
    events = map(mockEventTimes, events);

    const upcomingEvents = filter(
      e => moment(e.startAt).isAfter(moment()),
      events
    );

    switch (filterBy) {
      case "upcoming":
        return upcomingEvents;
      case "interested":
        return filter(e => indexedEventReminders[e.id], upcomingEvents);
      case "past":
        return filter(e => moment(e.startAt).isBefore(moment()), events);
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
