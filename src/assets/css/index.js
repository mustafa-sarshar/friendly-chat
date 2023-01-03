import { StyleSheet } from "react-native";

export const colors = {
  white: "#FFFFFF",
  red: "#960905",
  green: "#275c33",
  blue: "#0245cc",
  gray: "#777a80",
};

const GLOBAL_STYLES = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  bgImage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    height: "100%",
  },

  lblBold: {
    fontWeight: "bold",
    textAlign: "center",
  },

  btnContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
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

  icon: {
    margin: 5,
    paddingBottom: 30,
    height: 24,
    width: 24,
  },
});

export default GLOBAL_STYLES;
