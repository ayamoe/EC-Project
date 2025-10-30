import { app, BrowserWindow } from 'electron';
import path from 'path';
import { startServer } from './EC-Api/server.js'; // adjust relative path if needed
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Load the frontend via backend server
  const url = 'http://localhost:5000';
  await mainWindow.loadURL(url);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(async () => {
  try {
    // Start backend server first
    const port = process.env.PORT || 5000;
    await startServer(port);
    // Then open Electron window
    await createWindow();
  } catch (err) {
    console.error('Error starting server or window:', err);
    app.quit();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
