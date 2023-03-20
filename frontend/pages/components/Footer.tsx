export const Footer = () => {
  const loggedIn = false;
  return (
    <footer className="fixed bottom-0 w-full py-4 bg-white border-t">
    <div className="container mx-auto px-4 flex justify-around">
      <button className="btn">Search</button>
      <button className="btn">Likes</button>
      {loggedIn ? (
        <button className="btn">Me</button>
      ) : (
        <button className="btn">Login</button>
      )}
    </div>
  </footer>
  )
}