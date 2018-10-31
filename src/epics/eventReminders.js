import { combineEpics, ofType } from "redux-observable";
import { createAction } from "redux-actions";
import { empty, from, merge, of } from "rxjs";
import { mergeMap, map, filter, share } from "rxjs/operators";
import moment from "moment";

import { Alert } from "react-native";
import { Permissions, Notifications } from "expo";

import {
  saveEventReminder,
  removeEventReminder,
  selectEventReminder
} from "../domain/eventReminders";

const scheduleEventReminder = createAction(
  "SCHEDULE_EVENT_REMINDER",
  event => event
);

const cancelEventReminder = createAction(
  "CANCEL_EVENT_REMINDER",
  event => event
);

// TODO: Move static text content into i18n lib
const reminderTitles = [
  "Get ready to rage!",
  "Scarf that sandwich!",
  "Grab a quick power nap!",
  "Get Ready!",
  "Prepare yourselves!",
  "Align your chakras!",
  "Get Involved!",
  "Finish those cosmic downloads!"
];


// TODO: remove this. for testing only
Notifications.presentLocalNotificationAsync({
  title: "Hey this is a test",
  body: `Test notification body bla bla bla`,
  ios: { sound: true },
  android: { icon: "./assets/images/ggby-logo-96-grayscale.png"}
}
)

const sample = arr => arr[Math.floor(Math.random() * arr.length)];

const scheduleEventReminderEpic = action$ =>
  action$.pipe(
    ofType(scheduleEventReminder.toString()),
    mergeMap(({ payload: event }) => {
      const getPermission$ = from(
        Permissions.getAsync(Permissions.NOTIFICATIONS)
      ).pipe(
        mergeMap(perm => {
          if (perm.status === "granted") return of(perm);
          return from(Permissions.askAsync(Permissions.NOTIFICATIONS));
        }),
        share()
      );

      const handleNoPerm$ = getPermission$.pipe(
        filter(({ status }) => status !== "granted"),
        mergeMap(() => {
          // TODO: Move static text content into i18n lib
          Alert.alert(
            "Bummer!",
            "We can't notify you without permission. Please slide into your " +
              "settings and flip that knob to the right. 😜🙏👽 Raaaage Ooonnnn!"
          );

          return empty();
        })
      );

      const scheduleReminder$ = getPermission$.pipe(
        filter(({ status }) => status === "granted"),
        mergeMap(() =>
          from(
            // TODO: Move static text content into i18n lib
            Notifications.scheduleLocalNotificationAsync(
              {
                title: sample(reminderTitles),
                body: `You've got 30 minutes till ${event.name}.`,
                ios: { sound: true },
                android: { icon: "../../assets/images/ggby-logo-96-grayscale.png"}
              },
              {
                time: moment(event.startAt)
                  .subtract("30", "minutes")
                  .valueOf() // unix timestamp in ms
              }
            )
          )
        ),
        map(notificationId => saveEventReminder(event.id, notificationId))
      );

      return merge(handleNoPerm$, scheduleReminder$);
    })
  );

// TODO: This can be done in more idiomatic, rxjs-y way but going to put it down
// for now :[.
const cancelEventReminderEpic = (action$, state$) =>
  action$.pipe(
    ofType(cancelEventReminder.toString()),
    map(({ payload: event }) => {
      const eventReminder = selectEventReminder(state$.value, event.id);
      if (!eventReminder) return empty();

      Notifications.cancelScheduledNotificationAsync(
        eventReminder.notificationId
      );

      return removeEventReminder(event.id);
    })
  );

export default combineEpics(scheduleEventReminderEpic, cancelEventReminderEpic);

export { scheduleEventReminder, cancelEventReminder };
