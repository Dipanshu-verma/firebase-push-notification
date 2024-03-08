// App.js
import logo from "./assets/sparky-dash-high-five.gif";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import {
  ganerateToken,
  ganerateTokenforcurrentuser,
  messaging,
  sendNotificationonmultipal,
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
  const[multiData, setmultiData]  =  useState({
    title:"",
    body:"",
    imageUrl:"",
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotificationData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeformultidata = (e) => {
    const { name, value } = e.target;
    setmultiData((prevState) => ({
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

  const handleSubmitformultipal = async (e) => {
    e.preventDefault();
    
    sendNotificationonmultipal(multiData);
  };



  console.log(multiData);

  return (
    <div className="App bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">
        Firebase Notification Push System
      </h1>

      <div className="w-[80%] text-center flex justify-around items-center ">
        <div className="p-8 bg-white rounded shadow-lg w-[40%]">
          <h1 className="text-3xl font-bold mb-6">
            Send Notification using Token
          </h1>
          <img
            src={logo}
            className="mx-auto mb-6"
            alt="logo"
            width="200px"
            height="250px"
          />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="token"
              placeholder="Token"
              className="block w-full border border-gray-300 rounded p-2 mb-3 focus:border-blue-500 focus:outline-none"
              value={notificationData.token}
              onChange={handleChange}
            />
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="block w-full border border-gray-300 rounded p-2 mb-3 focus:border-blue-500 focus:outline-none"
              value={notificationData.title}
              onChange={handleChange}
            />
            <input
              type="text"
              name="body"
              placeholder="Body"
              className="block w-full border border-gray-300 rounded p-2 mb-3 focus:border-blue-500 focus:outline-none"
              value={notificationData.body}
              onChange={handleChange}
            />
            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              className="block w-full border border-gray-300 rounded p-2 mb-3 focus:border-blue-500 focus:outline-none"
              value={notificationData.imageUrl}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Send Notification
            </button>
          </form>
        </div>

        <div className=" p-8 bg-white rounded shadow-lg w-[40%]">
          <h1 className="text-3xl font-bold mb-6">
            Send Notification using Stored Token
          </h1>
          <img
            src={logo}
            className="mx-auto mb-6 text-center"
            alt="logo"
            width="200px"
            height="250px"
          />
          <form  onSubmit={handleSubmitformultipal}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="block w-full border border-gray-300 rounded p-2 mb-3 focus:border-blue-500 focus:outline-none"
              value={multiData.title}
             onChange={handleChangeformultidata}
            />
            <input
              type="text"
              name="body"
              placeholder="Body"
              className="block w-full border border-gray-300 rounded p-2 mb-3 focus:border-blue-500 focus:outline-none"
              value={multiData.body}
              onChange={handleChangeformultidata}
            />
            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              className="block w-full border border-gray-300 rounded p-2 mb-3 focus:border-blue-500 focus:outline-none"
              value={multiData.imageUrl}
              onChange={handleChangeformultidata}
            />

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Send Notification
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
