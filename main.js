'use strict';

const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('node:path')
const rawinput = require('raw-mouse-clicks');

let mainWindow;

/**
 * @summary Creates the main window
 * @function
 * @public
 *
 */
const createWindow = function () {
  const windowProperties = {
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  };

  mainWindow = new BrowserWindow(windowProperties);
  mainWindow.loadFile('index.html');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  rawinput.initialize(mainWindow);
};

app.on('ready', () => {
  ipcMain.handle('alert::alert', async (message) => {
    const alert = require('./src/rawinput/messageBox');
    alert.alert(mainWindow, message);
  })
  createWindow();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
