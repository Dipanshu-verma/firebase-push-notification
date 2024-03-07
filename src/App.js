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
     <img src={logo} className="app-logo" alt="logo" />
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
