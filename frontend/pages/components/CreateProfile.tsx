import React, { useState, useEffect } from "react";

export const CreateProfile = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [accountExists, setAccountExists] = useState(false);
  const [pageTitle, setPageTitle] = useState("Create Account");
  const [username, setUsername] = useState("");
  const [roleWhere, setRoleWhere] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    // Check if user is logged in and if account exists
    // Set loggedIn and accountExists states accordingly
  }, []);

  const handleAvatarUpload = (e: {
    target: { files: React.SetStateAction<null>[] };
  }) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Save the data to the blockchain using zkEVM or any other smart contract interaction
    // You'll need to implement this based on your specific requirements
    console.log("Submitted:", { username, roleWhere, bio, avatar });
  };

  return (
    <>
      {!accountExists && (
        <div className="container mx-auto px-4 my-8">
          <form onSubmit={handleSubmit} className="flex flex-col">
            {/* Avatar Upload Field */}
            <input type="file" onChange={handleAvatarUpload} required />

            {/* Username Field */}
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            {/* Role + Where Field */}
            <input
              type="text"
              placeholder="Role + Where"
              value={roleWhere}
              onChange={(e) => setRoleWhere(e.target.value)}
            />

            {/* Bio Field */}
            <textarea
              className="resize-none"
              placeholder="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />

            {/* Save Button */}
            <button type="submit">Save</button>
          </form>
        </div>
      )}
    </>
  );
};