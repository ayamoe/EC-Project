import express from "express";
import cors from "cors";
import router from "./router.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api/v1", router);

// Serve React build static files
const clientBuildPath = path.join(__dirname, '../dist');
app.use(express.static(clientBuildPath));

// SPA fallback for React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});
const PORT = process.env.PORT || 5000;

export function startServer(port = PORT ) {
  return new Promise((resolve) => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
      resolve();
    });
  });
}
