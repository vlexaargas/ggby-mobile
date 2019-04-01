import React from "react";
import { map } from "ramda";

import { ScrollView, View, Text, Image } from "react-native";

import styles from "./EventDetailsView.style";

// TODO: Extract into own service
const eventPicMap = {
  // slackro:                                require("../../../assets/images/events/slackro.jpg"),
};

// TODO: Extract into own service
const instructorPicMap = {
  default:          require("../../../assets/images/instructors/default-profile.jpg"),
};

function getPicForEvent(title) {
  var cleanTitle = title.trim().toLowerCase();
  if(cleanTitle in eventPicMap) {
    return eventPicMap[cleanTitle];
  }
  return undefined;
}

function getInstructorList(event) {
  return event.instructor.split(',').map(i => {return {name: i.trim()}});
}

function getPicForInstructor(instructorName) {
  var cleanInstructorName = instructorName.toLowerCase();
  if(cleanInstructorName in instructorPicMap) {
    return instructorPicMap[cleanInstructorName];
  } else {
    return instructorPicMap.default;
  }
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
      { getPicForEvent(event.title) &&
      <Image style={styles.eventImage} source={getPicForEvent(event.title)} />
      }
      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>{event.title}</Text>

        <Text style={styles.normalText}>{event.description}</Text>

        { !!event.instructor && 
          (<View style={styles.instructorsSection}>
            <Text style={styles.secondaryTitleText}>Taught by:</Text>

            <View style={styles.instructorListView}>
              {map(
                ({ name }) =>
                  console.log(name) || (
                    <View
                      style={styles.instructorView}
                      key={name}
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
          </View>)
        }
      </View>
    </ScrollView>
  );
}

export default ({ navigation }) => getRender(navigation);
