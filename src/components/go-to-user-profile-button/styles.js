import { StyleSheet } from "react-native";

import GLOBAL_STYLES from "../../assets/css";
const styles = StyleSheet.create({
  ...GLOBAL_STYLES,
  subContainer: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#ffffff80",
  },

  btnWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    width: 200,
  },
});

export default styles;
