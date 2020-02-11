import React from "react";
import { Route, Switch } from "react-router-dom";
import Users from "../components/Users/Users";
import Home from "../components/Home/Home";
import Profile from '../components/Profile/Profile';

const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/users" component={Users} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </>
  );
};
export default Routes;
