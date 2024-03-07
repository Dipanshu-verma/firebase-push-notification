
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



