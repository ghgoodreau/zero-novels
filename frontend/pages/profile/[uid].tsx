import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Polybase } from "@polybase/client";
import { UserProfile } from "../components/UserProfile";

const db = new Polybase({
  defaultNamespace:
    "pk/0xbe2696cb118c79aa23f2cf428727f0d989b2fd76f37058dd271cadbc96b8313fa9dfc65f5c981be27f0fb33cd52d46ade35107318a6c48d4b9f8b1375a400567/ZK_Novels",
});
const collectionReference = db.collection("User");

async function fetchUserInfo(uid: string) {
  const records = await collectionReference.where("id", "==", uid).get();
  return records;
}

const UserPage = (props: { vaultId: any; userProfile: any; checkingProfile: any; handleLogout: any; }) => {
  const router = useRouter();
  const { uid } = router.query;
  const { vaultId, userProfile, checkingProfile, handleLogout } = props;
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (uid) {
      // @ts-ignore
      fetchUserInfo(uid).then((res) => {
        res?.data[0]?.data ? setProfile(res?.data[0].data) : router.push("/");
      });
    }
  }, [uid]);

  const [selectedTab, setSelectedTab] = useState("nfts");

  // @ts-ignore
  const Tab = ({ label, value }) => (
    <button
      className={`py-2 px-4 text-lg font-medium text-gray-500 hover:text-gray-700 ${
        selectedTab === value ? "border-b-[4px] border-[#555BFF]" : ""
      }`}
      onClick={() => setSelectedTab(value)}
    >
      {label}
    </button>
  );

  return profile ? (
    <UserProfile
      userProfile={profile}
      vaultID={vaultId}
      handleLogout={handleLogout}
    />
  ) : (
    <div>Loading...</div>
  );
};

export default UserPage;
