import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});


export async function deleteImage(publicId) {
  try {
    if (!publicId) {
      console.warn("No public_id provided for deletion");
      return { result: "not found" };
    }
    const result = await cloudinary.uploader.destroy(publicId);
    console.log(`Cloudinary deletion result for ${publicId}:`, result);
    return result;
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    throw error;
  }
}


export async function deleteImages(publicIds) {
  try {
    if (!publicIds || publicIds.length === 0) {
      console.warn("No public_ids provided for deletion");
      return [];
    }
    const results = await Promise.allSettled(
      publicIds.map((id) => deleteImage(id))
    );
    return results;
  } catch (error) {
    console.error("Error deleting images from Cloudinary:", error);
    throw error;
  }
}

export default cloudinary;
