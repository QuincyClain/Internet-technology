document.getElementById("username-header").innerHTML = window.localStorage.getItem("username");
document.getElementById("name").value = window.localStorage.getItem("username");
document.getElementById("email").value = window.localStorage.getItem("email");
document.getElementById("password").value = window.localStorage.getItem("password");
document.getElementById("password").value = window.localStorage.getItem("password");


function updateAccount() { 
    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    window.localStorage.setItem("email", email);
    window.localStorage.setItem("username", name);
    window.localStorage.setItem("password", password);
    document.getElementById("username-header").innerHTML = window.localStorage.getItem("username");
    document.getElementById("name").value = window.localStorage.getItem("username");
    document.getElementById("email").value = window.localStorage.getItem("email");
    document.getElementById("password").value = window.localStorage.getItem("password");
    return false;
}