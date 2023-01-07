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

  actionsWrapper: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

export default styles;
