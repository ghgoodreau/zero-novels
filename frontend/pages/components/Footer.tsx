import { useState } from "react";
export const Footer = (props) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const  {isLoggedIn } = props;
  const handleSearchClick = () => {
    if (searchOpen) {
      // Perform the search action here
      console.log('Searching:', searchText);
    }
    setSearchOpen(!searchOpen);
  };

  const handleSearchEnter = (e) => {
    if (e.key === 'Enter') {
      // Perform the search action here
      console.log('Searching:', searchText);
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
              placeholder="Search"
              className="border rounded"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleSearchEnter}
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
              <button className="btn">Me</button>
            ) : (
              <button className="btn">Login</button>
            )}
          </>
        )}
      </div>
    </footer>
  );
}