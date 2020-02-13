import React from "react";
import { NavMenu, Menu, Container, Button } from "./navbar.styled";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { Routes } from "../../App/Routes";

const NavBar: React.FC = () => {
  return (
    <NavMenu fixed='top' inverted>
      <Container>
        <Menu.Item header as={NavLink} exact to={`${Routes.Home}`}>
          <img src='/assets/logo.png' alt='logo' style={{ marginRight: "10px" }} />
          Reactivities
        </Menu.Item>
        <Menu.Item name='Activities' as={NavLink} to={`${Routes.Activities}`} />
        <Menu.Item>
          <Button as={NavLink} to='/createActivity' positive content='Create Activitiy' />
        </Menu.Item>
      </Container>
    </NavMenu>
  );
};

export default observer(NavBar);
