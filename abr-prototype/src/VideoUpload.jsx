import { useState } from "react";
import VideoPlayer from "./VidePlayer";

export default function VideoUpload() {
  const [videoUrls, setVideoUrls] = useState([]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("video", file);

    const res = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setVideoUrls(data.files);
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleUpload} />
      {videoUrls.length > 0 && <VideoPlayer videoUrls={videoUrls} />}
    </div>
  );
}
