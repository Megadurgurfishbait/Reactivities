import React, { useContext, useEffect } from "react";
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
import { RootStoreContext } from "../stores/rootStore";
import { LoadingComponent } from "./LoadingComponent";
import ModalContainer from "../Common/modals/ModalContainer";
import ProfilePage from "../../Features/profiles/ProfilePage";

// Tökum inn Location til að bæta við KEY á ActivityForm
// Gerum það til að reset'a form með því að unmounte'a  component.
// Það gerist þegar key breytist.

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token]);

  if (!appLoaded) return <LoadingComponent content='Loading app' />;

  return (
    <>
      <ModalContainer />
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
                <Route path='/profile/:username' component={ProfilePage} />
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
