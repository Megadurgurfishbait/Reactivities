import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivitiyList from "./ActivityList";
import { observer } from "mobx-react-lite";
import { LoadingComponent } from "../../../App/layout/LoadingComponent";
import { RootStoreContext } from "../../../App/stores/rootStore";

const ActivityDashboard: React.FC = () => {
  const RootStore = useContext(RootStoreContext);
  const { loadActivities, loadingInitial } = RootStore.activityStore;
  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  if (loadingInitial) return <LoadingComponent content={"Loading Activities..."} />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivitiyList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Activity filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
