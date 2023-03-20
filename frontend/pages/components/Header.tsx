export const Header = (props) => {
  const { isConnected, profileCreated } = props;
  const buildPageTitle = () => {
    if (!isConnected) {
      return "Login";
    }
    if (isConnected && !profileCreated) {
      return "Create Profile";
    }
    if (isConnected && profileCreated) {
      return "Edit Profile";
    }
  }
  return (
    <header className="sticky top-0 z-50 py-4 text-center mb-20 bg-black text-white w-full">
      <div className="container mx-auto px-4">
        <h1 className="text-xl font-bold">
          {/* Display the current function of the page */}
          {buildPageTitle()}
        </h1>
      </div>
    </header>
  );
};
