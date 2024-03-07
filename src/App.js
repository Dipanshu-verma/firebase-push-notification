// App.js
import logo from "./assets/sparky-dash-high-five.gif";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import {
  ganerateToken,
  ganerateTokenforcurrentuser,
  messaging,
} from "./notification/firebase";
// import { getMessaging } from "firebase/messaging";
import { onMessage } from "firebase/messaging";
function App() {
  const [notificationData, setNotificationData] = useState({
    title: "",
    body: "",
    imageUrl: "",
    token: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotificationData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    ganerateToken(notificationData);
  };

  useEffect(() => {
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
  }, []);

  console.log(notificationData);

  return (
    <div className="App">
      <img
        src={logo}
        className="app-logo"
        alt="logo"
        width="400px"
        height="500px"
      />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="token"
          placeholder="token"
          value={notificationData.token}
          onChange={handleChange}
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={notificationData.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="body"
          placeholder="Body"
          value={notificationData.body}
          onChange={handleChange}
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={notificationData.imageUrl}
          onChange={handleChange}
        />

        <button type="submit">Send Notification</button>
      </form>
    </div>
  );
}

export default App;
