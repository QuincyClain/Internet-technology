function setData(name, time) {
    window.localStorage.setItem("time", time);
    window.localStorage.setItem("film", name);
    location.href='../choosePage/choose.html';
}