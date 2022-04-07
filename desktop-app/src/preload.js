const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('api', {

    sendIpcMessage: async function(name, requestData) {

        return new Promise((resolve) => {

            ipcRenderer.send(name, requestData);
            ipcRenderer.on(name, (event, responseData) => {
                resolve(responseData);
            });
        });
    },

    receiveIpcMessage: function(name, callback) {

        ipcRenderer.on(name, (event, responseData) => {
            callback(responseData);
        });
    }
});