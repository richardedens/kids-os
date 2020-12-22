const { triggerAsyncId } = require('async_hooks');
const { app, BrowserWindow, screen, ipcMain, globalShortcut } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    app.quit();
}

let mainWindow = null;
const createWindow = () => {
    // Get screen width.
    const { width, height } = screen.getPrimaryDisplay().size;
    console.log(width + 'x' + height);
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: width,
        height: height,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, './preload.js'),
            nodeIntegration: false,
            enableRemoteModule: false,
            contextIsolation: true,
            sandbox: true,
            webviewTag: true
        }
    });

    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, 'index.html'));
    mainWindow.setFullScreen(true);
    mainWindow.setAlwaysOnTop(true);
    // Open the DevTools.
    //mainWindow.webContents.openDevTools();
    globalShortcut.register('Alt+CommandOrControl+Q', () => {
        app.quit();
    })
};

app.on('web-contents-created', function(webContentsCreatedEvent, contents) {
    if (contents.getType() === 'webview') {
        contents.on('new-window', function(newWindowEvent, url) {
            mainWindow.webContents.send('goto', url);
            console.log("[NAV] > " + url);
            newWindowEvent.preventDefault();
        });
    }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.