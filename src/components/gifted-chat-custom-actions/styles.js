import { StyleSheet } from "react-native";
import { colors } from "../../assets/css";
import GLOBAL_STYLES from "../../assets/css";

const styles = StyleSheet.create({
  ...GLOBAL_STYLES,
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },

  wrapper: {
    flex: 1,
    borderRadius: 13,
    borderColor: "#b2b2b2",
    borderWidth: 2,
  },

  iconText: {
    color: "#b2b2b2",
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: "transparent",
    textAlign: "center",
  },
});

export default styles;
