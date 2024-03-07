<p align="center">
  <img width="620px"src="https://raw.githubusercontent.com/Gapur/firebase-push-notifications/main/src/assets/logo.png">
</p>
## Video of this project
https://drive.google.com/file/d/1Ii0HKr9hT-GOyMqO-pA3nbbFHTe0Btww/view?usp=drive_link
 
# Firebase Push Notifications

Push Notifications With React And Firebase

How to receive push notifications

Push notifications are small pop-up messages sent to a user's device or web app that appear even when the app is not open. They can alert real-time updates or changes to their upcoming plans, bookings, deliveries, and other time-sensitive topics. 

So I'm interested how we can easily add receiving push notifications to our web app. In today's tutorial, I'm going to do it through [Firebase Cloud Messaging (FCM)](https://firebase.google.com/products/cloud-messaging?gclid=Cj0KCQjw4omaBhDqARIsADXULuXjc3usXl7wxVaW_mdNdiv6CLc5p_lCc7Atsz_V6Icjg62Atj5WLmkaAqmKEALw_wcB&gclsrc=aw.ds). It is a cross-platform messaging solution that lets you reliably send messages at no cost.

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

## Create a Simple Web App
After creating the project with the initial codebase, we have the src/App.js file for the main page. We need to update it so it looks like this:

```js
// App.js
import logo from './assets/sparky-dash-high-five.gif';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { ganerateToken } from './notification/firebase';
import { getMessaging, onMessage } from 'firebase/messaging';

function App() {
  const [notificationData, setNotificationData] = useState({
    title: '',
    body: '',
    imageUrl: '',
  
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotificationData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    ganerateToken(notificationData);
  };

  useEffect(() => {
    onMessage(getMessaging, (payload) => {
      console.log(payload);
      
    });
  }, []);

const handlepermision = async()=>{
  
 const permision = await  Notification.requestPermission();
 if(permision === 'granted'){
  console.log("granted");
 }else{
  console.log("not granted");
 }

}

  return (
    <div className="App">
     <img src={logo} className="app-logo" alt="logo"  width="400px" height="500px"/>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" value={notificationData.title} onChange={handleChange} />
        <input type="text" name="body" placeholder="Body" value={notificationData.body} onChange={handleChange} />
        <input type="text" name="imageUrl" placeholder="Image URL" value={notificationData.imageUrl} onChange={handleChange} />
        
        <button type="submit">Send Notification</button>
        <button onClick={handlepermision}>allow notification</button>
      </form>
     
    </div>
  );
}

export default App;



 

## HERE ITS LOOK LIKE

<img width="835" alt="example1" src="https://github.com/Dipanshu-verma/firebase-push-notification/assets/128663583/72934a98-5532-46a9-8471-49bbf4edf5ac">



## Firebase Setup

If you don’t already have an account at [Firebase](https://firebase.google.com) yet, you should create one. After successfully creating an account, you will be redirected to [Firebase Console](https://console.firebase.google.com) where you can create a project by clicking the Create a project button and filling in the required fields.

If you have created a project before, you will have a list of project cards. In this case, you need to click `Add project` to create a new one.


 
 <img width="835" alt="example1" src="https://github.com/Dipanshu-verma/firebase-push-notification/assets/128663583/95bad52e-3003-46da-8c6e-5a3ffae5b853">
 

After clicking `Add project`, we need to give the project an appropriate name.

 <img width="835" alt="example1" src="https://github.com/Dipanshu-verma/firebase-push-notification/assets/128663583/87d78a4b-db77-4cf2-bb58-8278c5eb921a">


Then we have to enable or disable analytics depending on your preference.

<img width="835" alt="example1" src="https://github.com/Dipanshu-verma/firebase-push-notification/assets/128663583/7e092afa-8596-497b-bf4a-50298362f0ac">

Awesome, we have done it. Here we have `iOS`, `Android`, and `<>` web options.

<img width="835" alt="example1" src="https://github.com/Dipanshu-verma/firebase-push-notification/assets/128663583/92e27556-5093-4786-91d9-1ddb4f303cba">

Next, we need to register our web app with the firebase project by clicking on the web option `<>` button. It will then generate a firebase config file which we will soon integrate into the React app.

<img width="835" alt="example1" src="https://github.com/Dipanshu-verma/firebase-push-notification/assets/128663583/a911fc01-45d8-4f87-b353-07a592127d8b">

Let’s use the `firebase-push-notifications` nickname.

 
<img width="772" alt="example7" src="https://github.com/Dipanshu-verma/firebase-push-notification/assets/128663583/b50159b9-fb3f-4b5f-a561-d5ddb0290e44">

The `firebaseConfig` will be integrated into our React app, which will link it to this particular Firebase project.

## Connect to Firebase Cloud Messaging

To connect to `Firebase Cloud Messaging` we need to install the [firebase](https://www.npmjs.com/package/firebase) lib by running:

```
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


