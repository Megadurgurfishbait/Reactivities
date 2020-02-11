import React, { useState, FormEvent, useContext } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { IActivity } from "../../../App/Models/activity";
import { ActivityStore } from "../../../App/stores";
import { observer } from "mobx-react-lite";

interface IProps {
  activity: IActivity | undefined;
}

const ActivityForm: React.FC<IProps> = ({ activity: initFormSate }) => {
  const activityStore = useContext(ActivityStore);
  const { createActivity, editActivity, submitting, cancelFormOpen } = activityStore;
  const initForm = () => {
    if (initFormSate) {
      return initFormSate;
    } else {
      return {
        id: "",
        title: "",
        description: "",
        category: "",
        date: "",
        city: "",
        venue: ""
      };
    }
  };

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
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  const [activity, setActivity] = useState<IActivity>(initForm);
  return (
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
        <Button onClick={cancelFormOpen} floated='right' type='button' content='Cancel' />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
