import React, { useEffect } from 'react'
import './App.css';
import Header from './Components/Header/Header';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './Components/Home/Home';
import Auth from './Components/Auth/Auth'
import { auth } from './Firebase';
import { connect } from 'react-redux'
import Profile from './Components/Profile/Profile';

function App(props) {

  useEffect(() => {
   const unsubscribe =  auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        props.addUser(authUser)
      } else {
        props.addUser(null)
      }
    })
    return () => {
     unsubscribe()
    }
  },[props])


  return (
    <div className="App">
      <Router>
        <Route path="/">
          {props.user && <Header user={props.user}/> }
        </Route>
        <Switch>
          {props.user ?  
            <Route path="/profile">
              <Profile />
            </Route> : <Auth />}
          <Route path="/">
            {props.user ?  <Home /> : <Auth /> }
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatch = Dispatch => {
  return {
    addUser: (user) => Dispatch({type: 'ADD_USER', user: user}) 
  }
}



export default connect(mapStateToProps, mapDispatch)(App);
