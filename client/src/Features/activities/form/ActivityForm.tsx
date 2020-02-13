import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { IActivity } from "../../../App/Models/activity";
import { ActivityStore } from "../../../App/stores";
import { observer } from "mobx-react-lite";
import { RouteComponentProps, Link } from "react-router-dom";
import { Routes } from "../../../App/Routes";

interface DetailParams {
  id: string;
}

// Til að switch'a á milli Create og Edit Mode og tæma formið notum við ClearActivity í
// Cleanup function í useEffect. Til að unmount'a breytum við um KEY á þessum
// Component í APP.tsx

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    activity: initFormSate,
    loadActivity,
    clearActivity
  } = activityStore;

  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    description: "",
    category: "",
    date: "",
    city: "",
    venue: ""
  });

  // Tökum ID frá

  useEffect(() => {
    if (match.params.id && activity.id.length === 0)
      loadActivity(match.params.id).then(() => initFormSate && setActivity(initFormSate));
    return () => clearActivity();
  }, [loadActivity, clearActivity, match.params.id, initFormSate, activity.id.length]);

  const handleInputChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      };
      createActivity(newActivity).then(() => history.push(`${Routes.Activities}/${newActivity.id}`));
    } else {
      editActivity(activity).then(() => history.push(`${Routes.Activities}/${activity.id}`));
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <Form onSubmit={handleSubmit}>
            <Form.Input onChange={handleInputChange} name='title' placeholder='Title' value={activity.title} />
            <Form.TextArea
              onChange={handleInputChange}
              name='description'
              rows={2}
              placeholder='Description'
              value={activity.description}
            />
            <Form.Input onChange={handleInputChange} name='category' placeholder='Category' value={activity.category} />
            <Form.Input
              onChange={handleInputChange}
              name='date'
              type='datetime-local'
              placeholder='Date'
              value={activity.date}
            />
            <Form.Input onChange={handleInputChange} name='city' placeholder='City' value={activity.city} />
            <Form.Input onChange={handleInputChange} name='venue' placeholder='Venue' value={activity.venue} />
            <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
            <Button as={Link} to={`${Routes.Activities}`} floated='right' type='button' content='Cancel' />
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
