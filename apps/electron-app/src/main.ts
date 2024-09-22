import { app, BrowserWindow } from "electron";
import * as path from "path";

let mainWindow: BrowserWindow | null;
require("dotenv").config();
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // Connect to the preload script
    },
  });

  // Load the Web app
  mainWindow.loadURL("http://localhost:3000"); // Load the React Web app

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
