import { Menu, Container, Button } from "semantic-ui-react";
import styled from "styled-components";

const NavMenu = styled(Menu)`
  background-image: linear-gradient(
    135deg,
    rgb(24, 42, 115) 0%,
    rgb(33, 138, 174) 69%,
    rgb(32, 167, 172) 89%
  ) !important;
`;

export { Menu, Container, Button, NavMenu };
