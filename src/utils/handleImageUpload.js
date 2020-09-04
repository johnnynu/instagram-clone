async function handleImageUpload(image, imageType) {
  const data = new FormData();
  data.append("file", image);
  data.append(
    "upload_preset",
    imageType === "avatar" ? "instagram-avatar" : "instagram"
  );
  data.append("cloud_name", "dnvsmg4qy");
  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dnvsmg4qy/image/upload",
    {
      method: "POST",
      accept: "application/json",
      body: data
    }
  );
  const jsonResponse = await response.json();
  return jsonResponse.url;
}

export default handleImageUpload;
