import { StyleSheet } from "react-native";

import GLOBAL_STYLES from "../../assets/css";

const styles = StyleSheet.create({
  ...GLOBAL_STYLES,
  subContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  imageContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  actionsWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#FFFFFF70",
  },
});

export default styles;
