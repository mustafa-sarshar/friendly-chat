import { StyleSheet } from "react-native";

import GLOBAL_STYLES from "../../assets/css";
const styles = StyleSheet.create({
  ...GLOBAL_STYLES,

  btnContainer: {
    width: "100%",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 0,
  },

  btn: {
    padding: 4,
    borderWidth: 1,
    borderRadius: 8,
    outlineWidth: 0,
    backgroundColor: "#FFFFFF",
  },

  imgAvatar: {
    width: 30,
    height: 30,
  },
});

export default styles;
