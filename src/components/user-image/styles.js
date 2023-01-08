import { StyleSheet } from "react-native";

import GLOBAL_STYLES from "../../assets/css";
const styles = StyleSheet.create({
  ...GLOBAL_STYLES,
  subContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  imgContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },

  img: {
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 200,
    borderRadius: 8,
    borderWidth: 1,
  },

  btnWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
