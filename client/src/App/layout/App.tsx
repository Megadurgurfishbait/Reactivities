import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import NavBar from "../../Features/nav/navbar";
import ActivityStore from "../stores/activityStore";

// Styles
import { AppContainer, MyGlobalStyle } from "./app.styled";
import ActivityDashboard from "../../Features/activities/dashboard/ActivityDashboard";
import { LoadingComponent } from "./LoadingComponent";

const App = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) return <LoadingComponent content={"Loading Activities..."} />;

  return (
    <>
      <MyGlobalStyle />
      <NavBar />
      <AppContainer>
        <ActivityDashboard />
      </AppContainer>
    </>
  );
};

export default observer(App);
