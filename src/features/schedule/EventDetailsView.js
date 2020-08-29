import React from "react";
import { map } from "ramda";

import { ScrollView, View, Text, Image } from "react-native";

import styles from "./EventDetailsView.style";

import { instructorPicMap, eventPicMap } from './EventImageAssets'

function getPicForEvent(title) {
  var cleanTitle = title
    .trim()
    .replace(/[\.\?&\':\\\/]/g, '')
    .toLowerCase()
    .replace(/ /g, '_');

  if(cleanTitle in eventPicMap) {
    return eventPicMap[cleanTitle];
  }
  // poor mans way to find mismatched event names / workshop image file names
  // console.log(`no find :( cleaned title name: ${cleanTitle}`)
  return undefined;
}

function getInstructorList(event) {
  return event.instructor.split(',').map(i => {return {name: i.trim()}});
}

function getPicForInstructor(instructorName) {
  var cleanInstructorName = instructorName
    .replace(/ /g, "_")
    .toLowerCase();

  if(cleanInstructorName in instructorPicMap) {
    return instructorPicMap[cleanInstructorName];
  } else {
      // poor mans way to find mismatched instructor names / instructor image file names
    // console.log("no find :( " + cleanInstructorName);
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

      <Text style={styles.normalText}>{getDescription(event)}</Text>

      <Text style={styles.secondaryTitleText}>Location:</Text>
      <Text style={styles.normalText}>{event.location}</Text>

       { !!event.instructor && 
          (<View style={styles.instructorsSection}>
            <Text style={styles.secondaryTitleText}>Taught by:</Text>

            <View style={styles.instructorListView}>
              {map(
                ({ name }) =>
                   (
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
