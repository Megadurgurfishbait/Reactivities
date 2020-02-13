import React from "react";
import { Container } from "semantic-ui-react";
import { Routes } from "../../App/Routes";
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <Container>
      <h1>Home Page</h1>
      <h3>
        Go To <Link to={`${Routes.Activities}`}>Activities</Link>
      </h3>
    </Container>
  );
};
