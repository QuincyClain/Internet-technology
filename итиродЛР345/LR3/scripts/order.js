class Place {
    constructor(row, id, status) {
        this.row = row;
        this.id = id;
        this.status = status;
    }
}

let places = [];

function generatePlaces() {
    for (let i = 1; i < 15; i++) {
        places.push(new Place(1, i, "FREE"));
    }
    for (let i = 1; i < 17; i++) {
        places.push(new Place(2, i, "FREE"));
    }
    for (let i = 1; i < 19; i++) {
        places.push(new Place(3, i, "FREE"));
    }
    for (let i = 1; i < 21; i++) {
        places.push(new Place(4, i, "FREE"));
    }
}

function appendPlaces() {
    generatePlaces();   
    for (const place of places) {
        if (place.id === 1) {
            elem = document.createElement("td");
            elem.setAttribute("class", "column-number");
            elem.innerHTML = place.row;
            document.getElementById(`row-${place.row}`).appendChild(elem);
            for (let i = 4 - place.row; i > 0; i--) {
                invisibleElem = document.createElement("td");
                invisibleHref  = document.createElement("a");
                invisibleHref.setAttribute("class", "invisible");
                invisibleElem.appendChild(invisibleHref);
                document.getElementById(`row-${place.row}`).appendChild(invisibleElem);
            }
        }
        tdElem = document.createElement("td");
        elem = document.createElement("a");
        elem.setAttribute("id", `${place.row}-${place.id}`);
        elem.innerHTML = place.id;
        const tmp = elem;
        const historyOrders = JSON.parse(window.localStorage.getItem("history")).flatMap((item) => item);
        const film = window.localStorage.getItem("film");
        const time = window.localStorage.getItem("time");
        const isReserved = historyOrders.find((item) => item.film === film && item.id === place.id && item.row === place.row && item.time === time);
        if (isReserved) {
            place.status = "RESERVED";
        }
        elem.addEventListener("click", function() {
            switch(place.status) {
                case "FREE":
                    place.status = "PICKED";
                    tmp.setAttribute("class", "btn grayy");
                    break;
                case "PICKED":
                    place.status = "FREE";
                    tmp.setAttribute("class", "btn gold");
                    break;
            }
        } );
         switch (place.status) {
            case "FREE":
                elem.setAttribute("class", "btn gold");
                break;
            case "RESERVED": 
                elem.setAttribute("class", "btn redd");
                break;
            case "PICKED":
                elem.setAttribute("class", "btn grayy");
                break;
        }   
        tdElem.appendChild(elem)
        document.getElementById(`row-${place.row}`).appendChild(tdElem);
        if ((place.id === 14 && place.row === 1) 
            || place.id === 16 && place.row === 2
            || place.id === 18 && place.row === 3
            || place.id === 20 && place.row === 4
        ) {
            for (let i = 4 - place.row; i > 0; i--) {
                invisibleElem = document.createElement("td");
                invisibleHref  = document.createElement("a");
                invisibleHref.setAttribute("class", "invisible");
                invisibleElem.appendChild(invisibleHref);
                document.getElementById(`row-${place.row}`).appendChild(invisibleElem);
            }
            elem = document.createElement("td");
            elem.setAttribute("class", "column-number");
            elem.innerHTML = place.row;
            document.getElementById(`row-${place.row}`).appendChild(elem);
        }
    }
}

function reserve() {
    const orders = [];
    for (const place of places) {
        if (place.status === "PICKED") {
            place.status = "RESERVED";
            document.getElementById(`${place.row}-${place.id}`).setAttribute("class", "btn redd");
            orders.push({ film: window.localStorage.getItem("film"), time: window.localStorage.getItem("time"), row: place.row, id: place.id, userId: window.localStorage.getItem("id") });
            console.log(`${place.row}-${place.id} - Reserved for ${window.localStorage.getItem("film")} at ${window.localStorage.getItem("time")}`);
        }
    }
    console.log(orders);
    window.localStorage.setItem("orders", JSON.stringify(orders));
}

appendPlaces();