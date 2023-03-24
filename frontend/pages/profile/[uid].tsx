import { useRouter } from "next/router";

const UserPage = () => {
  const router = useRouter();
  const { uid } = router.query;

  // !TODO add logic to fetch profile data from the backend. Redirect back to home if no profile exists.

  return (
    <div>
      <h1>Profile</h1>
      <p>{uid}</p>
    </div>
  );
};

export default UserPage;