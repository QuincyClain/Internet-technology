function buy() {
    const order = JSON.parse(window.localStorage.getItem("orders"));
    alert("Заказ оформлен.");
    if (window.localStorage.getItem("history")) {
        const history = JSON.parse(window.localStorage.getItem("history"));
        console.log(history);
        history.push(order);
        window.localStorage.setItem("history", JSON.stringify(history));
    }
    else {
        window.localStorage.setItem("history", JSON.stringify([order]));
    }
}

document.getElementById("movie-title").innerHTML = window.localStorage.getItem("film");
document.getElementById("movie_time").innerHTML = window.localStorage.getItem("time");
let picSrc = "";
switch(window.localStorage.getItem("film")) {
    case "Deadpool": 
        picSrc = "../mainPage/images/first.png";
        break;
    case "Fantasy Island":
        picSrc = "../mainPage/images/second.png";
        break;
    default: 
        picSrc = "./images/film.png";
}
document.getElementById("picture").setAttribute("src", picSrc);

price = Math.floor(Math.random() * 5) + 10;
document.getElementById("price").innerHTML = `${price}$`;
