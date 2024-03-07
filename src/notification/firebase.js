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
    console.log(res);
  } catch (error) {
    alert("please give permission");
    console.error(error);
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

    console.log(res);
    // Handle response
  } catch (error) {
    alert("something went wrong please try again");
    console.error(error);
  }
};
