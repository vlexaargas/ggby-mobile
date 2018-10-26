import { StyleSheet } from "react-native";
import * as v from "theme/variables";

export default StyleSheet.create({
  eventImage: {
    width: "100%",
    height: "60%",
    resizeMode: "cover"
  },

  instructorsSection: {
    marginTop: v.BASE_VALUE
  },

  instructorListView: {
    flexDirection: "row"
  },

  instructorView: {
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: v.BASE_VALUE,
    marginVertical: v.BASE_VALUE / 2
  },

  instructorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: "cover",
    marginBottom: v.BASE_VALUE / 2
  },

  contentContainer: {
    padding: v.BASE_VALUE * 2
  },

  titleText: {
    fontSize: v.LARGE_FONT_SIZE,
    fontWeight: v.BOLD_FONT_WEIGHT,
    color: v.PRIMARY_TEXT_COLOR,
    marginVertical: v.BASE_VALUE
  },

  secondaryTitleText: {
    fontSize: v.NORMAL_FONT_SIZE,
    fontWeight: v.BOLD_FONT_WEIGHT,
    color: v.PRIMARY_TEXT_COLOR,
    marginVertical: v.BASE_VALUE
  },

  normalText: {
    fontSize: v.NORMAL_FONT_SIZE,
    color: v.PRIMARY_TEXT_COLOR
  }
});
