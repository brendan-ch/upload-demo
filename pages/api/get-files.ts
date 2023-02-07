import { NextApiRequest, NextApiResponse } from "next";
import fs from 'fs';

export default async function getFiles(req: NextApiRequest, res: NextApiResponse) {
  const files = fs.readdirSync('/tmp/upload-test');

  return res.status(200).json({
    successful: true,
    data: files,
  });
}