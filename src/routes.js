import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Logon from "./pages/Logon";
import Register from "./pages/Register";
import Investments from "./pages/Investments";
import NewInvestment from "./pages/NewInvestment";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/register" component={Register} />
        <Route path="/investments/:id" component={Investments} />
        <Route path="/newInvestment" component={NewInvestment} />
      </Switch>
    </BrowserRouter>
  );
}
