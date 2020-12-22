window.onload = function() {
    const webview = document.querySelector('#chromiumwebview')
    webview.addEventListener('dom-ready', () => {
        if (window.url !== "") {
            webview.src = window.url;
            window.url = "";
        }
    })

    const classroomscreen = document.getElementById('classroomscreen');
    const chromiumscreen = document.getElementById('chromiumscreen');
    const youtubescreen = document.getElementById('youtubescreen');

    const btnChromium = document.getElementById('gchromium');
    btnChromium.addEventListener('click', function() {
        let child = document.getElementById('chromiumwebviewchild');
        if (child !== null) {
            child.remove();
        }
        classroomscreen.classList.add('hidden');
        chromiumscreen.classList.remove('hidden');
        youtubescreen.classList.add('hidden');
    });

    const btnClassroom = document.getElementById('gclassroom');
    btnClassroom.addEventListener('click', function() {
        classroomscreen.classList.remove('hidden');
        chromiumscreen.classList.add('hidden');
        youtubescreen.classList.add('hidden');
    });

    const btnDesktop = document.getElementById('gdesktop');
    btnDesktop.addEventListener('click', function() {
        classroomscreen.classList.add('hidden');
        chromiumscreen.classList.add('hidden');
        youtubescreen.classList.add('hidden');
    });

    setTimeout(function() {

        date_time('timebar');
    }, 1000);
}

function date_time(id) {
    date = new Date;
    year = date.getFullYear();
    month = date.getMonth();
    months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'Jully', 'August', 'September', 'October', 'November', 'December');
    d = date.getDate();
    day = date.getDay();
    days = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    h = date.getHours();
    if (h < 10) {
        h = "0" + h;
    }
    m = date.getMinutes();
    if (m < 10) {
        m = "0" + m;
    }
    s = date.getSeconds();
    if (s < 10) {
        s = "0" + s;
    }
    result = '' + h + ':' + m + ':' + s;
    document.getElementById(id).innerHTML = result;
    setTimeout('date_time("' + id + '");', '1000');
    return true;
}