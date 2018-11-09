import React from "react";
import { map } from "ramda";

import { ScrollView, View, Text, Image } from "react-native";

import styles from "./EventDetailsView.style";

// TODO: Extract into own service
const eventPicMap = {
  slackro:                                require("../../../assets/images/events/slackro.jpg"),
  "mounting the line":                    require("../../../assets/images/events/Mounting-The-Line.jpg"),
  "rigging analysis":                     require("../../../assets/images/events/Rigging-Analysis.jpg"),
  "highline pranayama":                   require("../../../assets/images/events/Highline-Pranayama.jpg"),
  "how not to have an open relationship": require("../../../assets/images/events/Open-Relationship.jpg")
};

// TODO: Extract into own service
const instructorPicMap = {
  default:          require("../../../assets/images/instructors/default-profile.jpg"),
  andrew:           require("../../../assets/images/instructors/Andrew-Gasparis.jpg"),
  ashley:           require("../../../assets/images/instructors/Ashley-Meyer.jpg"),
  brian:            require("../../../assets/images/instructors/Brian-Mosbaugh.jpg"),
  brooke:           require("../../../assets/images/instructors/Brooke-Kollman.jpg"),
  caroline:         require("../../../assets/images/instructors/Caroline-Dignes.png"),
  dan:              require("../../../assets/images/instructors/Dan-Walsh.jpg"),
  freidi:           require("../../../assets/images/instructors/Friedi.jpg"),
  jerry:            require("../../../assets/images/instructors/Jerry-Miszewski.png"),
  jess:             require("../../../assets/images/instructors/Jess-Joy.jpg"),
  josh:             require("../../../assets/images/instructors/Josh-Beaudoin.jpg"),
  kali:             require("../../../assets/images/instructors/Kali-Turner.jpg"),
  louie:            require("../../../assets/images/instructors/Louie-Wray.jpg"),
  melissa:          require("../../../assets/images/instructors/Melissa-Brady.jpg"),
  paulina:          require("../../../assets/images/instructors/Paulina-Rojas.jpg"),
  rj:               require("../../../assets/images/instructors/RJ.jpg"),
  sara:             require("../../../assets/images/instructors/Sara-K.jpg"),
  will:             require("../../../assets/images/instructors/Will-Primrose.jpg"),
  kim:              require("../../../assets/images/instructors/Kimberly-Weglin.jpg"),
  michelle:         require("../../../assets/images/instructors/Michelle-G.jpeg"),
  alexandra:        require("../../../assets/images/instructors/Alexandra-R.jpeg"),
  "sarah and damon":require("../../../assets/images/instructors/Sarah-Damon.jpeg"),
  "liz thomas":     require("../../../assets/images/instructors/Liz-Thomas.jpg"),
};

function getPicForEvent(title) {
  var cleanTitle = title.trim().toLowerCase();
  if(cleanTitle in eventPicMap) {
    return eventPicMap[cleanTitle];
  }
  //Not sure what to do when the event doesn't have a picture.
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
        </View>
      </View>
    </ScrollView>
  );
}

export default ({ navigation }) => getRender(navigation);
