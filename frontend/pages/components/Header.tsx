export const Header = (props: { isConnected?: any; profileCreated?: any; vaultId?: any; userProfile?: any; checkingProfile?: any; }) => {
  const { isConnected, profileCreated } = props;
  const { vaultId, userProfile, checkingProfile } = props;
  const buildPageTitle = () => {
    if (!vaultId) {
      return "Login";
    }
    if (vaultId&& !userProfile) {
      return "Create Profile";
    }
    if (vaultId && userProfile) {
      return "Profile";
    }
  }
  return (
    <header className="sticky top-0 z-50 py-4 text-center mb-20 bg-black text-white w-full">
      <div className="container mx-auto px-4">
        <h1 className="text-xl font-bold">
          {buildPageTitle()}
        </h1>
      </div>
    </header>
  );
};
