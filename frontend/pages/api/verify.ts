// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { DataRequest, ZkConnect, ZkConnectServerConfig } from '@sismo-core/zk-connect-server';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = { 
  vaultId?: string,
  message?: string
}

const zkConnectConfig: ZkConnectServerConfig = {
  appId: "0xf2646bee3df693a1194a83b0e45d6e97",
  devMode: {
    enabled: process.env.NEXT_PUBLIC_ENV_NAME === "LOCAL", 
  }
}

const zkConnect = ZkConnect(zkConnectConfig);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { zkConnectResponse } = req.body;

  try {
    const { vaultId } = await zkConnect.verify(zkConnectResponse);
      res.status(200).send({
        vaultId,
      });
  } catch (e: any) {
    //If the response is not valid
    res.status(400).send({ message: e.message });
  }
}