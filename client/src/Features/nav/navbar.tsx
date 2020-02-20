import React, { useContext } from "react";
import { NavMenu, Menu, Container, Button } from "./navbar.styled";
import { observer } from "mobx-react-lite";
import { NavLink, Link } from "react-router-dom";
import { Routes } from "../../App/Routes";
import { RootStoreContext } from "../../App/stores/rootStore";
import { Dropdown, Image } from "semantic-ui-react";

const NavBar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;
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
        {user && (
          <Menu.Item position='right'>
            <Image avatar spaced='right' src={user.image || "/assets/user.png"} />
            <Dropdown pointing='top left' text={user.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to={`/profile/username`} text='My profile' icon='user' />
                <Dropdown.Item onClick={logout} text='Logout' icon='power' />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </NavMenu>
  );
};

export default observer(NavBar);
