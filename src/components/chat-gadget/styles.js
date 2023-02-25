import { StyleSheet } from "react-native";
import GLOBAL_STYLES from "../../assets/css";

const styles = StyleSheet.create({
  ...GLOBAL_STYLES,
  subContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    padding: 20,
  },

  giftedChatContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  chatArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    height: "100%",
  },

  mapView: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
  },
});

export default styles;
