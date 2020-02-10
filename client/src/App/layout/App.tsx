import React, { useState, useEffect } from "react";
import axios from "axios";
import { IActivity } from "../Models/activity";
import { NavBar } from "../../Features/nav/navbar";

// Styles
import { AppContainer, MyGlobalStyle } from "./app.styled";
import { ActivityDashboard } from "../../Features/activities/dashboard/ActivityDashboard";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleSelectedActivity = (id: string) => {
    setSelectedActivity(activities.filter(v => v.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {
    setActivities([...activities, activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  };

  const handleEditActivity = (activity: IActivity) => {
    setActivities([...activities.filter(a => a.id !== activity.id), activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  };

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter(activity => activity.id !== id)]);
    setSelectedActivity(null);
    setEditMode(false);
  };

  useEffect(() => {
    axios.get<IActivity[]>("http://localhost:5000/api/activities").then(res => {
      let activities: IActivity[] = [];
      res.data.forEach(activity => {
        activity.date = activity.date.split(".")[0];
        activities.push(activity);
      });
      setActivities(activities);
    });
  }, []);

  return (
    <>
      <MyGlobalStyle />
      <NavBar openCreateForm={handleOpenCreateForm} />
      <AppContainer>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectedActivity}
          selectedActivity={selectedActivity} // ! fyrir aftan selectedActivity myndi segja Typescript að við vitum hvað við erum að gera og þetta verður annaðhvort Activity eða Null.
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </AppContainer>
    </>
  );
};

export default App;
