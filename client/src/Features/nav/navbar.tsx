import React, { useContext } from "react";
import { NavMenu, Menu, Container, Button } from "./navbar.styled";
import ActivityStore from "../../App/stores/activityStore";
import { observer } from "mobx-react-lite";

const NavBar: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const { openCreateForm } = activityStore;
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

export default observer(NavBar);
