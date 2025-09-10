import { useState } from "react";

export default function VideoPlayer({ videoUrls }) {
  const [selected, setSelected] = useState(videoUrls[0]);

  return (
    <div>
      <video src={`http://localhost:5000${selected}`} controls width="600" />
      <div style={{ marginTop: "10px" }}>
        {videoUrls.map((url, i) => (
          <button key={i} onClick={() => setSelected(url)} style={{ margin: "5px" }}>
            {url.split("/").pop()} {/* shows "360p.mp4" etc */}
          </button>
        ))}
      </div>
    </div>
  );
}
