import React from "react";
import { View, Pressable, Text } from "react-native";

import { colors } from "../../assets/css";
import styles from "./styles";

const ColorPicker = (props) => {
  const { onChatBgColorChange } = props;

  return (
    <View style={styles.subContainer}>
      <Text>Select you favorite background color</Text>
      <Text>for chatting</Text>
      <View style={styles.subContainerColors}>
        <Pressable
          key="colorRed"
          style={[styles.colorCircles, styles.colorRed]}
          onPressOut={() =>
            onChatBgColorChange({
              name: "Red",
              code: colors.red,
            })
          }
        ></Pressable>
        <Pressable
          key="colorGreen"
          style={[styles.colorCircles, styles.colorGreen]}
          onPressOut={() =>
            onChatBgColorChange({
              name: "Green",
              code: colors.green,
            })
          }
        ></Pressable>
        <Pressable
          key="colorWhite"
          style={[styles.colorCircles, styles.colorWhite]}
          onPressOut={() =>
            onChatBgColorChange({
              name: "White",
              code: colors.white,
            })
          }
        ></Pressable>
        <Pressable
          key="colorBlue"
          style={[styles.colorCircles, styles.colorBlue]}
          onPressOut={() =>
            onChatBgColorChange({
              name: "Blue",
              code: colors.blue,
            })
          }
        ></Pressable>
        <Pressable
          key="colorGray"
          style={[styles.colorCircles, styles.colorGray]}
          onPressOut={() =>
            onChatBgColorChange({
              name: "Gray",
              code: colors.gray,
            })
          }
        ></Pressable>
      </View>
    </View>
  );
};

export default ColorPicker;
