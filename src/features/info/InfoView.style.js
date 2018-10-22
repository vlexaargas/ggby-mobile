import { StyleSheet } from "react-native";

import * as v from "../../theme/variables";

export default StyleSheet.create({
  contentContainer: {},

  primaryHeading: {
    marginHorizontal: v.BASE_VALUE,
    color: v.PRIMARY_TEXT_COLOR,
    fontSize: v.LARGE_FONT_SIZE,
    marginVertical: v.BASE_VALUE * 1.5,
    fontWeight: v.BOLD_FONT_WEIGHT
  },

  secondaryHeading: {
    marginHorizontal: v.BASE_VALUE,
    color: v.PRIMARY_TEXT_COLOR,
    fontSize: v.NORMAL_FONT_SIZE,
    fontWeight: v.BOLD_FONT_WEIGHT,
    marginBottom: v.BASE_VALUE * 1.25,
    marginTop: v.BASE_VALUE * 0.5
  },

  text: {
    marginHorizontal: v.BASE_VALUE,
    marginBottom: v.BASE_VALUE,
    color: v.PRIMARY_TEXT_COLOR,
    fontSize: v.NORMAL_FONT_SIZE
  },

  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginHorizontal: v.BASE_VALUE,
    marginBottom: v.BASE_VALUE
  },

  listItemText: {
    marginRight: v.BASE_VALUE
  }
});
