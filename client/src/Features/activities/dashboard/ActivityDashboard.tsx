import React from "react";
import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../App/Models/activity";
import { ActivitiyList } from "./ActivityList";
import { ActivityDetails } from "../Details/ActivityDetails";
import { ActivityForm } from "../form/ActivityForm";

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
  selectedActivity: IActivity | null;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
}

export const ActivityDashboard: React.FC<IProps> = ({
  activities,
  selectActivity,
  selectedActivity,
  editMode,
  setEditMode,
  setSelectedActivity,
  createActivity,
  editActivity,
  deleteActivity
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivitiyList activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity} />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetails
            setSelectedActivity={setSelectedActivity}
            setEditMode={setEditMode}
            activity={selectedActivity}
          />
        )}
        {editMode && (
          <ActivityForm
            key={(selectedActivity && selectedActivity.id) || 0} // Ef að við setjum key sem ID og gerum nýtt Form þá breytist KEY og veldur RE-Render
            activity={selectedActivity}
            setEditMode={setEditMode}
            editActivity={editActivity}
            createActivity={createActivity}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};
