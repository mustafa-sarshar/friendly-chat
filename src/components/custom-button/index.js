import React from "react";
import { View, Pressable, Text } from "react-native";

import styles from "./styles";

const CustomButton = (props) => {
  const {
    onPress,
    colorSettings,
    containerStyle,
    buttonStyle,
    titleStyle,
    titleText,
    buttonHint,
  } = props;
  const { btnBgColor, btnTitleColor } = colorSettings;

  return (
    <View
      style={[
        styles.btnContainer,
        { backgroundColor: `${btnBgColor}20` },
        containerStyle,
      ]}
    >
      <Pressable
        accessible={true}
        accessibilityLabel="button"
        accessibilityHint={buttonHint ? buttonHint : ""}
        style={[styles.btn, { borderColor: btnTitleColor }, buttonStyle]}
        onPress={onPress}
      >
        <Text style={[styles.lblBold, { color: btnTitleColor }, titleStyle]}>
          {titleText ? titleText : "NO TITLE"}
        </Text>
      </Pressable>
    </View>
  );
};

export default CustomButton;
