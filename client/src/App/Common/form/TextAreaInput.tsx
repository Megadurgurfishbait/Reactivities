import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";

interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {}
export const TextAreaInput: React.FC<IProps> = ({ input, width, rows, placeholder, meta: { touched, error } }) => {
  return (
    <Form.Field error={touched && !!error}>
      <textarea rows={rows} {...input} placeholder={placeholder} />
      {console.log(error)}
      {touched && error && (
        <Label basic color='red'>
          {console.log(error)}
          {error}
        </Label>
      )}
    </Form.Field>
  );
};