Last but not least, we’ll create a function called `getFirebaseToken` that uses the Firebase `getToken` method. This allows you to receive push notifications. If notification permission has not been granted, this method will request the user for permission to notification. Otherwise, it returns the token or rejects the promise due to an error.

The `getToken` method requires parameters.

1. Voluntary Application Server Identification or VAPID key

You can get by clicking `Project overview > Project settings > Cloud Messaging` for your project in the Firebase Console, then scroll to the `Web configuration` section. After that, you can just click on `Generate key pair` in the `Web Push certificates` tab.

 
<img width="772" alt="example7" src="https://github.com/Dipanshu-verma/firebase-push-notification/assets/128663583/82411705-02a6-45c9-9832-acbb3a44d1b7">

2. serviceWorkerRegistration

We will use a service worker to work with push notifications. Service worker is a script that works in the background of the browser without user interaction. We don’t have a [service worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers) right now, but we’ll create one in the next section.

```js

export const ganerateToken = async (notificationData) => {
   
  let permission = Notification.permission;

   
  if (permission !== "granted") {
    permission = await Notification.requestPermission();
    if (permission !== "granted") {
     
      console.log("Notification permission denied.");
      return;
    }
  }


  const token = await getToken(messaging, {
    vapidKey:
      "BJg4xH49f04vbw4Ssw1-NPfST1b6IhL3LJDuqLV2_VZDac8icey0O5b0A7Tgb-N58VdBYh52dvwpsbyl0KS09Ro",
  });

 


let message = {
  to:token,
  notification:{
    title: notificationData.title,
    body: notificationData.body,
    
  }
}
 


try {
  let res = await fetch("https://fcm.googleapis.com/fcm/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `key= AAAA5w3H21I:APA91bGybyMHxhFtgrmQW0hQDZkrMELWndMhHQuoVjqwAHEkR4qfJcmmNVRVIh5D9Lh9I1ZILTVmnfZcy3asEh5egO62e2k7QzQSRPR7gg5ZTBfSOvgwYDswgIqSnQwWZ04HnwtyB94J` 
    },

    
    body: JSON.stringify(message)

    
  });


 

 
  // Handle response
} catch (error) {
  console.error(error);
}





  try {
    let res = await fetch("https://push-notification-yht6.onrender.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token,
      },
    });
    // Handle response
  } catch (error) {
    console.error(error);
  }



};





```

Above, I created a `getOrRegisterServiceWorker` method to try and get the service worker if it exists, otherwise it will register a new one.

Also, I’m going to add a banner at the top of the page to show permission for the notification.

