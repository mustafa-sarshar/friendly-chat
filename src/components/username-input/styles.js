import { StyleSheet } from "react-native";

import GLOBAL_STYLES from "../../assets/css";
const styles = StyleSheet.create({
  ...GLOBAL_STYLES,
  subContainer: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#ffffff50",
    paddingVertical: 24,
    margin: 30,
  },

  txtTitle: {
    marginTop: 8,
    paddingTop: 4,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },

  usernameWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#FFFFFF"
  },

  txtInput: {
    height: 40,
    padding: 10,
    width: 200,
    fontWeight: "bold",
    textAlign: "left",
    backgroundColor: "#FFFFFF",
  },
});

export default styles;
