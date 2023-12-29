import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardTitle,
  Button,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Dropdown,
  Spinner,
  InputGroup,
} from 'reactstrap';
import { useAuth } from '../hooks/useAuth';
import { setItemInStorage } from '../utils/helper';
import { getCreateRoom } from '../services/api';
import { DEFAULT_ROOM_TYPE, ROOM_TYPE } from '../utils/constants';
import { toastError, toastSuccess } from '../components/notifications';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [roomType, setRoomType] = useState(DEFAULT_ROOM_TYPE);
  const [isLoading, setLoading] = useState(false);

  const history = useNavigate();
  const auth = useAuth();

  const handleOnJoinRoom = () => {
    if (roomId.trim().length > 0) {
      auth.login();
      setItemInStorage('user', {
        name: userName,
      });
      history.push(`/${roomId}`);
    }
  };

  const onLoginClick = (e) => {
    e.preventDefault();
    if (roomType === ROOM_TYPE.createRoom) {
      setLoading(true);
      toastSuccess('Room created!!');
      getCreateRoom()
        .then((res) => {
          setLoading(false);
          if (res && res.roomUrl) {
            auth.login();
            setItemInStorage('user', {
              name: userName,
            });
            history.push(`/${res.roomUrl}`);
          }
        })
        .catch((err) => {
          setLoading(false);
          toastError(err);
        });
    } else {
      handleOnJoinRoom();
    }
  };
  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <Container>
      <Row className="justify-content-center align-items-center h-100vh">
        <Col sm="12" md={6}>
          <Card>
            <CardBody>
              <CardTitle tag="h3" className="text-center mb-5">
                Chat Application Demo
              </CardTitle>
              <Form onSubmit={onLoginClick}>
                <FormGroup>
                  <Label for="email">Name</Label>
                  <Input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Enter your name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                </FormGroup>
                <>
                  {roomType === ROOM_TYPE.joinRoom ? (
                    <FormGroup>
                      <Label for="roomId">Room-id</Label>
                      <Input
                        type="text"
                        name="roomId"
                        id="roomId"
                        placeholder="Enter room id"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        required
                      />
                    </FormGroup>
                  ) : null}
                </>
                <InputGroup>
                  <Dropdown
                    addonType="prepend"
                    isOpen={dropdownOpen}
                    toggle={toggle}
                  >
                    <Button color="secondary" outline disabled={isLoading}>
                      {isLoading ? (
                        <Spinner className="mr-2" size="sm" />
                      ) : null}
                      {roomType === ROOM_TYPE.joinRoom
                        ? 'Join room'
                        : 'Create room'}
                    </Button>
                    <DropdownToggle
                      outline
                      disabled={isLoading}
                      split
                      color="secondary"
                    />
                    <DropdownMenu>
                      <DropdownItem
                        onClick={() => setRoomType(ROOM_TYPE.createRoom)}
                      >
                        Create Room
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => setRoomType(ROOM_TYPE.joinRoom)}
                      >
                        Join Room
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </InputGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
