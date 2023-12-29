import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Label,
  Button,
  UncontrolledTooltip,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import {
  getItemFromStorage,
  removeItemFromStorage,
} from '../../../utils/helper';
import { useAuth } from '../../../hooks/useAuth';
import logo from '../../../assets/images/logo.svg';
import { toastError, toastSuccess } from '../../notifications';
import './Header.css';

const Header = ({ roomId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const userFromStorage = getItemFromStorage('user');

  const toggle = () => setIsOpen(!isOpen);
  const history = useNavigate();
  const user = useAuth();
  const onLogout = () => {
    user.logout();
    removeItemFromStorage('user');
    history.push('/');
  };

  return (
    <Navbar className="bg-primary" dark expand="md">
      <NavbarBrand
        className="text-white font-weight-bolder d-flex align-items-center"
        href="/"
      >
        <img src={logo} alt=" React Boilerplate" className="logo" />
        Chat Application Demo
      </NavbarBrand>
      <div className="d-flex align-items-center mt-2">
        <Label className="text-white align-items-center">
          Room id:
          {` ${roomId}`}
        </Label>
        <Button
          color="link"
          className="text-white align-items-center mb-2"
          onClick={() => {
            navigator.clipboard.writeText(roomId).then(
              () => {
                toastSuccess('Room-Id copied.');
              },
              () => {
                toastError('Something went wrong.');
              },
            );
          }}
        >
          <FontAwesomeIcon icon={faCopy} id="copy-room-id" />
          <UncontrolledTooltip placement="right" target="copy-room-id">
            Copy Room-Id
          </UncontrolledTooltip>
        </Button>
      </div>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              {userFromStorage && userFromStorage.name
                ? userFromStorage.name
                : 'user'}
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={onLogout}>Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

Header.propTypes = {
  roomId: PropTypes.string.isRequired,
};

export default Header;
