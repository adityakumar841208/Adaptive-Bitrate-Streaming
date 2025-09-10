import express from "express";
import multer from "multer";
import { exec } from "child_process";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

// Polyfill for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import cors from "cors";

const app = express();
app.use(cors());
const upload = multer({ dest: "uploads/" });

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ["GET", "POST"],
  credentials: true
}))

// Upload endpoint
app.post("/upload", upload.single("video"), (req, res) => {
  // Convert all paths to forward slashes and wrap in double quotes
  function toFwdSlashes(p) {
    return p.replace(/\\/g, '/');
  }
  const inputPath = toFwdSlashes(path.resolve(req.file.path));
  // Use a separate subdirectory for outputs to avoid file/dir conflict
  const outputDir = toFwdSlashes(path.resolve(path.join("uploads", req.file.filename + "_outputs")));

  // Robustly create output folder (recursive, sync, with error handling)
  try {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    } else {
      console.log('Output directory already exists:', outputDir);
    }
  } catch (err) {
    console.error('Failed to create output directory:', outputDir, err);
    return res.status(500).send('Failed to create output directory: ' + err.message);
  }
  // Double-check existence
  if (!fs.existsSync(outputDir)) {
    console.error('Output directory still does not exist:', outputDir);
    return res.status(500).send('Output directory does not exist after creation attempt.');
  }

  const ffmpegPath = toFwdSlashes("C:\\ffmpeg-8.0-essentials_build\\bin\\ffmpeg.exe");
  const out360 = toFwdSlashes(path.join(outputDir, "360p.mp4"));
  const out480 = toFwdSlashes(path.join(outputDir, "480p.mp4"));
  const out720 = toFwdSlashes(path.join(outputDir, "720p.mp4"));
  const cmd = [
    `"${ffmpegPath}" -i "${inputPath}" -vf scale='trunc(iw*360/ih/2)*2:360' "${out360}" -y`,
    `"${ffmpegPath}" -i "${inputPath}" -vf scale='trunc(iw*480/ih/2)*2:480' "${out480}" -y`,
    `"${ffmpegPath}" -i "${inputPath}" -vf scale='trunc(iw*720/ih/2)*2:720' "${out720}" -y`
  ];

  // Run ffmpeg commands sequentially for better error handling
  function runCmd(i) {
    if (i >= cmd.length) {
      return res.json({
        files: [
          `/uploads/${req.file.filename}_outputs/360p.mp4`,
          `/uploads/${req.file.filename}_outputs/480p.mp4`,
          `/uploads/${req.file.filename}_outputs/720p.mp4`
        ]
      });
    }
    exec(cmd[i], (err, stdout, stderr) => {
      if (err) {
        console.error(`FFmpeg error:`, stderr);
        return res.status(500).send("Error processing video: " + stderr);
      }
      runCmd(i + 1);
    });
  }
  // Add a short delay to ensure file is fully available (fixes file lock/permission issues)
  setTimeout(() => {
    runCmd(0);
  }, 200);
});

// Serve static video files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// List all uploaded videos and their available qualities
app.get("/videos", (req, res) => {
  const uploadsDir = path.join(__dirname, "uploads");
  const result = [];
  fs.readdirSync(uploadsDir).forEach((folder) => {
    const folderPath = path.join(uploadsDir, folder);
    if (fs.statSync(folderPath).isDirectory()) {
      const files = fs.readdirSync(folderPath).filter(f => f.endsWith(".mp4"));
      if (files.length > 0) {
        result.push({
          id: folder,
          files: files.map(f => `/uploads/${folder}/${f}`)
        });
      }
    }
  });
  res.json(result);
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
