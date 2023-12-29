import network from './network';

export const getCreateRoom = () => network.publicGet('/get-room');

export const postGetUser = () => {};
