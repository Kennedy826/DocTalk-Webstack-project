import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const channels = [
  { id: 1, name: '#general' },
  { id: 2, name: '#random' },
  { id: 3, name: '#doctorpanel' },
  // Add more channels as needed
];

const ChannelsHome = ({ handleChannelClick }) => {
  return (
    <div className="flex flex-col bg-gray-200 p-4">
      <h2 className="text-lg font-bold mb-4">Channels</h2>
      <ul>
        {channels.map(channel => (
          <li
            key={channel.id}
            className="py-2 px-4 border-b border-gray-300 hover:bg-gray-300"
            onClick={() => handleChannelClick(channel.id)}
          >
            <Link to={`/channels/${channel.id}`} className="text-blue-600">
              {channel.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ChannelsDetails = ({ channelId }) => {
  return (
    <div>
      {/* Details for a specific channel */}
      Channel ID: {channelId}
    </div>
  );
};

export { ChannelsHome, ChannelsDetails };