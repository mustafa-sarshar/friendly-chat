import { StyleSheet } from "react-native";

import GLOBAL_STYLES from "../../assets/css";
const styles = StyleSheet.create({
  ...GLOBAL_STYLES,
  subContainer: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#ffffff80",
  },

  usernameWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
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
