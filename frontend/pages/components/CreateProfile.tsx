import React, { useState, useEffect } from "react";
import { Polybase } from "@polybase/client";
import { Web3Button, Web3Modal } from "@web3modal/react";
import { useAccount, useConnect } from "wagmi";

interface props {
  vaultID: string;
  editMode?: boolean;
  userProfile?: any;
  onCancelEdit?: () => void;
}

export const CreateProfile = (props: props) => {
  const { address, isConnected } = useAccount();
  const [loggedIn, setLoggedIn] = useState(false);
  const [accountExists, setAccountExists] = useState(false);
  const [pageTitle, setPageTitle] = useState("Create Account");
  const { vaultID, editMode, userProfile, onCancelEdit } = props;
  const [username, setUsername] = useState(userProfile?.name || "");
  const [roleWhere, setRoleWhere] = useState(userProfile?.roleWhere || "");
  const [bio, setBio] = useState(userProfile?.bio || "");
  const [avatar, setAvatar] = useState(null);

  const db = new Polybase({
    defaultNamespace:
      "pk/0xbe2696cb118c79aa23f2cf428727f0d989b2fd76f37058dd271cadbc96b8313fa9dfc65f5c981be27f0fb33cd52d46ade35107318a6c48d4b9f8b1375a400567/ZK_Novels",
  });
  const collectionReference = db.collection("User");

  const handleAvatarUpload = (e: {
    target: { files: React.SetStateAction<null>[] };
  }) => {
    setAvatar(e.target.files[0]);
  };

  async function createRecord() {
    // .create(args) args array is defined by the constructor fn
    const recordData = await collectionReference.create([
      vaultID,
      vaultID,
      username,
      roleWhere,
      bio,
    ]);
  }

  async function editRecord() {
    // Replace "updateProfile" with the update function name defined in your collection schema
    // and pass the arguments accordingly
    const recordData = await collectionReference
      .record(vaultID)
      .call("updateProfile", [vaultID, vaultID, username, roleWhere, bio]);
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Check if the component is in edit mode
    if (editMode) {
      // Call editRecord function to update user data
      await editRecord();
    } else {
      // Call createRecord function to create a new user
      await createRecord();
    }
    // @ts-ignore
    onCancelEdit();
  };
  return (
    <>
      {!accountExists && (
        <div className="container mx-auto px-4 my-8">
          {editMode ? <Web3Button /> : <></>}
          <form onSubmit={handleSubmit} className="flex flex-col">
            {/* Avatar Upload Field */}
            <input
              type="file"
              // @ts-ignore
              onChange={handleAvatarUpload}
              // required
              className="ml-auto mr-auto pl-32 mb-5"
            />

            {/* Username Field */}
            <input
              type="text"
              placeholder={userProfile?.name ? userProfile.name : "@ Username"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mb-5 rounded-lg px-2 py-1 bg-white border-black border-2"
            />

            {/* Role + Where Field */}
            <input
              type="text"
              placeholder={
                userProfile?.roleWhere ? userProfile.roleWhere : "Role @ Where"
              }
              value={roleWhere}
              onChange={(e) => setRoleWhere(e.target.value)}
              className="mb-5 rounded-lg px-2 py-1 bg-white border-black border-2"
            />

            {/* Bio Field */}
            <textarea
              className="resize-none mb-5 rounded-lg px-2 py-1 bg-white border-black border-2"
              placeholder={userProfile?.bio ? userProfile.bio : "Bio"}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />

            {/* Save Button */}
            <button
              type="submit"
              className="bg-[#555BFF] h-[55px] rounded-md text-white"
              disabled={!isConnected}
            >
              {editMode
                ? !isConnected
                  ? "Please connect wallet to edit"
                  : "Confirm Edit Profile"
                : "Create Account"}
            </button>
          </form>
          <button
            className="bg-[#555BFF] h-[55px] rounded-md text-white w-[100%] mt-5"
            onClick={onCancelEdit}
          >
            Cancel
          </button>
        </div>
      )}
    </>
  );
};
