import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/foo.json").then(response => {
      response.json().then(body => {
        setContent(JSON.stringify(body));
      });
    });
  }, []);

  return (
    <div className="App">
      {content}
    </div>
  );
}

export default App;
