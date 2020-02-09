import React from "react";
import "./App.css";

function LoggedIn(){
  return <a href='/logout'>Logout</a> 
}

function LoggedOut() {
  return(
    <a href='/auth/github'>Login with GitHub</a>
  )
}
function App() {
  const message = false ? <LoggedIn /> : <LoggedOut />


  return (
    <div className="App">
      {message}
    </div>
  );
}

export default App;
