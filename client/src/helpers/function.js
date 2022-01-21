import Axios from "axios";

export const uploadImages = async (files) => {
  const attachments = [];
  const formData = new FormData();

  for(let i = 0; i < files.length; i++) {
    let file = files[i];
    formData.append("file", file);
    formData.append("upload_preset", process.env.REACT_APP_PRESET);
  
    try {
      const res = await Axios({
        method: "POST",
        url: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/upload`,
        data: formData,
        transformRequest: [(data, headers) => {
          delete headers["x-access-token"];
          return data;
        }]
      })
      attachments.push(res.data.secure_url);
    } catch (e) {
      console.log(e);
    }
  }

  return attachments;
}
