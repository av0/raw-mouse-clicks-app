const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('rawInputAPI', {
    onRawMouseButtonClick: (callback) => ipcRenderer.on('raw-mouse-button-click', callback),
    onRawMouseButtonUp: (callback) => ipcRenderer.on('raw-mouse-button-up', callback),
    onRawMouseButtonDown: (callback) => ipcRenderer.on('raw-mouse-button-down', callback),
    onRawMouseDeviceAdded: (callback) => ipcRenderer.on('raw-mouse-device-added', callback),
    onRawMouseDeviceRemoved: (callback) => ipcRenderer.on('raw-mouse-device-removed', callback),
    getMouseDevices: () => ipcRenderer.invoke('rawinput::getMouseDevices'),
})
