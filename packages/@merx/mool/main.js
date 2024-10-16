const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile('index.html');
}

app.whenReady().then(createWindow);

// 在主进程中处理文件读取
ipcMain.handle('read-file', async (event, filePath) => {
    try {
        const content = await fs.promises.readFile(filePath, 'utf8');
        return content;
    } catch (error) {
        throw error;
    }
});
