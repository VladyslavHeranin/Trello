import React, { useEffect } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Registration } from "./components/registration-and-login/registration.jsx"
import { Login } from "./components/registration-and-login/Login.jsx"
import { Header } from "./components/navigation-and-search-components/header.jsx"
import "materialize-css"
import { useDispatch, useSelector } from "react-redux"
import { Auth } from "./actions/user"
import { Trello } from "./components/lists/trello"
import { CreateList } from "./components/navigation-and-search-components/createList"
import { useState } from "react"

function App() {
  const dispatch = useDispatch()

  const isAuth = useSelector(state => state.user.isAuth)


  return (
    <BrowserRouter>
      <div className="container" >
        <Header />
        {!isAuth ?
          <Switch>
            <Route exact path={"/registartion"} component={Registration} />
            <Route exact path={"/login"} component={Login} />
          </Switch>
          :
          <Switch>
            <Route exact path={"/trello"} >
              <Trello  />
            </Route>
            <Route exact path={"/createList"}  >
              <CreateList />
            </Route>
          </Switch>
        }
      </div>
    </BrowserRouter >
  );
}

export default App;
