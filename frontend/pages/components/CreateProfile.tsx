import React, { useState, useEffect } from "react";
import { Polybase } from "@polybase/client"

interface props {
  vaultID: string;
}

export const CreateProfile = (props: props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [accountExists, setAccountExists] = useState(false);
  const [pageTitle, setPageTitle] = useState("Create Account");
  const [username, setUsername] = useState("");
  const [roleWhere, setRoleWhere] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState(null);

  const { vaultID } = props;
  const db = new Polybase({
    defaultNamespace: "pk/0xbe2696cb118c79aa23f2cf428727f0d989b2fd76f37058dd271cadbc96b8313fa9dfc65f5c981be27f0fb33cd52d46ade35107318a6c48d4b9f8b1375a400567/ZK_Novels",
  });
  const collectionReference = db.collection("User");

  useEffect(() => {
    // Check if user is logged in and if account exists
    // Set loggedIn and accountExists states accordingly
  }, []);

  const handleAvatarUpload = (e: {
    target: { files: React.SetStateAction<null>[] };
  }) => {
    setAvatar(e.target.files[0]);
  };

  async function createRecord () {
    // .create(args) args array is defined by the constructor fn
    const recordData = await collectionReference.create([
      vaultID, 
      vaultID,
      username,
      roleWhere,
      bio
    ]); 
  }
  
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    createRecord();
    // Save the data to the blockchain using zkEVM or any other smart contract interaction
    // You'll need to implement this based on your specific requirements
    // redirect to profile page
  };

  return (
    <>
      {!accountExists && (
        <div className="container mx-auto px-4 my-8">
          <form onSubmit={handleSubmit} className="flex flex-col">
            {/* Avatar Upload Field */}
            <input
              type="file"
              // @ts-ignore
              onChange={handleAvatarUpload}
              required
              className="ml-auto mr-auto pl-32 mb-5"
            />

            {/* Username Field */}
            <input
              type="text"
              placeholder="@ Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mb-5 rounded-lg px-2 py-1 bg-white border-black border-2"
            />

            {/* Role + Where Field */}
            <input
              type="text"
              placeholder="Role + Where"
              value={roleWhere}
              onChange={(e) => setRoleWhere(e.target.value)}
              className="mb-5 rounded-lg px-2 py-1 bg-white border-black border-2"
            />

            {/* Bio Field */}
            <textarea
              className="resize-none mb-5 rounded-lg px-2 py-1 bg-white border-black border-2"
              placeholder="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />

            {/* Save Button */}
            <button
              type="submit"
              className=" bg-[#555BFF] h-[55px] rounded-md text-white"
            >
              Save
            </button>
          </form>
        </div>
      )}
    </>
  );
};
