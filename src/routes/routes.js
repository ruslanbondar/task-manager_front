import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Users from "../components/Users/Users";
import Home from "../components/Home/Home";

const Routes = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/users" component={Users} />
        </Switch>
      </BrowserRouter>
    </>
  );
};
export default Routes;
