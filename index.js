const Datastore = require('nedb');
const electron = require('electron');
const isDev = require('electron-is-dev');
const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let db_notes;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 780,
        webPreferences: { backgroundThrottling: true }
    });
    mainWindow.loadURL(`file://${__dirname}/build/index.html`);
    mainWindow.on('closed', () => app.quit());

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

});

// Database (NeDB)
var userData = app.getPath('userData');

db_notes = new Datastore({ filename: userData +'/db/notes.db', timestampData: true });
db_notes.loadDatabase();

ipcMain.on('addNote', (event, note) => {
    db_notes.insert(note, function (err, newNote) {
        if (!err) {
            db_notes.find({}).sort({ updatedAt: -1 }).exec(function (err, notes) {                
                if (!err) {
                    mainWindow.webContents.send('note:added', notes, newNote);
                }
            });
        }
    });
});

ipcMain.on('fetchNotes', (event) => {

    db_notes.find({}).sort({ updatedAt: -1 }).exec(function (err, notes) {
        if (!err) {
            mainWindow.webContents.send('fetched:notes', notes);
        }
    });
});

ipcMain.on('saveNote', (event, note) => {

    db_notes.update({ _id: note._id }, { $set: { content: note.content } }, {}, function (err, numReplaced) {
        if (!err) {
            db_notes.find({}).sort({ updatedAt: -1 }).exec(function (err, notes) {
                if (!err) {
                    mainWindow.webContents.send('note:saved', notes);
                }
            });
        }
    });

});

ipcMain.on('deleteNote', (event, ID) => {

    db_notes.remove({ _id: ID }, {}, function (err, numRemoved) {
        if (!err) {
            db_notes.find({}).sort({ updatedAt: -1 }).exec(function (err, notes) {
                if (!err) {
                    mainWindow.webContents.send('note:deleted', notes);
                }
            });
        }
    });

});

// Custom App Menu
const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Quit',
                accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    },
    {
        label: 'Edit',
        submenu: [
            { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
            { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
            { type: "separator" },
            { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
            { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
            { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
            { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
        ]
    },
    {
        label: 'View',
        submenu: [
            {
                role: 'resetzoom'
            },
            {
                role: 'zoomin'
            },
            {
                role: 'zoomout'
            },
            {
                type: 'separator'
            },
            {
                role: 'togglefullscreen'
            }
        ]
    }
];

// Show Developer Tools if running on Dev env
if (isDev) {
    menuTemplate.push({
        label: 'Developer',
        submenu: [
            {
                role: 'reload'
            },
            {
                label: 'Developer Tools',
                accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    });
}

// Push additional submenu for Mac only
if (process.platform === 'darwin') {
    const name = app.getName()
    menuTemplate.unshift({
        label: name,
        submenu: [
            {
                role: 'about'
            },
            {
                type: 'separator'
            },
            {
                role: 'services',
                submenu: []
            },
            {
                type: 'separator'
            },
            {
                role: 'hide'
            },
            {
                role: 'hideothers'
            },
            {
                role: 'unhide'
            },
            {
                type: 'separator'
            },
            {
                role: 'quit'
            }
        ]
    })
}