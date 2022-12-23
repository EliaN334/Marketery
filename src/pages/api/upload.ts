import { type NextApiRequest, type NextApiResponse } from 'next';
import formidable from 'formidable';
import { join } from 'path';
import mime from 'mime';
import { unlinkSync } from 'fs';
import cloudinary from 'cloudinary';
import { env } from '@/env/server.mjs';

cloudinary.v2.config({
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
});

const parseForm = async (
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  return new Promise(async (resolve, reject) => {
    const uploadDir = join(process.cwd(), `/public`);

    const form = formidable({
      maxFiles: 2,
      maxFileSize: 1024 * 1024,
      uploadDir,
      filename: (name, ext, part) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const filename = `${part.name || 'unknown'}-${uniqueSuffix}.${
          mime.getExtension(part.mimetype || '') || 'unknown'
        }`;
        return filename;
      },
      filter: (part) =>
        part.name == 'media' && (part.mimetype?.includes('image') || false),
    });

    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};

export default async function uploadFileHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      const { files } = await parseForm(req);
      // eslint-disable-next-line
      // @ts-ignore
      const path: string = files.media?.filepath;
      try {
        const { secure_url, public_id } = await cloudinary.v2.uploader.upload(
          path
        );
        unlinkSync(path);
        return res.status(200).json({
          url: secure_url,
          public_id,
        });
      } catch (err) {
        console.error(err);
        unlinkSync(path);
        res.status(400).json({
          message: 'Something went wrong...',
          error: err,
        });
      }
    default:
      return res.status(400).json({
        message: 'Method not supported',
      });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
