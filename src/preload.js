// preload.js
const { ipcRenderer } = require('electron');

window.url = "";
process.once('loaded', () => {

    ipcRenderer.on('goto', (event, message) => {
        console.log("[NAV] > " + message);
        let url = (message + "").toString() + "?rnd=" + +Date();
        console.log("[NAV] > Loaded url: " + url);
        let clroom = document.querySelector('#classroomscreen');
        let chroom = document.querySelector('#chromiumscreen');
        if (!clroom.classList.contains("hidden")) {
            clroom.innerHTML = clroom.innerHTML + '<webview id="classroomwebviewchild" class="kidsoswindow child" src="' + url + '" useragent="Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko" webpreferences="nativeWindowOpen=true" allowpopups disablewebsecurity></webview>';
        }
        if (!chroom.classList.contains("hidden")) {
            chroom.innerHTML = chroom.innerHTML + '<webview id="chromiumwebviewchild" class="kidsoswindow child" src="' + url + '" useragent="Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko" webpreferences="nativeWindowOpen=true" allowpopups disablewebsecurity></webview>';
        }
    });
});