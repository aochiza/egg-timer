/**
 * @module MainProcess
 * @description Управление основным процессом Electron и созданием окон.
 */

const { app, BrowserWindow } = require('electron');
const path = require('path');

/** @type {BrowserWindow} */
let mainWindow;

/**
 * Создает главное окно приложения
 * @function createWindow
 * @inner
 */
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false
    }
  });

  mainWindow.loadFile('index.html');
  mainWindow.setMenu(null);
}

/**
 * Обработчик события готовности приложения
 * @event whenReady
 * @listens app
 */
app.whenReady().then(() => {
  createWindow();
  
  /**
   * Обработчик активации приложения (для macOS)
   * @event activate
   * @listens app
   */
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

/**
 * Обработчик закрытия всех окон
 * @event window-all-closed
 * @listens app
 */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});