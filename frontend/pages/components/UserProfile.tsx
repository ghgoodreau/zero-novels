import React, { useState } from "react";
import { CreateProfile } from "./CreateProfile";

export const UserProfile = (props: { userProfile: any; vaultID: any; handleLogout: any; }) => {
  const [selectedTab, setSelectedTab] = useState("nfts");
  const { userProfile, vaultID, handleLogout } = props;
  const [isEditing, setIsEditing] = useState(false); // Add isEditing state

  // @ts-ignore
  const Tab = ({ label, value }) => (
    <button
      className={`py-2 px-4 text-lg font-medium text-gray-500 hover:text-gray-700 ${
        selectedTab === value ? "border-b-[4px] border-[#555BFF]" : ""
      }`}
      onClick={() => setSelectedTab(value)}
    >
      {label}
    </button>
  );

  // mock data for testing purposes. replace with polybase.
  const mockData = {
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Smiley.svg/800px-Smiley.svg.png",
    username: "Web3Whiz",
    bio: "Professional web3 developer and blockchain enthusiast. Passionate about building secure, distributed applications and exploring the potential of decentralized systems. #blockchain #web3 #webdeveloper",
    followers: 1500,
    following: 300,
    badges: ["2k+ transactions", "100+ NFTs", "10+ POAPs"],
  };

  const onCancelEdit = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <CreateProfile
        vaultID={vaultID}
        editMode={true}
        userProfile={userProfile}
        onCancelEdit={onCancelEdit}
      />
    );
  }
  const isSelf = userProfile.id === vaultID;
  
  return (
    <div className="flex flex-col items-center p-4 px-8">
      <img
        src={mockData.avatar}
        alt="avatar"
        className="w-32 h-32 rounded-full mb-4 self-start"
      />
      <div className="flex justify-between w-full">
        <h1 className="font-bold text-xl">@{userProfile?.name}</h1>
        {userProfile?.ownProfile || isSelf ? (
          <div>
          <button
            className="bg-[#555BFF] text-white px-2 py-1 rounded mr-2"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
          <button
            className="bg-[#555BFF] text-white px-2 py-1 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        ) : (
          <div>
          <button className="bg-[#555BFF] text-white px-2 py-1 rounded mr-2">
            Like
          </button>
          <button className="bg-[#555BFF] text-white px-2 py-1 rounded">
            Chat
          </button>
        </div> 
        )}
      </div>
      <p className="text-gray-600 mt-2">{userProfile.bio}</p>
      <div className="flex justify-start w-full mt-2">
        <p className="mr-5">Followers: Not implemented yet</p>
        <p>Following: Not implemented yet</p>
      </div>
      <div className="mt-4 self-start">
        <h1>TODO badges</h1>
        {mockData.badges.map((badge, index) => (
          <span
            key={index}
            className="bg-gray-300 px-2 py-1 rounded mr-2 text-sm"
          >
            {badge}
          </span>
        ))}
      </div>
      <div className="pt-4 justify-start self-start">
        <div className="flex">
          <Tab label="NFTs:" value="nfts" />
          <Tab label="Chat" value="chats" />
        </div>
        <div className="mt-4">
          {selectedTab === "nfts" ? (
            <div>NFTs list will be displayed here</div>
          ) : (
            <div>Chats list will be displayed here</div>
          )}
        </div>
      </div>
    </div>
  );
};
