# Firebase Push Notifications
 
The Firebase notification system is a real-time messaging solution built using Node.js, React, Express.js, MongoDB, and Tailwind CSS. It enables users to send push notifications to specific tokens or multiple tokens stored in MongoDB, with a user-friendly interface developed in React and styled using Tailwind CSS. The backend, powered by Node.js and Express.js, handles API requests, interacts with Firebase Cloud Messaging for notification delivery, and manages token storage in MongoDB using Mongoose. Users are prompted to grant notification permissions upon opening the app, ensuring timely delivery of notifications even when the app is inactive. Secure practices are implemented to safeguard sensitive data, and error handling mechanisms ensure system stability and reliability. Overall, the system provides an efficient and reliable means of communication, enhancing user engagement and interaction within the application.

## Video of this project
https://drive.google.com/file/d/1zulF328zlbnj2dKFZ5_zJX5v7fki4w-V/view?usp=sharing


## The home page looks like it

<p align="center">
  <img width="620px"src="https://github.com/Dipanshu-verma/firebase-push-notification/assets/128663583/607be723-a2ae-4671-839a-ad964c7c751f">
</p>


## Prompt For Asking for Notification 

<p align="center">
  <img width="620px"src="https://github.com/Dipanshu-verma/firebase-push-notification/assets/128663583/d30ac38b-5f0d-439c-8fb8-80ee39fe4d84">
</p>



## The Notification in my pc looks like this  which is comming from firebase after sending from the ui
 Upon opening the application, users are prompted to grant permission for receiving notifications. This notification prompt ensures that users are aware of the app's intention to send them notifications. By granting permission, users allow the app to deliver notifications even when it's not active, ensuring timely updates and alerts. The notification prompt is a crucial part of the user experience, providing transparency and control over notification preferences.

<p align="center">
  <img width="620px"src="https://github.com/Dipanshu-verma/firebase-push-notification/assets/128663583/d5d9366b-4ead-4d1b-93c0-534cf3051171">
</p>


 const requestNotificationPermission = async () => {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        ganerateTokenforcurrentuser();

        onMessage(messaging, (payload) => {
          console.log("[firebase-messaging-sw.js] Received message", payload);
          if (payload.notification) {
            const { title, body, image } = payload.notification;
            const notificationOptions = {
              body,
              icon: image,
            };
            new Notification(title, notificationOptions);
          } else {
            console.log("Payload does not contain a notification object");
          }
        });
      } else {
        console.log("Notification permission denied.");
      }
    };

    requestNotificationPermission();





## Firebase Setup 
<p align="center">
  <img width="620px"src="https://raw.githubusercontent.com/Gapur/firebase-push-notifications/main/src/assets/logo.png">
</p>

Go to the Firebase website and sign in with your Google account.
Click on "Go to Console" to access the Firebase console.
Click on the "Add project" button to create a new Firebase project.

<p align="center">
  <img width="620px"src="https://github.com/Dipanshu-verma/firebase-push-notification/assets/128663583/878f378f-fed0-4eaa-9c87-51bd0aee38c1">
</p>

Enter a name for your project and click "Continue".
<p align="center">
  <img width="620px"src="https://github.com/Dipanshu-verma/firebase-push-notification/assets/128663583/7491b3d5-7053-4b4d-8afc-93833d913c49">
</p>


now your project is ready you will get config here you have to copy it and create a firebase app in your firebase.js
for background notification paste is on firebase-messaging-sw.fil
<p align="center">
  <img width="620px"src="https://github.com/Dipanshu-verma/firebase-push-notification/assets/128663583/41623e53-81ea-44fd-ab40-03c75fc05f80">
</p>

npm install --save firebase
```

Next, I will create a new file called `firebase.js` and add the following lines of code:

```js

import { initializeApp } from 'firebase/app';
import { getToken, getMessaging, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

 

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);
```


now go to the setting of your project

<p align="center">
  <img width="620px"src="https://github.com/Dipanshu-verma/firebase-push-notification/assets/128663583/6eb936d1-ccb1-484a-8b90-ef633c21c5c4">
</p>





Last but not least, we’ll create a function called `ganerateTokenforcurrentuser` that uses the Firebase `getToken` method. This allows you to receive push notifications. If notification permission has not been granted, this method will request the user for permission to notification. Otherwise, it returns the token or rejects the promise due to an error.

The `getToken` method requires parameters.

1. Voluntary Application Server Identification or VAPID key

You can get by clicking `Project overview > Project settings > Cloud Messaging` for your project in the Firebase Console, then scroll to the `Web configuration` section. After that, you can just click on `Generate key pair` in the `Web Push certificates` tab.

 
npm install firebase-admin

 now for creating send notification post we have to go service account tab in this we have node js configration and generate new privet key you wil get a json file paste it in you backend and chnage the path of configration with your actual json file  path  


<p align="center">
  <img width="620px"src="https://github.com/Dipanshu-verma/firebase-push-notification/assets/128663583/fc73a66e-8946-4145-8590-6090a9944501">
</p>








 




 

## Getting Started

1. Clone this repository
```
git clone https://github.com/Dipanshu-verma/push-notification-front.git
```
2. Install dependencies
```
npm install
```
3. Launch app
```
npm run start # for npm
```

or if you want to create

First, I’m going to create a new React project through the following lines of code:

```sh
npx create-react-app firebase-push-notifications
cd firebase-push-notifications
npm run start
```

Great, we’ve successfully created and launched our web app.
 