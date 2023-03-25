// hooks/useLikeProfile.ts
import { useState } from "react";
import { Polybase } from "@polybase/client";

const useLikeProfile = (vaultID: string) => {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const likeProfile = async (profileToLikesVaultID: string) => {
    setLoading(true);

    const db = new Polybase({
      defaultNamespace:
        "pk/0xbe2696cb118c79aa23f2cf428727f0d989b2fd76f37058dd271cadbc96b8313fa9dfc65f5c981be27f0fb33cd52d46ade35107318a6c48d4b9f8b1375a400567/ZK_Novels",
    });

    const collectionReference = db.collection("User");

    try {
      await collectionReference
        .record(vaultID)
        .call("likeProfile", [profileToLikesVaultID]);
      setLiked(true);
    } catch (error) {
      console.error("Error liking profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    liked,
    loading,
    likeProfile,
  };
};

export default useLikeProfile;
