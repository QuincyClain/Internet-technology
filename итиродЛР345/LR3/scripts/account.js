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

const orders = JSON.parse(window.localStorage.getItem("history")).flatMap((item) => item).filter((item) => item.userId === window.localStorage.getItem("id"));
orders.forEach((order) => {
    const movieElem = document.createElement("span");
    movieElem.setAttribute("class", "order-history-movie");
    movieElem.innerHTML = order.film;
    const timeElem = document.createElement("span");
    timeElem.setAttribute("class", "order-history-time");
    timeElem.innerHTML = order.time;
    const seatElem = document.createElement("span");
    seatElem.setAttribute("class", "order-history-seat");
    seatElem.innerHTML = `${order.row}-${order.id}`;
    listElem = document.createElement("li");
    listElem.appendChild(movieElem);
    listElem.appendChild(timeElem);
    listElem.appendChild(seatElem);
    document.getElementById("history-list").appendChild(listElem);
})