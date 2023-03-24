import { Polybase } from "@polybase/client"

  const db = new Polybase({
    defaultNamespace: "pk/0xbe2696cb118c79aa23f2cf428727f0d989b2fd76f37058dd271cadbc96b8313fa9dfc65f5c981be27f0fb33cd52d46ade35107318a6c48d4b9f8b1375a400567/ZK_Novels",
  });
  const collectionReference = db.collection("User");
  const records = listRecords();

export async function listRecords () {
  const records = await collectionReference.get();
}

//! todo fix records being a promise and not an array
export const ListRecords = () => {
  const collectionReference = db.collection("User");
  const records = listRecords();
  console.log(records);
  return (
    <>
    </>
  );
};
