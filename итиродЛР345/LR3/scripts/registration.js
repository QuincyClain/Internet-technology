class User {
    constructor(username, email, password, id) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.id = id;
    }
}

let users = [];
this.getUsers();

function getUsers() {
    fetch("https://dummyjson.com/users?select=password,email,username")
        .then(res => res.json())
        .then(res => {
            users = res.users;
            console.log(users);
        });
}

function registrate() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;
    if (passwordConfirm === password) {
        this.users.push(new User(username, email, password, this.users.length));
    }
    else {
        alert("Password does not match");
        return false;
    }
}

function login() {
    if (window.localStorage.getItem("password") && window.localStorage.getItem("password") !== 'null') {
        users = users.map((user) => {
            if (user.id.toString() === window.localStorage.getItem("id")) {
                user.password = window.localStorage.getItem("password");
                user.email = window.localStorage.getItem("email");
                user.username = window.localStorage.getItem("username");
            }
            return user;
        })
        console.log(users);
    }
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (!users.filter((item) => item.password === password && item.email === email).length) {   
        alert("Wrong credentials");
        return false;
    }
    window.localStorage.setItem("id", users.find((item) => item.email === email).id);
    window.localStorage.setItem("username", users.find((item) => item.email === email).username);
    window.localStorage.setItem("email", users.find((item) => item.email === email).email);
    window.localStorage.setItem("password", password);
}