import React from "react";
import { Header, Button, Image } from "semantic-ui-react";
import { HomePageSegment, HomePageContainer } from "./homePage.styled";
import { Routes } from "../../App/Routes";
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <HomePageSegment inverted textAlign='center' vertical className='masthead'>
      <HomePageContainer text>
        <Header as='h1' inverted>
          <Image size='massive' src='/assets/logo.png' alt='logo' style={{ marginBottom: 12 }} />
          Reactivities
        </Header>
        <Header as='h2' inverted content='Welcome to Reactivities' />
        <Button as={Link} to={`${Routes.Activities}`} size='huge' inverted>
          Take me to the activities!
        </Button>
      </HomePageContainer>
    </HomePageSegment>
  );
};
