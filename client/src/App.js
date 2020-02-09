import React, { Component } from "react";
import "./App.css";

function LoggedIn({ user }){
  console.log('logged in user', user)
  return (
    <div>
      <h2>Welcome {user.displayName}!</h2>
      <img src={user.image} alt={user.username} />
      <a href='/logout'>Logout</a> 
    </div>
  )

}

function LoggedOut() {
  return(
    <a href='/auth/github'>Login with GitHub</a>
  )
}
class App extends Component {
  state = {
    currentUser: null
  }

  async componentDidMount() {
    const response = await fetch('/current-user')
    const { currentUser } = await response.json()
    this.setState({ currentUser }, () => console.log('currentUser', currentUser))
  }

  renderContent = () => {
    return ( 
      this.state.currentUser 
      ? <LoggedIn user={this.state.currentUser}/> 
      : <LoggedOut />
    )
  }

  render(){
    return (
      <div className="App">
        {this.renderContent()}
      </div>
    );
  }
}

export default App;
