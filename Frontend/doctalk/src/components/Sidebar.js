import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Profile from './Profile'; // Import the Profile component
import { ChannelsHome, ChannelsDetails } from './Channels';
import { CgProfile } from 'react-icons/cg';

const Sidebar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isChannelsOpen, setIsChannelsOpen] = useState(false);
  const [selectedChannelId, setSelectedChannelId] = useState(null);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleChannels = () => {
    setIsChannelsOpen(!isChannelsOpen);
  };

  const handleChannelClick = (channelId) => {
    setSelectedChannelId(channelId);
  };

  return (
    <div className="flex-none h-screen w-64 bg-emerald-200 fixed top-0 left-0 overflow-y-auto p-4">
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <span
            onClick={toggleChannels}
            className="cursor-pointer"
          >
            Channels
          </span>
          {isChannelsOpen && <ChannelsHome handleChannelClick={handleChannelClick} />}
        </li>

        <li className="mt-4">
          <span
            onClick={toggleProfile}
            className="cursor-pointer flex items-center"
          >
            <CgProfile className="inline-block mr-2" />
            Profile
          </span>
        </li>
        {/* Add more links */}
      </ul>

      {/* Profile dropdown */}
      {isProfileOpen && <Profile />} {/* Render Profile when isProfileOpen is true */}
      {selectedChannelId && <ChannelsDetails channelId={selectedChannelId} />}
    </div>
  );
};

export default Sidebar;
