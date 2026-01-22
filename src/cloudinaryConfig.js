const cloudName = "dmyr9q1qb"; 
const uploadPreset = "innova_preset"; 

export const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: formData }
    );
    
    if (!response.ok) throw new Error("Fallo en la subida a Cloudinary");

    const data = await response.json();
    return data.secure_url; 
  } catch (error) {
    console.error("Error subiendo imagen:", error);
    return null;
  }
};