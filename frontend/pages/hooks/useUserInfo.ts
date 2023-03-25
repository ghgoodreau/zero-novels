// hooks/useUserInfo.ts
import { useState, useEffect } from 'react';
import { Polybase } from '@polybase/client';

const db = new Polybase({
  defaultNamespace:
    'pk/0xbe2696cb118c79aa23f2cf428727f0d989b2fd76f37058dd271cadbc96b8313fa9dfc65f5c981be27f0fb33cd52d46ade35107318a6c48d4b9f8b1375a400567/ZK_Novels',
});
const collectionReference = db.collection('User');

interface UserProfile {
  id: string;
  // Add other profile properties here
}

async function fetchOwnUserInfo(uid: string): Promise<UserProfile | null> {
  const response = await collectionReference.where('vaultId', '==', uid).get();
  const records = response.data;

  if (records.length === 0) {
    return null;
  }

  records[0].data.ownProfile = true; // Mark the profile as the user's own profile
  return records[0].data; // Access the userInfo from the API response
}

export function useUserInfo(vaultID: string | null): [UserProfile | null, boolean, Error | null] {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Check if the vaultID is initialized
    if (vaultID) {
      const fetchProfile = async () => {
        try {
          const profile = await fetchOwnUserInfo(vaultID);
          setUserProfile(profile);
        } catch (err) {
          // @ts-ignore
          setError(err);
        } finally {
          setLoading(false);
        }
      };

      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [vaultID]);

  return [userProfile, loading, error];
}