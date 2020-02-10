import React from "react";
import { NavMenu, Menu, Container, Button } from "./navbar.styled";

interface IProps {
  openCreateForm: () => void;
}

export const NavBar: React.FC<IProps> = ({ openCreateForm }) => {
  return (
    <NavMenu fixed='top' inverted>
      <Container>
        <Menu.Item header>
          <img src='/assets/logo.png' alt='logo' style={{ marginRight: "10px" }} />
          Reactivities
        </Menu.Item>
        <Menu.Item name='Activities' />
        <Menu.Item>
          <Button onClick={openCreateForm} positive content='Create Activitiy' />
        </Menu.Item>
      </Container>
    </NavMenu>
  );
};
