import React from "react";
import { View, Pressable, Text } from "react-native";

import { colors } from "../../assets/css";
import styles from "./styles";

const ColorPicker = (props) => {
  const { onChatBgColorChange, textColor } = props;

  return (
    <View style={styles.subContainer}>
      <View
        style={styles.txtWrapper}
        accessible={true}
        accessibilityLabel="Select your favorite theme color"
      >
        <Text style={[styles.lblBold, { color: textColor }]}>
          Select you favorite theme color
        </Text>
        <Text style={[styles.lblBold, { color: textColor }]}>for chatting</Text>
      </View>
      <View style={styles.subContainerColors}>
        <Pressable
          key="colorRed"
          accessible={true}
          accessibilityLabel="Theme color, red!"
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
          accessible={true}
          accessibilityLabel="Theme color, green!"
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
          accessible={true}
          accessibilityLabel="Theme color, light!"
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
          accessible={true}
          accessibilityLabel="Theme color, blue!"
          style={[styles.colorCircles, styles.colorBlue]}
          onPressOut={() =>
            onChatBgColorChange({
              name: "Blue",
              code: colors.blue,
            })
          }
        ></Pressable>
        <Pressable
          key="colorBlack"
          accessible={true}
          accessibilityLabel="Theme color, dark!"
          style={[styles.colorCircles, styles.colorBlack]}
          onPressOut={() =>
            onChatBgColorChange({
              name: "Black",
              code: colors.black,
            })
          }
        ></Pressable>
      </View>
    </View>
  );
};

export default ColorPicker;
