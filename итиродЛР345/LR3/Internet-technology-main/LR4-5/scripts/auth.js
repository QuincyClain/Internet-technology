function isLogged() {
    if (window.localStorage.getItem("id")) {
        document.getElementById("login").setAttribute("class", "invisible");
    }
    if (window.localStorage.getItem("id")) {
        document.getElementById("reg").setAttribute("class", "invisible");
    }
}

// function addClearListener() {
//     window.onbeforeunload = function (e) {
//         localStorage.clear();
//     }
// }   

isLogged();