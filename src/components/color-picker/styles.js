import { StyleSheet } from "react-native";
import { colors } from "../../assets/css";
import GLOBAL_STYLES from "../../assets/css";

const styles = StyleSheet.create({
  ...GLOBAL_STYLES,
  subContainer: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#ffffff80",
  },

  subContainerColors: {
    flexDirection: "row",
    backgroundColor: "#ffffff70",
    marginBottom: 30,
  },

  colorCircles: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    border: "10px solid black",
    margin: 5,
    elevation: 5,
  },
  colorWhite: {
    backgroundColor: colors.white,
  },
  colorRed: {
    backgroundColor: colors.red,
  },
  colorGreen: {
    backgroundColor: colors.green,
  },
  colorBlue: {
    backgroundColor: colors.blue,
  },
  colorGray: {
    backgroundColor: colors.gray,
  },
});

export default styles;
