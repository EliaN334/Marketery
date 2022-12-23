import cloudinary from 'cloudinary';

const deleteCldImage = async (public_id: string): Promise<void> => {
  try {
    await cloudinary.v2.uploader.destroy(public_id);
  } catch (e) {
    console.error(e);
  }
};

export default deleteCldImage;
