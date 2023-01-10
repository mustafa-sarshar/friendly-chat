# (musto) friendly-chat (still under construction)

## WATCH THE DEMO

[YouTube]()

## OBJECTIVES

To build a chat app for mobile devices using React Native. The app will provide users with a chat interface and options to share images and their location.

## THE 5 Ws

1. Who — The users of the mobile chat app. These could be friends, family or other students. The codebase will be used by other developers working on the product.
2. What — A native chat app built with React Native, as well as all the relevant documentation.
3. When — Whenever users of the chat app want to communicate with each other.
4. Where — The app will be optimized for both Android and iOS devices. The Expo will be used to develop the app and Google Firebase to store the chat messages.
5. Why — Mobile chat apps are among the most commonly downloaded and used apps in the world, so knowing how to build a chat app is an indispensable skill. This app will demonstrate the React Native development skills.

## USER STORIES

- As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family.
- As a user, I want to be able to send messages to my friends and family members to exchange the latest news.
- As a user, I want to send images to my friends to show them what I’m currently doing.
- As a user, I want to share my location with my friends to show them where I am.
- As a user, I want to be able to read my messages offline so I can reread conversations at any time.
- As a user with a visual impairment, I want to use a chat app that is compatible with a screen reader so that I can engage with a chat interface.

## KEY FEATURES

- A welcome page where users can select to set/reset their profile and messages, as well as entered their desired chatroom code, and choose a background color for the chat screen before joining the chat.
- A profile page where users can enter their username, select, pick from library, or take a photo for their user avatar and choose a background color for their profile.
- A page displaying the conversation, chatroom code, as well as an input field and submit button.
- The chat must provide users with two additional communication features: sending images and location data.
- Data gets stored online and offline.

## NOTES:

### TECHNOLOGIES USED

- React-Native
- React-Native-Gifted-Chat
- Expo
- Firebase

### HOW TO USE

1. Please, create a configuration file, named ".firebaseConfig.json" in the root directory (where tha App.js file is located), and add all Firebase-related configurations to it, as follows:

```json
{
  "appConfig": {
    "apiKey": "YOUR_FIREBASE_API_KEY",
    "authDomain": "YOUR_FIREBASE_AUTH_DOMAIN",
    "projectId": "YOUR_FIREBASE_PROJECT_ID",
    "storageBucket": "YOUR_FIREBASE_STORAGE_BUCKET",
    "messagingSenderId": "YOUR_FIREBASE_MESSAGING_SENDER_ID",
    "appId": "YOUR_FIREBASE_APP_ID",
    "measurementId": "YOUR_FIREBASE_MEASUREMENT_ID"
  },
  "dbConfig": {
    "collectionName": "YOUR_FIREBASE_DATABASE_COLLECTION_NAME_FOR_ALL_MESSAGES"
  },
  "storageConfig": {
    "bucketURL": "YOUR_FIREBASE_STORAGE_BUCKET_URL_FOR_IMAGES",
    "imageDirectory": "YOUR_FIREBASE_STORAGE_DIRECTORY_NAME_FOR_IMAGES",
    "avatarsDirectory": "YOUR_FIREBASE_STORAGE_DIRECTORY_NAME_FOR_AVATARS"
  }
}
```

2. Add and enable two Indexes for the Collection specified in the collectionName above.
   1. Fields indexed:
      - chatroomCode: Ascending
      - serverReceivedAt: Descending
      - \_\_name\_\_: Descending
   2. Fields indexed:
      - uid: Ascending
      - serverReceivedAt: Descending
      - \_\_name\_\_: Descending
3. Add (create) two folders in the Firebase Storage, one for the images, and one for the user avatars.

   - e.g. 1) images, 2) avatars

4. Upload the three default avatars, provided in the src/assets/img/avatars folder, to the Firebase Storage, created for avatars.
5. Run **npm install** in terminal from the root directory to install all necessary packages and dependencies.
6. Run **npm start** in terminal from the root directory to run the Expo.
7. Follow the instructions provided by the Expo.
8. Enjoy it.

## COPY RIGHTS

### Icons were downloaded from:

- [Avatar Icon](https://undraw.co/illustrations), created by [Katerina Limpitsouni](https://twitter.com/ninaLimpi)

### Background images were downloaded from:

- [unDraw](https://undraw.co/illustrations), created by [Katerina Limpitsouni](https://twitter.com/ninaLimpi)
