import { useState } from "react";
import { useWeb3Modal } from "@web3modal/react";

export const Footer = (props: { isLoggedIn: boolean; }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
const { isOpen, open, close, setDefaultChain } = useWeb3Modal();
  const { isLoggedIn } = props;
  const handleSearchClick = () => {
    if (searchOpen) {
      // Perform the search action here
      console.log("Searching:", searchText);
    }
    setSearchOpen(!searchOpen);
  };

  const handleSearchEnter = (e: { key: string; }) => {
    if (e.key === "Enter") {
      // Perform the search action here
      console.log("Searching:", searchText);
    }
  };
  return (
    <footer className="fixed bottom-0 w-full py-4 bg-white border-t">
      <div className="container mx-auto px-4 flex justify-around">
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
          </>
        )}
        {!searchOpen && (
          <>
            <button className="btn">Likes</button>
            {isLoggedIn ? (
              <button className="btn" onClick={() => open()}>Me</button>
            ) : (
              <button className="btn" onClick={() => open()}>Login</button>
            )}
          </>
        )}
      </div>
    </footer>
  );
};
