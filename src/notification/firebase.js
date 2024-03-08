import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);

export const ganerateTokenforcurrentuser = async () => {
  const token = await getToken(messaging, {
    vapidKey:
      "BJg4xH49f04vbw4Ssw1-NPfST1b6IhL3LJDuqLV2_VZDac8icey0O5b0A7Tgb-N58VdBYh52dvwpsbyl0KS09Ro",
  });

  console.log("your current token ", token);

  try {
    let res = await fetch("https://push-notification-yht6.onrender.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token,
      },
    });
  } catch (error) {
    console.error(error);
  }
};



export const sendNotificationonmultipal = async (multiData) => {
  try {
    let tokens = await fetch(
      "https://push-notification-yht6.onrender.com/tokens"
    );
    tokens = await tokens.json();
    tokens.forEach(async (elm) => {
      const obj = {
        token: elm.token,
        title: multiData.title,
        body: multiData.body,
        imageUrl: multiData.imageUrl,
      };

      await ganerateToken(obj);
    });
  } catch (error) {
    console.error(error.data.error);
  }
};


export const ganerateToken = async (notificationData) => {
  let message = {
    token: notificationData.token,
    title: notificationData.title,
    body: notificationData.body,
    imageUrl: notificationData.imageUrl,
  };
  try {
    let res = await fetch(
      "https://push-notification-yht6.onrender.com/sendNotification",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(message),
      }
    );

    if (res.status === 200) {
      console.log("Notification sent sucessfully");
    }
    // Handle response
  } catch (error) {
    alert("something went wrong please try again");
    console.error(error);
  }
};
