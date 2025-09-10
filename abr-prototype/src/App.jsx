import VideoUpload from "./VideoUpload";
import VideoGallery from "./VideoGallery";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Adaptive Bitrate Streaming Demo</h1>
      <VideoUpload />
      <hr style={{margin: '2em 0'}} />
      <VideoGallery />
    </div>
  );
}

export default App;
