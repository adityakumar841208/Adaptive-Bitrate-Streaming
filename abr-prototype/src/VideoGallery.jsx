import { useEffect, useState } from "react";
import VideoPlayer from "./VidePlayer";

export default function VideoGallery() {
  const [videos, setVideos] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/videos")
      .then((res) => res.json())
      .then((data) => setVideos(data));
  }, []);

  if (videos.length === 0) return <div>No videos found.</div>;

  return (
    <div>
      <h2>Available Videos</h2>
      <ul>
        {videos.map((v) => (
          <li key={v.id}>
            <button onClick={() => setSelected(v)}>
              {v.id}
            </button>
          </li>
        ))}
      </ul>
      {selected && <VideoPlayer videoUrls={selected.files} />}
    </div>
  );
}
