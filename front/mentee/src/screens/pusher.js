// src/App.js
import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";

function PusherPage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Create a new instance of Pusher with your Pusher Pusher key
    const pusher = new Pusher("20d590a2a5e4500caac1", {
      cluster: "ap2",
    });

    // Subscribe to the 'my-channel' channel and bind to the 'my-event' event
    const channel = pusher.subscribe("my-channel");
    channel.bind("my-event", (data) => {
      console.log("data from pusher:", data);
      setMessage(data.message);
    });

    fetch("http://localhost:5000/api/trigger-event", {
      method: "GET",
    });

    // Clean up the subscription when the component unmounts
    // return () => {
    //   pusher.unsubscribe("my-channel");
    // };
  }, []);

  return (
    <div>
      <h1>Hello from React!</h1>
      <p>Message from the server: {message}</p>
    </div>
  );
}

export default PusherPage;
