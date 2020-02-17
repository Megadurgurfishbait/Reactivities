import React, { useState, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { ActivityFormValues } from "../../../App/Models/activity";
import { ActivityStore } from "../../../App/stores";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { Routes } from "../../../App/Routes";
import { Form as FinalForm, Field } from "react-final-form";
import { TextInput } from "../../../App/Common/form/TextInput";
import { TextAreaInput } from "../../../App/Common/form/TextAreaInput";
import { SelectInput } from "../../../App/Common/form/SelectInput";
import { category } from "../../../App/Common/options/categoryOptions";
import { DateInput } from "../../../App/Common/form/DateInput";
import { combineDateAndTime } from "../../../App/Common/Util/Util";
import { combineValidators, isRequired, hasLengthGreaterThan, composeValidators } from "revalidate";

const validate = combineValidators({
  title: isRequired({ message: "This event titile is required" }),
  category: isRequired("Category"),
  description: composeValidators(
    isRequired("Description"),
    hasLengthGreaterThan(4)({
      message: "Description needs to be at least 5 characters"
    })
  )(),
  city: isRequired("City"),
  venue: isRequired("Venue"),
  date: isRequired("Date"),
  time: isRequired("Time")
});

interface DetailParams {
  id: string;
}

// Til að switch'a á milli Create og Edit Mode og tæma formið notum við ClearActivity í
// Cleanup function í useEffect. Til að unmount'a breytum við um KEY á þessum
// Component í APP.tsx

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
  const activityStore = useContext(ActivityStore);
  const { createActivity, editActivity, submitting, loadActivity } = activityStore;

  const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());
  const [loading, setLoading] = useState(false);

  // Tökum ID frá

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadActivity(match.params.id)
        .then(activity => setActivity(new ActivityFormValues(activity)))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [loadActivity, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const { date, time, ...activity } = values;
    activity.date = dateAndTime;
    if (!activity.id) {
      let newActivity = {
        ...activity,
        id: uuid()
      };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={activity}
            onSubmit={handleFinalFormSubmit}
            // Ef form er invalid er Edit takkinn óvirkur
            // Pristine: Engar breytingar hafa orðið
            // Engar breytingar: Edit takkinn óvirkur
            // Ef breytingar: Edit takkinn virkur
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field name='title' placeholder='Title' value={activity.title} component={TextInput} />
                <Field
                  name='description'
                  rows={3}
                  placeholder='Description'
                  value={activity.description}
                  component={TextAreaInput}
                />
                <Field
                  name='category'
                  placeholder='Category'
                  value={activity.category}
                  component={SelectInput}
                  options={category}
                />
                <Form.Group widths='equal'>
                  <Field name='date' placeholder='Date' value={activity.date} component={DateInput} date={true} />
                  <Field name='time' placeholder='Time' value={activity.date} component={DateInput} time={true} />
                </Form.Group>
                <Field name='city' placeholder='City' value={activity.city} component={TextInput} />
                <Field name='venue' placeholder='Venue' value={activity.venue} component={TextInput} />
                <Button
                  disabled={loading || invalid || pristine}
                  loading={submitting}
                  floated='right'
                  positive
                  type='submit'
                  content='Submit'
                />
                <Button
                  disabled={loading}
                  onClick={
                    activity.id
                      ? () => history.push(`${Routes.Activities}/${activity.id}`)
                      : () => history.push(`${Routes.Activities}`)
                  }
                  floated='right'
                  type='button'
                  content='Cancel'
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
