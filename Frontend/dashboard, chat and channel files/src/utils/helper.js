import socketIOClient from 'socket.io-client';

// socketIOClient is used in front-end to connect with socket backend url
export const socket = socketIOClient(process.env.REACT_APP_SOCKET_URL, {
  transports: ['websocket'],
  reconnectionAttempts: 20,
  reconnectionDelay: 5000,
});

export const debounce = (callback, wait) => {
  let timeout = null;
  return (...args) => {
    const next = () => callback(...args);
    clearTimeout(timeout);
    timeout = setTimeout(next, wait);
  };
};

export const getSentenceFromCamelCase = (msg) => {
  const patt1 = /[A-Za-z]/g;
  const msgArr = msg.match(patt1);
  let errorMsg = '';
  for (let i = 0; i < msgArr.length; i += 1) {
    errorMsg +=
      msgArr[i] === msgArr[i].toUpperCase()
        ? ` ${msgArr[i].toLowerCase()}`
        : msgArr[i];
  }
  return errorMsg.trim();
};

export const getItemFromStorage = (key) => {
  const item = window.localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const setItemInStorage = (name, data) => {
  window.localStorage.setItem(name, JSON.stringify(data));
};

export const removeItemFromStorage = (name) => {
  window.localStorage.removeItem(name);
};
