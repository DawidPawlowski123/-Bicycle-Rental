import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import NoMatch from "./components/NoMatch";
import CreateUser from "./components/CreateUser"
import ShowUser from "./components/ShowUser";
import Login from "./components/Login";
import Profile from "./components/Profile";
import CreateEquipment from "./components/CreateEquipment";
import ShowEquipment from "./components/ShowEquipment"
import ClientOption from "./components/ClientOption";
import EquipmentOption from "./components/EquipmentOption";
import ClientDetails from "./components/ClientDetails"
import EquipmentDetails from "./components/EquipmentDetails";

import "./custom.scss";




function App() {

  return (
    <>
      <Router>
        <Header/>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/CreateUser" component={CreateUser} />
                  <Route exact path="/EquipmentDetails" component={EquipmentDetails} />
                  <Route exact path="/CreateEquipment" component={CreateEquipment} />
                  <Route exact path="/ClientOption" component={ClientOption} />
                  <Route exact path="/ShowUser" component={ShowUser} />
                  <Route exact path="/ShowEquipment" component={ShowEquipment} />
                  <Route exact path="/EquipmentOption" component={EquipmentOption} />
                  <Route exact path="/ClientDetails" component={ClientDetails} />
                  <Route exact path="/profile" component={Profile} />
                  <Route exact path="/login" component={Login} />
                  <Route component={NoMatch} />
                </Switch>
      </Router>
    </>
  );
}

export default App;
