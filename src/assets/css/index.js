import { StyleSheet } from "react-native";

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

  btn: {
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    outlineWidth: 0,
    backgroundColor: "lightblue",
    textAlign: "center",
  },
});

export default GLOBAL_STYLES;
