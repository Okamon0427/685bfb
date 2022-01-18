export const uploadImages = async (files) => {
  const attachments = [];
  const formData = new FormData();

  for(let i = 0; i < files.length; i++) {
    let file = files[i];
    formData.append("file", file);
    formData.append("upload_preset", process.env.REACT_APP_PRESET);
  
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: formData
        }
      )
      const data = await res.json();
      attachments.push(data.secure_url);
    } catch (e) {
      console.log(e);
    }
  }

  return attachments;
}
