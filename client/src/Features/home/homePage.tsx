import React, { useContext } from "react";
import { Header, Button, Image } from "semantic-ui-react";
import { HomePageSegment, HomePageContainer } from "./homePage.styled";
import { Routes } from "../../App/Routes";
import { Link } from "react-router-dom";
import { RootStoreContext } from "../../App/stores/rootStore";
import { LoginForm } from "../User/LoginForm";
import { RegisterForm } from "../User/RegisterForm";

export const HomePage = () => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;
  return (
    <HomePageSegment inverted textAlign='center' vertical className='masthead'>
      <HomePageContainer text>
        <Header as='h1' inverted>
          <Image size='massive' src='/assets/logo.png' alt='logo' style={{ marginBottom: 12 }} />
          Reactivities
        </Header>
        {isLoggedIn && user ? (
          <>
            <Header as='h2' inverted content={`Welcome back ${user.displayName}`} />
            <Button as={Link} to={`${Routes.Activities}`} size='huge' inverted>
              Go to Activities
            </Button>
          </>
        ) : (
          <>
            <Header as='h2' inverted content={`Welcome back Reactivities`} />
            <Button onClick={() => openModal(<LoginForm />)} size='huge' inverted>
              Login
            </Button>
            <Button onClick={() => openModal(<RegisterForm />)} size='huge' inverted>
              Register
            </Button>
          </>
        )}
      </HomePageContainer>
    </HomePageSegment>
  );
};
