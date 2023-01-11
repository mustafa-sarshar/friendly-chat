import { StyleSheet } from "react-native";

import GLOBAL_STYLES from "../../assets/css";
const styles = StyleSheet.create({
  ...GLOBAL_STYLES,
  subContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff80",
    marginBottom: 20,
  },

  btnWrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 8,
  },

  btnTitle: {
    alignItems: "center",
    justifyContent: "center",
  },

  btn: {
    width: 200,
    padding: 10,
    outlineWidth: 0,
    backgroundColor: "#FFFFFF",
    textAlign: "center",
  },
});

export default styles;
