import styled, { createGlobalStyle } from "styled-components";
import { Container, List } from "semantic-ui-react";

const MyGlobalStyle = createGlobalStyle`
  body {
    background-color: rgb(234, 234, 234) !important;
  }
`;

const AppContainer = styled(Container)`
  margin-top: 7em !important;
`;

export { AppContainer, List, MyGlobalStyle };
