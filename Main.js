const { app, BrowserWindow } = require('electron');

function createWindow() 
{
    const mainWindow = new BrowserWindow
    ({
        width: 1280,
        height: 720,
        webPreferences: 
        {
            nodeIntegration: true,
            contextIsolation: false,
            nodeIntegrationInWorker: true   
        }
    });
    
    
    mainWindow.setMenuBarVisibility(false);
    mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => 
{
    if (process.platform !== 'darwin') 
    {
        app.quit();
    }
});

app.on('activate', () => 
{
    if (BrowserWindow.getAllWindows().length === 0) 
    {
        createWindow();
    }
});


