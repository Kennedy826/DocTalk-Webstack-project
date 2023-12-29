/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { getItemFromStorage } from '../../utils/helper';

const ChatContainer = ({ messages }) => {
  const { name } = getItemFromStorage('user');
  const messagesEnd = useRef(null);

  useEffect(() => {
    // used for scrolling the chat smoothly
    messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {messages && messages.length
        ? messages.map((message, index) => (
            <div
              className={`msg-container msg-container-${
                message.userName === name ? 'right' : 'left'
              }`}
              key={index}
            >
              <div className="msg-header">
                <span className="msg-user-name">{message.userName}</span>
              </div>
              <div className="msg-content">
                <span className="msg-text">{message.msg}</span>
              </div>
            </div>
          ))
        : null}
      <div style={{ float: 'left', clear: 'both' }} ref={messagesEnd} />
    </>
  );
};

ChatContainer.propTypes = {
  messages: PropTypes.array.isRequired,
};

export default ChatContainer;
