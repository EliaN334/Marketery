import { env } from '@/env/server.mjs';
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
});

export default cloudinary;
