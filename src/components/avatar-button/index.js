import React from "react";
import { View, Pressable, Image } from "react-native";

import styles from "./styles";

const AvatarButton = (props) => {
  const {
    onPress,
    colorSettings,
    containerStyle,
    buttonStyle,
    imageStyle,
    imageUri,
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
        <Image
          source={{ uri: imageUri }}
          style={[styles.imgAvatar, imageStyle]}
        />
      </Pressable>
    </View>
  );
};

export default AvatarButton;
