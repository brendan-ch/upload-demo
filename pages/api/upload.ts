import { NextApiRequest, NextApiResponse } from "next";
import fs from 'fs/promises';
import formidable, { File } from 'formidable';
import PersistentFile from "formidable/PersistentFile";

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function upload(req: NextApiRequest, res: NextApiResponse) {
  if (req.method?.toLowerCase() !== 'post') {
    return res.status(400).json({
      successful: false,
      error: 'bad request',
    });
  }
  
  const data: any = await new Promise((resolve, reject) => {
    const form = formidable({ multiples: true });
  
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  
  });

  const file = data.files.file as File;
  // file contains a path to the uploaded file
  const tempFile = await fs.readFile(file.filepath);
  await fs.writeFile(`./temp/${file.originalFilename}`, tempFile);

  // to indicate that it's working,
  // return a list of files on the server
  const files = await fs.readdir('./temp');

  return res.status(200).json({
    successful: true,
    data: files,
  });
}