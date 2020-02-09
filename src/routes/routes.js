import React from "react";
import { Route, Switch } from "react-router-dom";
import Users from "../components/Users/Users";
import Home from "../components/Home/Home";

const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/users" component={Users} />
      </Switch>
    </>
  );
};
export default Routes;
