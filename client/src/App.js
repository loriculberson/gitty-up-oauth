import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // const [content, setContent] = useState("");

  // useEffect(() => {
  //   fetch("/foo.json").then(response => {
  //     response.json().then(body => {
  //       setContent(JSON.stringify(body));
  //     });
  //   });
  // }, []);
  function loginGithub () {
    console.log('hii!!!!!')


  }

  return (
    <div className="App">
      <a href='/auth/github'>Login with GitHub</a>
    </div>
  );
}

export default App;
