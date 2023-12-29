import { Button } from 'reactstrap';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { getItemFromStorage, socket } from '../../utils/helper';

const MessageBar = () => {
  const [value, setValue] = useState('');
  const { name } = getItemFromStorage('user');

  // On Submitting the message/form
  const handleSubmit = (msg) => {
    setValue('');

    // Trigger NEW_MESSAGE with object
    // this object contains userName, msg
    socket.emit('NEW_MESSAGE', { userName: name, msg });
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleKeyUp = (e) => {
    if ((e.key === 'Enter' || e.keyCode === 13) && value.trim().length > 0) {
      handleSubmit(value);
    }
  };

  return (
    <div className="w-50 message-bar d-flex">
      <input
        type="text"
        className="form-control"
        value={value}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        placeholder="Type a message here then hit ENTER"
        required
      />
      <Button
        className="ml-2"
        color="primary"
        disabled={!value.trim().length}
        onClick={() => handleSubmit(value)}
      >
        <FontAwesomeIcon icon={faPaperPlane} />
      </Button>
    </div>
  );
};

export default MessageBar;
