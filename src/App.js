import React, { useEffect, useState } from 'react'
import './App.css';
import Header from './Components/Header/Header';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './Components/Home/Home';
import Auth from './Components/Auth/Auth'
import { auth } from './Firebase';

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
   const unsubscribe =  auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        setUser(authUser)
      } else {
        setUser(null)
      }
    })
    return () => {
     unsubscribe()
    }
  },[user])


  return (
    <div className="App">
      <Router>
        <Header user={user} />
        <Switch>
          <Route path="/">
            {
              user ? 
                <Home user={user}/>
              :
              <Auth />
            }
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
