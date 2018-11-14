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
  "how not to have an open relationship": require("../../../assets/images/events/Open-Relationship.jpg"),
  "arm balance":                          require("../../../assets/images/events/ArmBalance.jpg"),
  "cliffside coffee":                     require("../../../assets/images/events/cliffsidecoffe.jpg"),
  "cosmic meditation":                    require("../../../assets/images/events/Cosmic-Meditation.jpg"),
  "bon fire: fire spinning & history of ggby": require("../../../assets/images/events/FireSpinning.jpg"),
  "dnace improvisation the`art":          require("../../../assets/images/events/DNAce.png"),
  "flexibility":                          require("../../../assets/images/events/Flexibilty.jpg"),
  "breath and movement group engagement": require("../../../assets/images/events/GroupBreath.jpg"),
  "how not to have an open relationship": require("../../../assets/images/events/OpenRelationship.jpg"),
  "monolithic bounce":                    require("../../../assets/images/events/monolithic-bounce.jpg"),
  "sacred mobility":                      require("../../../assets/images/events/SacredMobility.jpg"),
  "acro dance":                           require("../../../assets/images/events/acrodance.jpg"),
  "shibari":                              require("../../../assets/images/events/shibari.jpg"),
  "painting with pony":                   require("../../../assets/images/events/Painting-with-Pony.jpg"),
  "way of the wiggle warrior":            require("../../../assets/images/events/Wiggle-Warriors.jpg"),
  "tandem slackline":                     require("../../../assets/images/events/tandemslacking.jpg"),
  "talent show":                          require("../../../assets/images/events/TalentShow.jpg"),
  "tinker toots campfire tales":          require("../../../assets/images/events/TinkerTootsTales.jpg"),
  "strength & recovery":                  require("../../../assets/images/events/Strength-Recovery.jpg"),
  "state of flow":                        require("../../../assets/images/events/StateOfFlow.jpg"),
  "group movement share slackrotopia":    require("../../../assets/images/events/Slackrotopia.jpg"),
  "slacklifebc dance party":              require("../../../assets/images/events/SlacklifeBCDance.jpg"),
  "inversions in acro":                   require("../../../assets/images/events/Inversions.jpg"),
  "intro to highline":                    require("../../../assets/images/events/IntroToHighline.jpg")
};

// TODO: Extract into own service
const instructorPicMap = {
  default:          require("../../../assets/images/instructors/default-profile.jpg"),
  andrew:           require("../../../assets/images/instructors/Andrew-Gasparis.jpg"),
  ashley:           require("../../../assets/images/instructors/Ashley-Meyer.jpg"),
  brian:            require("../../../assets/images/instructors/Brian-Mosbaugh.jpg"),
  bianca:           require("../../../assets/images/instructors/bianca.png"),
  brooke:           require("../../../assets/images/instructors/Brooke-Kollman.jpg"),
  caroline:         require("../../../assets/images/instructors/Caroline-Dignes.png"),
  cosmic:           require("../../../assets/images/instructors/Cosmic.jpg"),
  dan:              require("../../../assets/images/instructors/Dan-Walsh.jpg"),
  "dany B.":        require("../../../assets/images/instructors/DanyB.jpg"),
  freidi:           require("../../../assets/images/instructors/Friedi.jpg"),
  jerry:            require("../../../assets/images/instructors/Jerry-Miszewski.png"),
  jess:             require("../../../assets/images/instructors/Jess-Joy.jpg"),
  josh:             require("../../../assets/images/instructors/Josh-Beaudoin.jpg"),
  kali:             require("../../../assets/images/instructors/Kali-Turner.jpg"),
  louie:            require("../../../assets/images/instructors/Louie-Wray.jpg"),
  melissa:          require("../../../assets/images/instructors/Melissa-Brady.jpg"),
  nick:             require("../../../assets/images/instructors/Nick-Olson.jpg"),
  paulina:          require("../../../assets/images/instructors/Paulina-Rojas.jpg"),
  rj:               require("../../../assets/images/instructors/RJ.jpg"),
  sara:             require("../../../assets/images/instructors/Sara-K.jpg"),
  ryan:             require("../../../assets/images/instructors/Ryan-Jenks.jpg"),
  will:             require("../../../assets/images/instructors/Will-Primrose.jpg"),
  kim:              require("../../../assets/images/instructors/Kimberly-Weglin.jpg"),
  michelle:         require("../../../assets/images/instructors/Michelle-G.jpg"),
  alexandra:        require("../../../assets/images/instructors/Alexandra-R.jpg"),
  "sarah and damon":require("../../../assets/images/instructors/Sarah-Damon.jpg"),
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
