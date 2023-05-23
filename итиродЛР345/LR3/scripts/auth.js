function isLogged() {
    if (window.localStorage.getItem("id")) {
        document.getElementById("id").setAttribute("class", "invisible");
    }
}

function logout() {
    if (window.localStorage.getItem("id")) {
        window.localStorage.removeItem("username");
        window.localStorage.removeItem("email");
        window.localStorage.removeItem("password");
        window.localStorage.removeItem("film");
        window.localStorage.removeItem("time");
        window.localStorage.removeItem("id");   
    }
}

if (window.localStorage.getItem("id")) {
    document.getElementById("header-btn-1").innerHTML = window.localStorage.getItem("username");
    document.getElementById("header-btn-1").setAttribute("href", "../accountPage/account.html");
    document.getElementById("header-btn-2").innerHTML = "logout";
    document.getElementById("header-btn-2").onclick = logout;
}
else {
    document.getElementById("header-btn-1").innerHTML = "Sign up";
    document.getElementById("header-btn-1").setAttribute("href", "../registerPage/Register.html");
    document.getElementById("header-btn-2").innerHTML = "login";
    document.getElementById("header-btn-2").href = "";
    document.getElementById("header-btn-2").setAttribute("href", "../loginPage/login.html");
}

// function addClearListener() {
//     window.onbeforeunload = function (e) {
//         localStorage.clear();
//     }
// }   