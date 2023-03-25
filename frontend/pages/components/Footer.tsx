// components/Footer.tsx
import React, { useState } from "react";
import { useWeb3Modal } from "@web3modal/react";
import { useUserSearch, User } from "../hooks/useUserSearch";
import { useRouter } from "next/router";

export const Footer = (props: { isLoggedIn: boolean }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { isOpen, open, close, setDefaultChain } = useWeb3Modal();
  const { isLoggedIn } = props;
  const users = useUserSearch(searchText);

  const handleSearchClick = () => {
    setSearchOpen(!searchOpen);
  };

  const handleSearchEnter = (e: { key: string }) => {
    if (e.key === "Enter") {
      // Perform the search action here
      // console.log('Searching:', searchText);
    }
  };

  const renderSearchResults = (users: User[]) => {
    return (
      <div
        className={`absolute bottom-[100%] w-full bg-white shadow-lg p-4 ${
          !searchOpen && "hidden"
        }`}
      >
        <ul className="max-h-[200px] overflow-y-scroll">
          {users.map((user, index) => (
            <li
              key={index}
              className="p-1"
              onClick={() => {
                router.push(`/profile/${user.vaultId}`);
                setSearchOpen(false);
              }}
            >
              {user.name}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const router = useRouter();

  return (
    <footer className="fixed bottom-0 w-full py-4 bg-white border-t">
      <div className="container mx-auto px-4 flex justify-around relative">
        <button className="btn" onClick={handleSearchClick}>
          Search
        </button>
        {searchOpen && (
          <>
            <input
              type="text"
              placeholder="Search User"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleSearchEnter}
              className="rounded-lg px-2 py-1 bg-white border-black border-2 w-[90%] mx-2 h-[26px]"
            />
            <button className="btn" onClick={() => setSearchOpen(false)}>
              X
            </button>
            {renderSearchResults(users)}
          </>
        )}
        {!searchOpen && (
          <>
            <button className="btn">Likes</button>
            {isLoggedIn ? (
              <button className="btn" onClick={() => router.push("/")}>
                Me
              </button>
            ) : (
              <button className="btn" onClick={() => open()}>
                Login
              </button>
            )}
          </>
        )}
      </div>
    </footer>
  );
};
