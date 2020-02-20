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
  username: isRequired("username"),
  displayName: isRequired("display name"),
  password: isRequired("password")
});

export const RegisterForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { register } = rootStore.userStore;
  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        register(values).catch(error => ({
          [FORM_ERROR]: error
        }))
      }
      validate={validate}
      render={({ handleSubmit, submitting, submitError, invalid, pristine, dirtySinceLastSubmit }) => (
        <Form onSubmit={handleSubmit} error>
          <Header as='h2' content='Sign up to Reactivities' color='teal' textAlign='center' />
          <Field name='username' component={TextInput} placeholder='Username'></Field>
          <Field name='displayName' component={TextInput} placeholder='Display Name'></Field>
          <Field name='email' component={TextInput} placeholder='Email'></Field>
          <Field name='password' component={TextInput} placeholder='Password' type='password'></Field>

          {submitError && !dirtySinceLastSubmit && <ErrorMessage error={submitError} />}
          <Button
            // disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            loading={submitting}
            color='teal'
            content='Register'
            fluid
          />
        </Form>
      )}
    />
  );
};
