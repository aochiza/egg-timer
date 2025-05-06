const { app, BrowserWindow } = require('electron')
const path = require('path')

let mainWindow

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
  })

  mainWindow.loadFile('index.html')
  mainWindow.setMenu(null)
  
  // Опционально: открываем DevTools для отладки
  // mainWindow.webContents.openDevTools()
}

// Это основная точка входа - создаем окно только когда приложение готово
app.whenReady().then(() => {
  createWindow()
  
  // Для macOS: создаем новое окно, если все закрыты и пользователь кликнул на иконку в доке
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// Закрываем приложение когда все окна закрыты (кроме macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})