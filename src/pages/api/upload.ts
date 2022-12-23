import { type NextApiRequest, type NextApiResponse } from 'next';
import formidable, { FileJSON } from 'formidable';
import fs from 'fs';

export default function uploadFileHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    console.log('formidable');
    await saveFile(files.file);
    return res.status(201).send('Uploading file');
  });

  const saveFile = async (file) => {
    const data = fs.readFileSync(file.path);
    fs.writeFileSync(`./public/${file.name}`, data);
    // fs.unlinkSync(file.path);
    return;
  };
  console.log('rest');
  //   return res.json({
  //     message: 'WORKING!!',
  //   });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
