import React, { Component } from "react";
import { View, Image, Text } from "react-native";

import CustomButton from "../custom-button";
import AvatarButton from "../avatar-button";

import { AVATARS_DEFAULT } from "../../assets/data";
import styles from "./styles";

class UserAvatar extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    const {
      userAvatar,
      colorSettings,
      onPressPickImage,
      onPressTakePhoto,
      onPressPickAvatar,
    } = this.props;
    const { btnTitleColor, btnBgColor } = colorSettings;

    return (
      <View style={styles.subContainer}>
        <View style={styles.imgContainer}>
          <View style={{ backgroundColor: `${btnBgColor}10`, padding: 10 }}>
            <Text style={[styles.lblBold, { color: btnTitleColor }]}>
              Profile Photo
            </Text>
          </View>
          <Image
            source={{ uri: userAvatar }}
            style={[styles.img, { borderColor: btnTitleColor }]}
          />
        </View>
        <View style={styles.btnWrapper}>
          <View>
            <CustomButton
              onPress={onPressPickImage}
              containerStyle={{ borderRadius: 8 }}
              buttonStyle={{ margin: 1 }}
              colorSettings={{ btnBgColor, btnTitleColor }}
              titleText="Pick an Image"
              buttonHint="Pick an image from your library"
            />
          </View>
          <View>
            <CustomButton
              containerStyle={{ borderRadius: 8 }}
              buttonStyle={{ margin: 1 }}
              onPress={onPressTakePhoto}
              colorSettings={{ btnBgColor, btnTitleColor }}
              titleText="Take a Photo"
              buttonHint="Take a photo for your profile"
            />
          </View>
        </View>
        <View style={styles.btnWrapper}>
          <View>
            <AvatarButton
              onPress={() => onPressPickAvatar(AVATARS_DEFAULT.male)}
              colorSettings={{ btnBgColor, btnTitleColor }}
              imageUri={AVATARS_DEFAULT.male}
              buttonHint="Set profile photo male avatar"
            />
          </View>
          <View>
            <AvatarButton
              onPress={() => onPressPickAvatar(AVATARS_DEFAULT.default)}
              colorSettings={{ btnBgColor, btnTitleColor }}
              imageUri={AVATARS_DEFAULT.default}
              buttonHint="Set profile photo default avatar"
            />
          </View>
          <View>
            <AvatarButton
              onPress={() => onPressPickAvatar(AVATARS_DEFAULT.female)}
              colorSettings={{ btnBgColor, btnTitleColor }}
              imageUri={AVATARS_DEFAULT.female}
              buttonHint="Set profile photo female avatar"
            />
          </View>
        </View>
      </View>
    );
  };
}

export default UserAvatar;
