import { useState } from "react";
import { useRouter } from "next/router";
import { Polybase } from "@polybase/client";

const db = new Polybase({
  defaultNamespace:
    "pk/0xbe2696cb118c79aa23f2cf428727f0d989b2fd76f37058dd271cadbc96b8313fa9dfc65f5c981be27f0fb33cd52d46ade35107318a6c48d4b9f8b1375a400567/ZK_Novels",
});
const collectionReference = db.collection("User");

async function fetchUserInfo(uid: string) {
  const records = await collectionReference.where("id", "==", uid).get();
  return records;
}

const mockData = {
  avatar:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Smiley.svg/800px-Smiley.svg.png",
  username: "Web3Whiz",
  bio: "Professional web3 developer and blockchain enthusiast. Passionate about building secure, distributed applications and exploring the potential of decentralized systems. #blockchain #web3 #webdeveloper",
  followers: 1500,
  following: 300,
  badges: ["2k+ transactions", "100+ NFTs", "10+ POAPs"],
};

const UserPage = () => {
  const router = useRouter();
  const { uid } = router.query;
  const [isFetching, setIsFetching] = useState(true);
  const [profile, setProfile] = useState(null);
  if (isFetching && uid) {
    fetchUserInfo(uid).then((res) => {
      res?.data[0]?.data ? setProfile(res?.data[0].data) : router.push("/");
    });
    setIsFetching(false);
  }
  const [selectedTab, setSelectedTab] = useState("nfts");
  // !TODO add logic to fetch profile data from the backend. Redirect back to home if no profile exists.

  console.log(profile);

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
    <div className="flex flex-col items-center p-4 px-8">
      <img
        src={mockData.avatar}
        alt="avatar"
        className="w-32 h-32 rounded-full mb-4 self-start"
      />
      <div className="flex justify-between w-full">
        <h1 className="font-bold text-xl">@{profile.name}</h1>
        <div>
          <button className="bg-[#555BFF] text-white px-2 py-1 rounded mr-2">
            Like
          </button>
          <button className="bg-[#555BFF] text-white px-2 py-1 rounded">
            Chat
          </button>
        </div>
      </div>
      <p className="text-gray-600 mt-2">{profile.bio}</p>
      <div className="flex justify-start w-full mt-2">
        <p className="mr-5">Followers: 0</p>
        <p>Following: 0</p>
      </div>
      <div className="mt-4 self-start">
        <p>Example badges</p>
        {mockData.badges.map((badge, index) => (
          <span
            key={index}
            className="bg-gray-300 px-2 py-1 rounded mr-2 text-sm"
          >
            {badge}
          </span>
        ))}
      </div>
      <div className="pt-4 justify-start self-start">
        <div className="flex">
          <Tab label="NFTs:" value="nfts" />
          <Tab label="Chat" value="chats" />
        </div>
        <div className="mt-4">
          {selectedTab === "nfts" ? (
            <div>NFTs list will be displayed here</div>
          ) : (
            <div>Chats list will be displayed here</div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
    );
};

export default UserPage;
