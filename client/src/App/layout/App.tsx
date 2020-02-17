import React from "react";
import { observer } from "mobx-react-lite";
import NavBar from "../../Features/nav/navbar";
import { ToastContainer } from "react-toastify";

import { Route, withRouter, RouteComponentProps, Switch } from "react-router-dom";
// Styles
import { AppContainer, MyGlobalStyle } from "./app.styled";
import ActivityDashboard from "../../Features/activities/dashboard/ActivityDashboard";

import { HomePage } from "../../Features/home";
import ActivityForm from "../../Features/activities/form/ActivityForm";
import ActivityDetails from "../../Features/activities/Details/ActivityDetails";
import { Routes } from "../Routes";
import NotFound from "./NotFound";

// Tökum inn Location til að bæta við KEY á ActivityForm
// Gerum það til að reset'a form með því að unmounte'a  component.
// Það gerist þegar key breytist.

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <>
      <ToastContainer position='bottom-right' />
      <MyGlobalStyle />
      <Route exact path={`${Routes.Home}`} component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <AppContainer>
              <Switch>
                <Route path={`${Routes.Activities}/:id`} component={ActivityDetails} />
                <Route exact path={`${Routes.Activities}`} component={ActivityDashboard} />
                <Route
                  key={location.key}
                  path={[`${Routes.CreateActivity}`, `${Routes.Edit}/:id`]}
                  component={ActivityForm}
                />
                <Route component={NotFound} />
              </Switch>
            </AppContainer>
          </>
        )}
      />
    </>
  );
};

export default withRouter(observer(App));
