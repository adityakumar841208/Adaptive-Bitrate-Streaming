# Adaptive Bitrate Streaming Demo

This project is a full-stack prototype for adaptive bitrate (ABR) video streaming, allowing users to upload videos, transcode them into multiple qualities, and play them back with selectable quality in a React frontend.

## Features

- **Video Upload:** Upload MP4 videos from the React frontend.
- **Automatic Transcoding:** Uploaded videos are transcoded on the backend (Node.js/Express) into 360p, 480p, and 720p using ffmpeg.
- **Quality Selection:** Users can select which quality to play in the video player.
- **Video Gallery:** All uploaded videos are listed and can be played by any user.

## Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Node.js, Express, Multer
- **Transcoding:** ffmpeg (must be installed separately)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- ffmpeg (add to your system PATH or update the path in `backend/index.js`)

### Installation

1. **Clone the repository:**
	```sh
	git clone https://github.com/adityakumar841208/Adaptive-Bitrate-Streaming.git
	cd Adaptive-Bitrate-Streaming
	```

2. **Install backend dependencies:**
	```sh
	cd backend
	npm install
	```

3. **Install frontend dependencies:**
	```sh
	cd ../abr-prototype
	npm install
	```

### Running the Project

1. **Start the backend server:**
	```sh
	cd backend
	node index.js
	```
	The backend will run on [http://localhost:5000](http://localhost:5000)

2. **Start the frontend (Vite) dev server:**
	```sh
	cd ../abr-prototype
	npm run dev
	```
	The frontend will run on [http://localhost:5173](http://localhost:5173)

3. **Upload and Play Videos:**
	- Open the frontend in your browser.
	- Upload an MP4 video.
	- Wait for transcoding (may take a few seconds).
	- Select and play the video in different qualities from the gallery.

## ffmpeg Setup

- Download ffmpeg from [ffmpeg.org](https://ffmpeg.org/download.html) or [gyan.dev](https://www.gyan.dev/ffmpeg/builds/).
- Update the `ffmpegPath` variable in `backend/index.js` if your ffmpeg binary is in a different location.

## Project Structure

```
Adaptive-Bitrate-Streaming/
├── backend/
│   ├── index.js
│   ├── package.json
│   └── uploads/
├── abr-prototype/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── VideoUpload.jsx
│   │   ├── VideoGallery.jsx
│   │   └── VidePlayer.jsx
│   ├── package.json
│   └── ...
└── README.md
```

## Troubleshooting

- **ffmpeg errors:**
  - Ensure ffmpeg is installed and the path is correct in `backend/index.js`.
  - Make sure the output directory is not blocked by antivirus or permissions.
- **Video not playing:**
  - Wait for transcoding to finish before trying to play.
  - Check browser console and backend logs for errors.

## License

MIT