```js

import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import logo from './sparky-dash-high-five.gif';
import { getFirebaseToken } from './firebase';

export default function App() {
  const [showNotificationBanner, setShowNotificationBanner] = useState(Notification.permission === 'default');

  const handleGetFirebaseToken = () => {
    getFirebaseToken()
      .then((firebaseToken) => {
        console.log('Firebase token: ', firebaseToken);
        if (firebaseToken) {
          setShowNotificationBanner(false);
        }
      })
      .catch((err) => console.error('An error occured while retrieving firebase token. ', err))
  }
  
  const ToastifyNotification = ({ title, body }) => (
    <div className="push-notification">
      <h2 className="push-notification-title">{title}</h2>
      <p className="push-notification-text">{body}</p>
    </div>
  );

  return (
    <div className="app">
      {showNotificationBanner && <div className="notification-banner">
        <span>The app needs permission to</span>
        <a
          href="#"
          className="notification-banner-link"
          onClick={handleGetFirebaseToken}
        >
          enable push notifications.
        </a>
      </div>}

      <img src={logo} className="app-logo" alt="logo" />

      <button
        className="btn-primary"
        onClick={() => toast(<ToastifyNotification title="New Message" body="Hi there!" />)}
      >
        Show toast notification
      </button>

      <ToastContainer hideProgressBar />
    </div>
  );
}
```

We checked `Notification.permission` property which indicates the current permission granted by the user to display web notifications. If we click `enable push notifications` it will get a firebase token and hide the banner.

Cool, we are almost done.

<img width="828" alt="example9" src="https://github.com/Dipanshu-verma/Agriculture-Farm-Template/assets/128663583/88b801c0-2dc8-42e0-95a8-9f5b85c6f0b0">

# Receive Push Notifications

## Receive messages in the background

In order to receive push notifications in the background, we should create a `firebase-messaging-sw.js` service worker file in the public folder of our React app with the following code:

```js
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyB1Dny2lUB65CXk_FCF7vwG8mq_OwI60ys",
    authDomain: "push-edbf5.firebaseapp.com",
    projectId: "push-edbf5",
    storageBucket: "push-edbf5.appspot.com",
    messagingSenderId: "992368646994",
    appId: "1:992368646994:web:116eb7eac561ee0ec1f88b",
  });

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.image
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });

```

This service worker will handle all notifications coming to the app while it is in the background.

## Receive messages in the foreground

For foreground notifications, we need to add this code to the `firebase.js` file:

```js

import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

 
const firebaseConfig = {
  apiKey: "AIzaSyB1Dny2lUB65CXk_FCF7vwG8mq_OwI60ys",
  authDomain: "push-edbf5.firebaseapp.com",
  projectId: "push-edbf5",
  storageBucket: "push-edbf5.appspot.com",
  messagingSenderId: "992368646994",
  appId: "1:992368646994:web:116eb7eac561ee0ec1f88b",
};


 
const app = initializeApp(firebaseConfig);

 
const messaging = getMessaging(app);

```

Last, We need to use `onForegroundMessage` in `App.js` file:

```js
useEffect(() => {
    onForegroundMessage()
      .then((payload) => {
        console.log('Received foreground message: ', payload);
        const { notification: { title, body } } = payload;
        toast(<ToastifyNotification title={title} body={body} />);
      })
      .catch(err => console.log('An error occured while retrieving foreground message. ', err));
  }, []);
```

Now we are all set to receive both foreground and background notifications in our React app!

## Let’s Test Our Push Notifications

We can test by going to the `Firebase Console > Cloud Messaging > Send First Message`.
```

<img width="828" alt="example10" src="https://github.com/Dipanshu-verma/firebase-push-notification/assets/128663583/7cdd04cf-b3f7-4151-9b1f-6479a52b97e7">

```
<img width="828" alt="example11" src="https://github.com/Dipanshu-verma/firebase-push-notification/assets/128663583/ab590df7-9d50-4b2f-8426-2847f506dfda">


 ```
<img width="828" alt="example12" src="https://github.com/Dipanshu-verma/firebase-push-notification/assets/128663583/a37756cf-0438-4bf6-acf0-f05ca9a55840">

 ```
<img width="835" alt="demo" src="https://github.com/Dipanshu-verma/Agriculture-Farm-Template/assets/128663583/e4a705c9-180e-4871-9486-55309e1d459b">

# Conclusion

Thanks for reading — I hope you found this piece useful. Happy coding!

## Article on Medium

[Push Notifications With React And Firebase](https://javascript.plainenglish.io/push-notifications-with-react-and-firebase-8f7cf9372ac7)

## How to contribute?

1. Fork this repo
2. Clone your fork
3. Code 🤓
4. Test your changes
5. Submit a PR!
