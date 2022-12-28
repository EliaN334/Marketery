import cloudinary from 'cloudinary';

cloudinary.v2.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});

const deleteCldImage = async (public_id: string): Promise<void> => {
  try {
    await cloudinary.v2.uploader.destroy(public_id);
  } catch (e) {
    console.error('`delete-cld-image.ts`: ', e);
  }
};

export default deleteCldImage;
