import { StyleSheet } from "react-native";

import GLOBAL_STYLES from "../../assets/css";
const styles = StyleSheet.create({
  ...GLOBAL_STYLES,

  btnContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 0,
  },

  btn: {
    margin: 10,
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    outlineWidth: 0,
    backgroundColor: "#FFFFFF",
    textAlign: "center",
  },
});

export default styles;
