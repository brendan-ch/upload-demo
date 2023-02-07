import { NextApiRequest, NextApiResponse } from "next";
import fs from 'fs';

export default async function getFiles(req: NextApiRequest, res: NextApiResponse) {
  if (!fs.existsSync('/tmp/upload-test')) {
    fs.mkdirSync('/tmp/upload-test');
  }

  const files = fs.readdirSync('/tmp/upload-test');

  return res.status(200).json({
    successful: true,
    data: files,
  });
}