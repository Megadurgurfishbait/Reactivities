import styled from "styled-components";
import { Segment, Container } from "semantic-ui-react";

export const HomePageSegment = styled(Segment)`
  display: flex;
  align-items: center;
  background-image: linear-gradient(
    135deg,
    rgb(24, 42, 115) 0%,
    rgb(33, 138, 174) 69%,
    rgb(32, 167, 172) 89%
  ) !important;
  height: 100vh;
`;

export const HomePageContainer = styled(Container)`
  & > h2 {
    font-size: 1.7em !important;
    font-weight: normal !important;
  }

  & > h1 {
    font-size: 4em !important;
    font-weight: normal !important;
  }
`;
