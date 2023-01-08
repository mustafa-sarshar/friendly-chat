const firebaseConfigs = require("../../../.firebaseConfig.json");

const avatarsDefault = {
  female: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfigs.appConfig.storageBucket}/o/avatars%2Favatar_female.png?alt=media&token=5b7ac7a3-c300-4cc0-9a45-27f1e5c13584`,
  male: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfigs.appConfig.storageBucket}/o/avatars%2Favatar_male.png?alt=media&token=07700d51-a4ac-4a06-ad2d-de0007f28546`,
  default: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfigs.appConfig.storageBucket}/o/avatars%2Favatar_default.png?alt=media&token=6a892810-cd29-401d-857e-293c9d068219`,
};

export default avatarsDefault;
