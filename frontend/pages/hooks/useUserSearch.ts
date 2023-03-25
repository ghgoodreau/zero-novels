// hooks/useUserSearch.ts
import { useState, useEffect } from 'react';
import { Polybase } from '@polybase/client';

const db = new Polybase({
  defaultNamespace:
    'pk/0xbe2696cb118c79aa23f2cf428727f0d989b2fd76f37058dd271cadbc96b8313fa9dfc65f5c981be27f0fb33cd52d46ade35107318a6c48d4b9f8b1375a400567/ZK_Novels',
});
const collectionReference = db.collection('User');

export interface User {
  bio: string;
  id: string;
  name: string;
  roleWhere: string;
  vaultId: string;
}

export function useUserSearch(searchText: string): User[] {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    const unsubscribe = collectionReference.onSnapshot(
      (newDocs) => {
        const newUsers = newDocs.data.map((doc) => doc.data as User);
        setUsers(newUsers);
      },
      (err) => {
        console.error('Error fetching users:', err);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (searchText) {
      const lowerCaseSearchText = searchText.toLowerCase();
      const filtered = users.filter((user) =>
        Object.values(user).some((value) =>
          value.toString().toLowerCase().includes(lowerCaseSearchText)
        )
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchText, users]);

  return filteredUsers;
}
