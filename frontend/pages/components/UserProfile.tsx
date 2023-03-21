import React, { useState } from 'react';

export const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('nfts');

  const mockData = {
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Smiley.svg/800px-Smiley.svg.png',
    username: 'Web3Whiz',
    bio: 'Professional web3 developer and blockchain enthusiast. Passionate about building secure, distributed applications and exploring the potential of decentralized systems. #blockchain #web3 #webdeveloper',
    followers: 1500,
    following: 300,
    badges: ['2k+ transactions', '100+ NFTs', '10+ POAPs'],
  };

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col items-center p-4 px-8">
      <img
        src={mockData.avatar}
        alt="avatar"
        className="w-32 h-32 rounded-full mb-4 self-start"
      />
      <div className="flex justify-between w-full">
        <h1 className="font-bold text-xl">@{mockData.username}</h1>
        <div>
          <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
            Like
          </button>
          <button className="bg-green-500 text-white px-2 py-1 rounded">
            Chat
          </button>
        </div>
      </div>
      <p className="text-gray-600">{mockData.bio}</p>
      <div className="flex justify-start w-full mt-2">
        <p className="mr-5">Followers: {mockData.followers}</p>
        <p>Following: {mockData.following}</p>
      </div>
      <div className="mt-4 self-start">
        {mockData.badges.map((badge, index) => (
          <span
            key={index}
            className="bg-gray-300 px-2 py-1 rounded mr-2 text-sm"
          >
            {badge}
          </span>
        ))}
      </div>
      <div className="mt-4 self-start">
        <button
          onClick={() => toggleTab('nfts')}
          className={`${
            activeTab === 'nfts' ? 'bg-blue-500' : 'bg-gray-300'
          } text-white px-4 py-2 rounded-l`}
        >
          NFTs
        </button>
        <button
          onClick={() => toggleTab('chats')}
          className={`${
            activeTab === 'chats' ? 'bg-blue-500' : 'bg-gray-300'
          } text-white px-4 py-2 rounded-r`}
        >
          Chats
        </button>
      </div>
      <div className="mt-4 self-start">
        {activeTab === 'nfts' ? (
          <p>List of NFTs will be displayed here</p>
        ) : (
          <p>List of Chats will be displayed here</p>
        )}
      </div>
    </div>
  );
};