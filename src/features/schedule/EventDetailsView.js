import React from "react";
import { map } from "ramda";

import { ScrollView, View, Text, Image } from "react-native";

import styles from "./EventDetailsView.style";

// const event = {
//   title: "Slackro",
//   longDetails:
//     "You may have tried Acroyoga before, but perhaps you haven't tried the type of acroyoga that's designed specifically for YOUR strengths. Slackro is a type of acroyoga that utilizes the sort of balance and focus skill that you EXCEL at because of your slackline practice. Come balance and wiggle on other humans in between wiggling on one-inch bridges.",
//   picRef: "slackro",
//   instructors: [
//     {
//       name: "Michelle",
//       picRef: "michelle"
//     },
//     {
//       name: "Alex",
//       picRef: "alex"
//     },
//     {
//       name: "Brian",
//       picRef: "brian"
//     }
//   ]
// };

// TODO: Extract into own service
const eventPicMap = {
  slackro: require("../../../assets/images/events/slackro.jpg")
};

// TODO: Extract into own service
const instructorPicMap = {
  michelle: require("../../../assets/images/events/slackro.jpg"),
  alex: require("../../../assets/images/events/slackro.jpg"),
  brian: require("../../../assets/images/events/slackro.jpg")
};

function getPicForEvent(title) {
  // This is just an example will be changed once we populate the maps
  if(eventPicMap.indexOf(title) != -1) {
    return instrueventPicMapctorPicMap[title];
  }
  //Not sure what to do when the event doesn't have a picture.
  return undefined;
  // return eventPicMap[title];
}

function getInstructorList(event) {
  return event.instructors.replace(' ','').split(',').map(i -> {return {name: i}});
}

function getPicForInstructor(instructorName) {
  if(instructorPicMap.indexOf(instructorName) != -1) {
    return instructorPicMap[instructorName];
  }
  //Not sure what to do when the instructor doesn't have a picture.
  return undefined;
}

function getDescription(event) {
  if (event.description == "" || event.description == undefined) {
    return event.shortDescription;
  }
  return event.description;
}

function getRender(navigation) {
  const event = navigation.getParam("event");

  return (
    <ScrollView
      style={styles.screenView}
      contentContainerStyle={styles.screenView}
    >
      <Image style={styles.eventImage} source={getPicForEvent(event.title)} />

      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>{event.title}</Text>

        <Text style={styles.normalText}>{event.description}</Text>

        <View style={styles.instructorsSection}>
          <Text style={styles.secondaryTitleText}>Taught by:</Text>

          <View style={styles.instructorListView}>
            {map(
              ({ name }) =>
                console.log(name) || (
                  <View
                    style={styles.instructorView}
                    key={getPicForEvent(event.title)}
                  >
                    <Image
                      style={styles.instructorImage}
                      source={getPicForInstructor(name)}
                    />

                    <Text style={styles.normalText}>{name}</Text>
                  </View>
                ),
              getInstructorList(event)
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default ({ navigation }) => getRender(navigation);
