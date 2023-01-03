import { StyleSheet } from "react-native";

import GLOBAL_STYLES from "../../assets/css";
const styles = StyleSheet.create({
  ...GLOBAL_STYLES,

  chatArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    height: "100%",
  },
});

export default styles;
