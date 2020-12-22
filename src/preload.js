// preload.js
const { ipcRenderer } = require('electron');

window.url = "";
process.once('loaded', () => {

    ipcRenderer.on('goto', (event, message) => {
        console.log("[NAV] > " + message);
        let url = (message + "").toString() + "?rnd=" + +Date();
        console.log("[NAV] > Loaded url: " + url);
        let el = document.querySelector('#chromiumscreen');
        el.innerHTML = el.innerHTML + '<webview id="chromiumwebviewchild" class="kidsoswindow child" src="' + url + '" useragent="Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko" webpreferences="nativeWindowOpen=true" allowpopups disablewebsecurity></webview>';
    });
});