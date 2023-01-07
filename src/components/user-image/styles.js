import { StyleSheet } from "react-native";

import GLOBAL_STYLES from "../../assets/css";
const styles = StyleSheet.create({
  ...GLOBAL_STYLES,
  subContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },

  imgContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 8,
    padding: 8,
    marginVertical: 4,
  },

  btnWrapper: {
    flexDirection: "row",
  },

  img: {
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 200,
  },
});

export default styles;
