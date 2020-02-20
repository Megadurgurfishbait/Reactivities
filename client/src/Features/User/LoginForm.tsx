import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Header } from "semantic-ui-react";
import { TextInput } from "../../App/Common/form/TextInput";
import { RootStoreContext } from "../../App/stores/rootStore";
import { IUserFormValues } from "../../App/Models/user";
import { FORM_ERROR } from "final-form";
import { combineValidators, isRequired } from "revalidate";
import { ErrorMessage } from "../../App/Common/form/errorMessage";

const validate = combineValidators({
  email: isRequired("email"),
  password: isRequired("password")
});

export const LoginForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { login } = rootStore.userStore;
  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        login(values).catch(error => ({
          [FORM_ERROR]: error
        }))
      }
      validate={validate}
      render={({ handleSubmit, submitting, submitError, invalid, pristine, dirtySinceLastSubmit }) => (
        <Form onSubmit={handleSubmit} error>
          <Header as='h2' content='login to Reactivities' color='teal' textAlign='center' />
          <Field name='email' component={TextInput} placeholder='Email'></Field>
          <Field name='password' component={TextInput} placeholder='Password' type='password'></Field>

          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage error={submitError} text='Invalid email or password' />
          )}
          <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            loading={submitting}
            color='teal'
            content='Login'
            fluid
          />
        </Form>
      )}
    />
  );
};
